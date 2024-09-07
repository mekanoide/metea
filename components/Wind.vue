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
    case 'SW':
      return 'mdi:arrow-top-right'
    case 'W':
      return 'mdi:arrow-right'
    case 'NW':
      return 'mdi:arrow-bottom-right'
  }
}
</script>

<template>
  <div
    class="flex items-center"
    aria-label="Viento">
    <Icon name="mdi:weather-windy" />
    {{ data.velocidad }} km/h  <Icon :name="iconWindDirection(data.direccion)" class="ml-2" /> {{ data.direccion }}
  </div>
</template>
