<script setup lang="ts">
const route = useRoute()
const { saveVisitedTown } = useVisitedTowns()

const id = route.params.id as string

/*
 * Fetch town forecast
 */
const { error: forecastError, data: forecastData, status: forecastStatus } = await useFetch(`/api/forecast/town/${id}`)

const town = forecastData.value.town
const forecast = forecastData.value

/* const forecast = forecastData.value.map((item, index) => {
  return { ...item, ...sunData.value[index] }
})
 */
/*
 * Save visited town
 */
saveVisitedTown({
  id: id,
  name: forecastData.value.town.nombre,
  province: forecastData.value.town.province.name
})

useHead({
  title: `Previsión para ${forecastData.value?.town?.nombre} | Metea`,
  meta: [
    {
      name: 'og:title',
      content: `Previsión para ${forecastData.value?.town?.nombre}`
    }
  ]
})
</script>

<template>
  <Search />
  <Spinner v-if="forecastStatus === 'pending'" />
  <article v-else-if="forecastData">
    <TownInfo :data="town" />
    <Day v-for="day in forecast.prediccion.dia" :data="day" />
  </article>
  <div v-else-if="forecastError">
    <h1>Error :(</h1>
    <p>No se ha podido obtener la previsión para {{ town.nombre }}.</p>
  </div>
</template>
