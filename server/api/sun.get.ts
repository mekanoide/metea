import towns from '@/server/data/towns.json' // Asumiendo que tienes un archivo JSON con los municipios
import provinces from '@/server/data/provinces.json'

export default defineEventHandler(async (event: any) => {
  const query = getQuery(event)
  const latitude = (query.lat as string) || ''
  const longitude = (query.lng as string) || ''
  const date = (query.date as string) || ''
  const { results } = await $fetch(
    `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${date}`
  )

  console.log('results', results)

  return results
})
