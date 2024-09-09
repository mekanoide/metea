<script setup lang="ts">
const route = useRoute()
const { saveVisitedTown } = useVisitedTowns()

const pending = ref<boolean>(true)
const forecast = ref<any>()
const id = route.params.id as string

pending.value = true
const { data } = await useFetch(`/api/forecast/town/${id}`)
forecast.value = data.value
console.log('forecast', forecast.value)
saveVisitedTown({
  id: id,
  name: forecast.value.town.nombre,
  province: forecast.value.town.province.nombre
})
pending.value = false

useHead({
  title: `Previsión para ${forecast.value?.town?.nombre} | Metea`,
  meta: [
    {
      name: 'og:title',
      content: `Previsión meteorológica para ${forecast.value?.town?.nombre}`
    }
  ]
})
</script>

<template>
  <Search />
  <article v-if="forecast">
    <TownInfo :data="forecast.town" />
    <div v-if="!pending">
      <Day
        v-for="day in forecast.prediccion.dia"
        :data="day" />
    </div>
  </article>
</template>
