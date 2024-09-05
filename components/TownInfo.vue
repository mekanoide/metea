<script setup lang="ts">
import type { Town } from '@/types/town'

const props = defineProps<{
  data: Town
}>()

const normalizedPopulation = computed(() => {
  return Intl.NumberFormat('es-ES', {
    notation: 'standard',
    maximumFractionDigits: 0
  }).format(props.data.num_hab)
})

const formattedLatitude = computed(() => {
  const latitude = `${props.data.latitud.split("'")[0]}'`
  const hemisphere = latitude[0] === '-' ? 'S' : 'N'
  return `${latitude}${hemisphere}`
})

const formattedLongitude = computed(() => {
  const longitude = `${props.data.longitud.split("'")[0]}'`
  const hemisphere = longitude[0] === '-' ? 'W' : 'E'
  const longitudeWithoutHemisphere =
    longitude[0] === '-' ? longitude.slice(1) : longitude
  return `${longitudeWithoutHemisphere}${hemisphere}`
})
</script>

<template>
  <div class="py-6">
    <h1 class="mb-2">
      <span class="text-4xl font-semibold">{{ props.data.nombre }}</span
      ><span class="text-xl font-semibold"> // {{ props.data.province.nombre }}</span>
    </h1>
    <p>
      Altitud:
      <span class="font-semibold">{{ props.data.altitud }}m</span> Latitud:
      <span class="font-semibold">{{ formattedLatitude }}</span> Longitud:
      <span class="font-semibold">{{ formattedLongitude }}</span>
    </p>
    <p>
      Población:
      <span class="font-semibold">{{ normalizedPopulation }}</span>
    </p>
  </div>
</template>
