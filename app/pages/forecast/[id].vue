<script setup lang="ts">
const route = useRoute()
const { saveVisitedTown } = useVisitedTowns()

const id = route.params.id as string

/*
 * Fetch town forecast
 */
const { data: forecastData, status: forecastStatus } = await useAsyncData(
  'forecast',
  () => {
    return $fetch(`/api/forecast/town/${id}`)
  }
)

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
  province: forecastData.value.town.province.nombre
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
  <article v-if="forecastStatus === 'success'">
    <TownInfo :data="town" />
    <Day
      v-for="day in forecast.prediccion.dia"
      :data="day" />
    <!--     {{ forecast }}
    Días: {{ forecast.prediccion.dia.length }}
    <div v-for="day in forecast.prediccion.dia">{{ day.fecha }}</div>
 -->
  </article>
  <Spinner v-else />
</template>
