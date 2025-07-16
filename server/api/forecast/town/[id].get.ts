import towns from '@@/server/data/towns.json'
import provinces from '@@/server/data/provinces.json'
import { Town } from '@@/types/town'

export default defineEventHandler(async (event: any) => {
  const storage = useStorage()
  const config = useRuntimeConfig()

  const { id } = event.context.params

  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID de municipio no proporcionado'
    })
  }

  type Sun = {
    results: {
      date: string
      sunrise: string
      sunset: string
      first_light: string
      last_light: string
      solar_noon: string
      golden_hour: string
      day_length: string
      timezone: string
      utc_offset: number
    }[]
    status: string
  }

  type ForecastResponse = {
    datos: string
  }

  type CacheData = {
    data: any
    expiry: number
  }

  // 1. Verify cache
  const cacheKey = `cache:metea:${id}`
  const cachedData = await storage.getItem(cacheKey) as CacheData | null

  if (cachedData && cachedData.expiry > Date.now()) {
    return cachedData.data
  }

  function getStartAndEndDate(date: string): {
    startDate: string
    endDate: string
  } {
    const startDate = new Date(date)
    const endDate = new Date(date)
    endDate.setDate(startDate.getDate() + 6)

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    }
  }

  // Fetch forecast data with timeout and retry
  const forecastResponse = await $fetch(
    `${config.API_URL}/prediccion/especifica/municipio/diaria/${id}?api_key=${config.API_KEY}`,
    {
      timeout: 10000, // 10 seconds timeout
      retry: 2,
      retryDelay: 1000
    }
  ).catch((error: any) => {
    const isTimeout = error.code === 'ECONNABORTED'
    const isNetworkError = error.code === 'ENOTFOUND'
    
    throw createError({
      statusCode: isTimeout ? 408 : 503,
      message: isTimeout ? 'Tiempo de espera agotado al conectar con AEMET' :
               isNetworkError ? 'No hay conexión con el servidor de AEMET' :
               'Error al obtener datos del pronóstico desde AEMET'
    })
  }) as ForecastResponse

  if (!forecastResponse?.datos) {
    throw createError({
      statusCode: 503,
      message: 'AEMET no ha devuelto datos de pronóstico'
    })
  }

  // Fetch actual forecast data
  const forecastData = await $fetch(forecastResponse.datos, {
    responseType: 'text',
    timeout: 15000, // 15 seconds timeout
    retry: 2,
    retryDelay: 1000,
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'text/plain; charset=charset=ISO-8859-15'
    }
  }).catch((error: any) => {
    const isTimeout = error.code === 'ECONNABORTED'
    const isNetworkError = error.code === 'ENOTFOUND'
    
    throw createError({
      statusCode: isTimeout ? 408 : 503,
      message: isTimeout ? 'Tiempo de espera agotado al obtener datos del pronóstico' :
               isNetworkError ? 'No hay conexión con el servidor de datos de AEMET' :
               'Error al obtener datos del pronóstico'
    })
  }) as string

  const town = towns.find((town) => town.id.toLowerCase() === `id${id}`)
  if (!town) {
    throw createError({
      statusCode: 404,
      message: 'Municipio no encontrado'
    })
  }

  const province = provinces.filter((prov) =>
    prov.id.toLowerCase().includes(id.substring(0, 2))
  )

  // Parse forecast data
  const forecast = JSON.parse(forecastData)[0]
  if (!forecast?.prediccion?.dia?.length) {
    throw createError({
      statusCode: 503,
      message: 'AEMET ha devuelto datos de pronóstico incompletos'
    })
  }

  const { startDate, endDate } = getStartAndEndDate(
    forecast.prediccion.dia[0].fecha
  )

  // Fetch sunrise/sunset data (don't fail if this fails)
  const sunriseResponse = await $fetch(
    `https://api.sunrisesunset.io/json?lat=${town?.latitud_dec}&lng=${town?.longitud_dec}&date_start=${startDate}&date_end=${endDate}&time_format=24`,
    {
      timeout: 8000, // 8 seconds timeout
      retry: 1,
      retryDelay: 1000
    }
  ).catch(() => {
    // Return empty results if sunrise data fails
    return { results: [], status: 'error' } as Sun
  }) as Sun

  const today = new Date().setHours(0, 0, 0, 0)
  forecast.prediccion.dia = forecast.prediccion.dia.filter((day: any) => {
    return new Date(day.fecha).setHours(0, 0, 0, 0) >= today
  })

  forecast.prediccion.dia.forEach((day: any, index: number) => {
    day.sunInfo = sunriseResponse.results?.[index] || null
  })

  const apiData = {
    ...forecast,
    province: province,
    town: { ...town, province: province[0] }
  }

  // Save in cache (30 minutes)
  await storage.setItem(cacheKey, {
    data: apiData,
    expiry: Date.now() + 1800000 // 30 min
  })

  return apiData
})
