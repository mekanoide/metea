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
    <h1 class="flex gap-x-6 mb-4 items-baseline justify-start flex-wrap">
      <span class="text-3xl font-semibold text-ellipsis">{{
        props.data.nombre
      }}</span>
      <span
        v-if="props.data.province"
        class="text-xl"
        >{{ props.data.province.nombre }}</span
      >
    </h1>
    <div class="flex gap-x-6 flex-wrap mb-4">
      <div>
        Altitud: <span class="font-semibold">{{ props.data.altitud }}m</span>
      </div>
      <div>
        Latitud: <span class="font-semibold">{{ formattedLatitude }}</span>
      </div>
      <div>
        Longitud: <span class="font-semibold">{{ formattedLongitude }}</span>
      </div>
    </div>
    <div>
      Población: <span class="font-semibold">{{ normalizedPopulation }}</span>
    </div>
  </div>
</template>
