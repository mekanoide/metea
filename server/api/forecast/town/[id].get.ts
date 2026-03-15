import towns from '@@/server/data/towns.json'
import provinces from '@@/server/data/provinces.json'

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

function handleFetchError(error: any, context: string): never {
  const isTimeout = error.name === 'AbortError' || error.code === 'ECONNABORTED'
  throw createError({
    statusCode: isTimeout ? 408 : 503,
    message: isTimeout
      ? `Tiempo de espera agotado: ${context}`
      : `Error al conectar con ${context}`
  })
}

export default defineEventHandler(async (event: any) => {
  const storage = useStorage()
  const config = useRuntimeConfig()
  const { id } = event.context.params

  if (!id) {
    throw createError({ statusCode: 400, message: 'ID de municipio no proporcionado' })
  }

  // Fail fast: validate town exists before any API call
  const town = towns.find((t) => t.id.toLowerCase() === `id${id}`)
  if (!town) {
    throw createError({ statusCode: 404, message: 'Municipio no encontrado' })
  }

  const province = provinces.find((p) => p.id.toLowerCase().includes(id.substring(0, 2)))

  // Check cache
  const cacheKey = `cache:metea:${id}`
  const cachedData = await storage.getItem(cacheKey) as CacheData | null
  if (cachedData && cachedData.expiry > Date.now()) {
    return cachedData.data
  }

  // Fetch forecast URL from AEMET
  const forecastResponse = await $fetch<ForecastResponse>(
    `${config.API_URL}/prediccion/especifica/municipio/diaria/${id}?api_key=${config.API_KEY}`,
    { timeout: 10000, retry: 2, retryDelay: 1000 }
  ).catch((e) => handleFetchError(e, 'AEMET'))

  if (!forecastResponse?.datos) {
    throw createError({ statusCode: 503, message: 'AEMET no ha devuelto datos de pronóstico' })
  }

  // Fetch actual forecast data
  const forecastData = await $fetch(forecastResponse.datos, {
    responseType: 'text',
    timeout: 15000,
    retry: 2,
    retryDelay: 1000,
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'text/plain; charset=ISO-8859-15'
    }
  }).catch((e) => handleFetchError(e, 'datos de AEMET')) as string

  // Parse forecast data
  let forecast
  try {
    forecast = JSON.parse(forecastData)[0]
  } catch {
    throw createError({ statusCode: 502, message: 'AEMET ha devuelto datos con formato no válido' })
  }

  if (!forecast?.prediccion?.dia?.length) {
    throw createError({ statusCode: 503, message: 'AEMET ha devuelto datos de pronóstico incompletos' })
  }

  // Fetch sunrise/sunset data (non-blocking, graceful degradation)
  const firstDay = new Date(forecast.prediccion.dia[0].fecha)
  const lastDay = new Date(firstDay)
  lastDay.setDate(firstDay.getDate() + 6)

  const sunriseResponse = await $fetch<Sun>(
    `https://api.sunrisesunset.io/json?lat=${town.latitud_dec}&lng=${town.longitud_dec}&date_start=${firstDay.toISOString().split('T')[0]}&date_end=${lastDay.toISOString().split('T')[0]}&time_format=24`,
    { timeout: 8000, retry: 1, retryDelay: 1000 }
  ).catch(() => ({ results: [], status: 'error' }) as Sun)

  // Filter past days and attach sun info
  const today = new Date().setHours(0, 0, 0, 0)
  forecast.prediccion.dia = forecast.prediccion.dia
    .filter((day: any) => new Date(day.fecha).setHours(0, 0, 0, 0) >= today)
    .map((day: any, index: number) => ({
      ...day,
      sunInfo: sunriseResponse.results?.[index] || null
    }))

  const apiData = {
    ...forecast,
    province,
    town: { ...town, province }
  }

  // Save in cache (30 minutes)
  await storage.setItem(cacheKey, {
    data: apiData,
    expiry: Date.now() + 1800000
  })

  return apiData
})
