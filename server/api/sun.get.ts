import towns from "@@/server/data/towns.json" // Asumiendo que tienes un archivo JSON con los municipios
import provinces from "@@/server/data/provinces.json"

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

  const query = getQuery(event)
  const latitude = (query.lat as string) || ""
  const longitude = (query.lng as string) || ""
  const date = (query.date as string) || ""
  const { results }: Sun = await $fetch(
    `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${date}`
  )

  return results
})
