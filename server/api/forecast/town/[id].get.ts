import towns from '@/server/data/towns.json'
import provinces from '@/server/data/provinces.json'

export default defineEventHandler(async (event: any) => {
  const config = useRuntimeConfig()

  const { id } = event.context.params
  const { datos } = await $fetch(
    `${config.API_URL}/prediccion/especifica/municipio/diaria/${id}?api_key=${config.API_KEY}`
  )
  const response = await $fetch(datos, {
    responseType: 'text',
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'text/plain; charset=charset=ISO-8859-15'
    }
  })

  const town = towns.filter((town) =>
    town.id.toLowerCase().includes(`id${id}`)
  )
  const province = provinces.filter((prov) =>
    prov.id.toLowerCase().includes(id.substring(0, 2))
  )


  console.log('town', town[0])
  console.log('province', province[0])
  const forecast = JSON.parse(response)[0]

  return { ...forecast, town: { ...town[0], province: province[0] } }
})
