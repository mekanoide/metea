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
</script>

<template>
  <div class="w-full">
    <div class="w-full flex items-center h-6 relative mb-1">
      <DataField
        class="absolute grid justify-center top-0 -translate-x-1/2"
        :style="`left: ${dayStartPercent}%`"
        aria-label="Salida del sol">
        <Value> {{ sunrise }} </Value>
      </DataField>
      <DataField
        class="absolute grid justify-center top-0 -translate-x-1/2"
        :style="`left: ${dayEndPercent}%`"
        aria-label="Puesta del sol">
        <Value> {{ sunset }} </Value>
      </DataField>
    </div>
    <div
      class="relative w-full h-8 bg-neutral-300 dark:bg-neutral-700 rounded-md">
      <div
        class="absolute flex justify-center items-center gap-1 top-0 h-full bg-amber-500 text-neutral-800 rounded-sm"
        :style="`left: ${dayStartPercent}%; width: ${
          dayEndPercent - dayStartPercent
        }%`"
        aria-label="Duración del día"
        title="Duración del día">
        <span class="font-semibold">{{ dayLength }}</span> horas
      </div>
    </div>
  </div>
</template>
