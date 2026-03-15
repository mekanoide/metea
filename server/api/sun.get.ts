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

  const response = await $fetch<Sun>(
    `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${date}`,
    {
      timeout: 8000,
      retry: 1,
      retryDelay: 1000
    }
  ).catch(() => {
    return { results: [], status: 'error' } as Sun
  })

  return response.results
})
