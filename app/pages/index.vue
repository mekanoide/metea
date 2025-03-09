<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'

definePageMeta({
  layout: 'home'
})

const { coords } = useGeolocation()

const { getVisitedTowns } = useVisitedTowns()

const visitedTowns = getVisitedTowns()

async function onSearchCurrentLocation() {
  if (coords.value.latitude !== null && coords.value.latitude !== Infinity) {
    const { latitude, longitude } = coords.value
    console.log('lat', latitude, 'lon', longitude)
    const { data } = await useFetch('/api/search/nearest', {
      query: { lat: latitude, lng: longitude }
    })
    console.log('id', data.value)
    navigateTo(`/forecast/${data.value}`)
  }
}

useHead({
  title: 'Metea | Previsión meteorológica para España'
})
</script>

<template>
  <Search />
  <button
    class="w-full flex items-center gap-4 px-4 py-6 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:bg-opacity-50 dark:hover:bg-opacity-50"
    type="button"
    @click.prevent="onSearchCurrentLocation"
  >
    <Icon name="mdi:my-location" size="24" />
    Usar ubicación actual
  </button>
  <div v-if="visitedTowns && visitedTowns.length > 0">
    <!--     <h2 class="text-center mt-6">{{ $t('lastSeen') }}</h2> -->

    <NuxtLink
      v-for="town in visitedTowns"
      :key="town.id"
      class="block px-4 py-6 border-t border-1 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:bg-opacity-50 dark:hover:bg-opacity-50"
      :to="`/forecast/${town.id}`"
    >
      <span class="font-semibold">{{ town.name }}</span
      >,
      <span class="text-neutral-600 dark:text-neutral-400">{{
        town.province
      }}</span>
    </NuxtLink>
  </div>
</template>
