<script setup lang="ts">
import type { Sky, Wind, Precipitation } from '@/types/weather'

const props = defineProps<{
  sky: Sky
  precipitation: Object
  wind: Wind
}>()
</script>

<template>
  <div
    v-if="sky.descripcion"
    class="flex items-start flex-nowrap gap-x-4 gap-y-2 text-pretty">
    <!-- Period -->
    <PeriodTitle :data="sky.periodo" />
    <IconSky :data="sky.value" />
    <div
      class="grid"
      aria-label="Probabilidad de lluvia">
      <div class="overflow-hidden text-ellipsis">
        {{ sky.descripcion }}
      </div>
      <div class="flex items-center gap-4">
        <!-- Rain -->
        <ProbRain :data="precipitation.value" />
        <!-- Wind -->
        <Wind :data="wind" />
      </div>
    </div>
  </div>
</template>
