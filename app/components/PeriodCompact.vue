<script setup lang="ts">
import type { Sky, Wind, Precipitation } from "@@/types/weather"

const props = defineProps<{
  sky: Sky
  precipitation: Object
  wind: Wind
  temp?: number
  gust?: number
  snowLevel?: number
}>()
</script>

<template>
  <div
    :class="{ 'opacity-30': !props.sky.descripcion }"
    class="flex-1 grid justify-items-center gap-x-4 gap-y-2 text-pretty border-l border-dashed border-neutral-300 dark:border-neutral-700 px-4 pb-6 first:border-none"
  >
    <!-- Period -->
    <IconSky :data="props.sky.value" />

    <div class="hidden md:block text-center">{{ props.sky.descripcion }}</div>
    <div class="grid justify-items-center gap-2">
      <!-- Temperature -->
      <div v-if="props.temp">
        <Value>{{ props.temp }}</Value
        ><Unit>°C</Unit>
      </div>
      <!-- Rain -->
      <ProbRain :data="props.precipitation.value" />
      <!-- Wind -->
      <Wind :data="props.wind" :gust="props.gust" />
      <!-- Snow level -->
      <div v-if="props.snowLevel">
        <Icon name="mdi:snowflake" aria-hidden="true" />
        <Value>{{ props.snowLevel }}</Value
        ><Unit>m</Unit>
      </div>
    </div>
  </div>
</template>
