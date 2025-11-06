<script setup lang="ts">
import type { Sky, Wind, Precipitation } from '~~/shared/types/weather'

const props = defineProps<{
  sky: Sky
  precipitation: {
    value: number
  }
  wind: Wind
  temp?: number
  gust?: string
  snowLevel?: string
}>()
</script>

<template>
  <div
    :class="{ 'opacity-30': !props.sky.descripcion }"
    class="flex-1 grid justify-items-center items-start content-start gap-y-2 text-pretty border-l border-neutral-300 dark:border-neutral-700 pb-3 px-1 first:border-none"
  >
    <!-- Period -->
    <IconSky :data="props.sky.value" />

    <div class="hidden md:block text-center">{{ props.sky.descripcion }}</div>
    <div v-if="props.sky.value" class="grid justify-items-center gap-2">
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
      <DataField v-if="props.snowLevel" class="flex items-center">
        <Icon name="mdi:snowflake" aria-hidden="true" />
        <span>
          <Value>{{ props.snowLevel }}</Value
          ><Unit>m</Unit>
        </span>
      </DataField>
    </div>
  </div>
</template>
