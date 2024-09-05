<script setup lang="ts">
const route = useRoute()

const pending = ref<boolean>(true)
const forecast = ref<any>()

onMounted(async () => {
  pending.value = true
  const { data } = await useFetch(`/api/forecast/town/${route.params.id}`)
  forecast.value = data.value
  pending.value = false
})

useHead({
  title: `Previsión para ${forecast.value?.town?.nombre} | Metea`
})
</script>

<template>
  <Search />
  <article v-if="forecast">
    <TownInfo :data="forecast.town" />
    <div v-if="!pending">
      <Day v-for="day in forecast.prediccion.dia" :data="day" />
    </div>
  </article>
</template>
