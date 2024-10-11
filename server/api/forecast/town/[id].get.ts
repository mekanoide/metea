import towns from '@@/server/data/towns.json'
import provinces from '@@/server/data/provinces.json'
import { Town } from '@@/types/town'

export default defineEventHandler(async (event: any) => {
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

  function getStartAndEndDate(date: string): {
    startDate: string
    endDate: string
  } {
    // Convertir la cadena de fecha a un objeto Date
    const startDate = new Date(date)

    // Crear la fecha de finalización sumando 6 días
    const endDate = new Date(date)
    endDate.setDate(startDate.getDate() + 6)

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    }
  }

  const config = useRuntimeConfig()

  const { id } = event.context.params
  const { datos: dataLink } = await $fetch(
    `${config.API_URL}/prediccion/especifica/municipio/diaria/${id}?api_key=${config.API_KEY}`
  )
  const response = await $fetch(dataLink, {
    responseType: 'text',
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'text/plain; charset=charset=ISO-8859-15'
    }
  })

  const town: Town = towns.find((town) => town.id.toLowerCase() === `id${id}`)
  const province = provinces.filter((prov) =>
    prov.id.toLowerCase().includes(id.substring(0, 2))
  )

  const forecast = JSON.parse(response)[0]

  const { startDate, endDate } = getStartAndEndDate(
    forecast.prediccion.dia[0].fecha
  )

  console.log('Dates', startDate, endDate)

  const { results: sunriseSunset }: Sun = await $fetch(
    `https://api.sunrisesunset.io/json?lat=${town.latitud_dec}&lng=${town.longitud_dec}&date_start=${startDate}&date_end=${endDate}`
  )

  console.log('sunriseSunset', sunriseSunset)

  forecast.prediccion.dia.forEach((day, index) => {
    day.sunInfo = sunriseSunset[index]
  })

  console.log('forecastWithSunriseSunset', forecast)

  return {
    ...forecast,
    town: { ...town, province: province[0] }
  }
})
