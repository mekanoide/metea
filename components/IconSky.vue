<script setup lang="ts">
import conditions from '@/server/data/conditions.json'

const props = defineProps<{
  data: string
}>()

function iconWeather(data: string): string {
  switch (data) {
    case 'Lluvia':
      return 'mdi:weather-pouring'
    case 'Nieve':
      return 'mdi:weather-snowy'
    case 'Nublado':
      return 'mdi:weather-partly-cloudy'
    case 'Despejado':
      return 'fluent:weather-sunny-48-regular'
    case 'Poco nuboso' || 'Parcialmente nuboso':
      return 'fluent:weather-partly-cloudy-day-48-regular'
    case 'Nuboso' || 'Nubes altas':
      return 'fluent:weather-cloudy-48-regular'
    case 'Cubierto con lluvia' || 'Muy nuboso con lluvia':
      return 'fluent:weather-rain-48-regular'
    default:
      return 'mdi:minus'
  }
}

const icon = computed(() => {
  const condition = conditions.find((item) => item.description === props.data)
  return condition || { icon: 'mdi:minus' }
})
</script>

<template>
  <div role="presentation">
    <Icon
      :name="icon.icon"
      size="48" />
  </div>
</template>
