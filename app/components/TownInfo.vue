<script setup lang="ts">
import type { Town } from "@@/types/town"

const props = defineProps<{
  data: Town
}>()

const normalizedPopulation = computed(() => {
  return Intl.NumberFormat("es-ES", {
    notation: "standard",
    maximumFractionDigits: 0
  }).format(props.data.num_hab)
})

const formattedLatitude = computed(() => {
  const latitude = `${props.data.latitud.split("'")[0]}'`
  const hemisphere = latitude[0] === "-" ? "S" : "N"
  return `${latitude}${hemisphere}`
})

const formattedLongitude = computed(() => {
  const longitude = `${props.data.longitud.split("'")[0]}'`
  const hemisphere = longitude[0] === "-" ? "W" : "E"
  const longitudeWithoutHemisphere =
    longitude[0] === "-" ? longitude.slice(1) : longitude
  return `${longitudeWithoutHemisphere}${hemisphere}`
})
</script>

<template>
  <div class="py-6">
    <h1 class="flex gap-x-4 mb-2 items-baseline justify-start flex-wrap">
      <span class="text-3xl md:text-4xl font-semibold text-ellipsis">{{
        props.data.nombre
      }}</span>
      <span
        v-if="props.data.province"
        class="text-xl text-neutral-700 dark:text-neutral-300"
        >{{ props.data.province.name }}</span
      >
    </h1>
    <DataField class="mb-2">
      Población: <Value>{{ normalizedPopulation }}</Value>
    </DataField>
    <div class="flex gap-x-6 flex-wrap">
      <DataField>
        Latitud: <Value>{{ formattedLatitude }}</Value>
      </DataField>
      <DataField>
        Longitud: <Value>{{ formattedLongitude }}</Value>
      </DataField>
      <DataField>
        Altitud: <Value>{{ props.data.altitud }}</Value
        >m
      </DataField>
    </div>
  </div>
</template>
