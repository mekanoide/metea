<script setup lang="ts">
import type { Wind } from '@/types/wind'
const props = defineProps<{
  data: Wind
}>()

function iconWindDirection(dir: string): string {
  switch (dir) {
    case 'N':
      return 'mdi:arrow-down'
    case 'NE':
      return 'mdi:arrow-bottom-left'
    case 'E':
      return 'mdi:arrow-left'
    case 'SE':
      return 'mdi:arrow-top-left'
    case 'S':
      return 'mdi:arrow-up'
    case 'SO':
      return 'mdi:arrow-top-right'
    case 'O':
      return 'mdi:arrow-right'
    case 'NO':
      return 'mdi:arrow-bottom-right'
    default:
      return 'mdi:minus'
  }
}
</script>

<template>
  <div
    class="flex items-center gap-1"
    aria-label="Viento"
    title="Viento">
    <Icon
      name="mdi:weather-windy"
      class="text-neutral-600 dark:text-neutral-400" />
    <span
      v-if="data.velocidad > 0"
      class="flex items-center gap-1">
      {{ data.velocidad }}km/h
      <span class="flex items-center">
        <span class="hidden sm:inline">{{ data.direccion }}</span>
        <Icon
          :name="iconWindDirection(data.direccion)"
          class="ml-2"
          aria-hidden="true" />
      </span>
    </span>
    <span v-else>-</span>
  </div>
</template>
