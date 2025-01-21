<script setup lang="ts">
import { turnTimeToPercentage, turnTimeto24HourFormat } from '@/utils/time'

const props = defineProps<{
  data: any
}>()

const sunrise = computed(() => {
  return turnTimeto24HourFormat(props.data.sunrise)
})

const sunset = computed(() => {
  return turnTimeto24HourFormat(props.data.sunset)
})

const dayLength = computed(() => {
  return turnTimeto24HourFormat(props.data.day_length)
})

const dayStartPercent = computed(() => {
  return turnTimeToPercentage(sunrise.value)
})

const dayEndPercent = computed(() => {
  return turnTimeToPercentage(sunset.value)
})

const dayLengthPercent = computed(() => {
  return turnTimeToPercentage(props.data.day_length)
})

const middayPercent = computed(() => {
  return (dayStartPercent.value + dayEndPercent.value) / 2
})
</script>

<template>
  <div class="w-full">
    <div
      class="relative w-full h-0.5 bg-neutral-300 dark:bg-neutral-700 rounded-md"
    >
      <div
        class="absolute flex justify-center items-center gap-1 top-0 h-full bg-amber-500 text-neutral-800 rounded-sm"
        :style="`left: ${dayStartPercent}%; width: ${
          dayEndPercent - dayStartPercent
        }%`"
        :aria-label="`Duración del día ${dayLength} horas`"
        :title="`Duración del día ${dayLength} horas`"
      ></div>
    </div>
    <!-- Times -->
    <div class="w-full flex items-center h-12 relative -mt-0.5">
      <DataField
        class="absolute grid justify-items-center top-0 -translate-x-1/2"
        :style="`left: ${dayStartPercent}%`"
        aria-label="Salida del sol"
        title="Salida del sol"
      >
        <div class="w-0.5 h-4 bg-amber-500"></div>
        <Value> {{ sunrise }} </Value>
      </DataField>
      <DataField
        class="absolute grid justify-items-center top-0 -translate-x-1/2"
        aria-label="Duración del día"
        title="Duración del día"
        :style="`left: ${middayPercent}%`"
      >
        <div class="flex items-center mt-4">
          <Icon
            name="mdi:weather-sunny"
            aria-hidden="true"
            size="16"
            class="text-amber-500"
          /><span>
            <Value>{{ dayLength }}</Value
            ><Unit>h</Unit>
          </span>
        </div>
      </DataField>
      <DataField
        class="absolute grid justify-items-center top-0 -translate-x-1/2"
        :style="`left: ${dayEndPercent}%`"
        aria-label="Puesta del sol"
        title="Puesta del sol"
      >
        <div class="w-0.5 h-4 bg-amber-500"></div>
        <Value> {{ sunset }} </Value>
      </DataField>
    </div>
  </div>
</template>
