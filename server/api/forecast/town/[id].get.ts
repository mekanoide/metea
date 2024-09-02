export default defineEventHandler(async (event: any) => {
  const config = useRuntimeConfig()

  const { id } = event.context.params
  const { datos } = await $fetch(
    `${config.API_URL}/prediccion/especifica/municipio/diaria/${id}?api_key=${config.API_KEY}`
  )
  const response = await $fetch(datos)
  const data = JSON.parse(response)[0]

  return data
})
