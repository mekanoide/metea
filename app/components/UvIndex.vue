<script setup lang="ts">
import uv from '@/data/uv.json'
const props = defineProps<{
  data: number
}>()

const uvIndex = computed(() => {
  return props.data
})

const uvMeaning = computed(() => {
  const level = uv.find((item) => item.value === props.data)
  return level?.label
})

const uvColor = computed(() => {
  if (uvIndex.value < 3) {
    return 'bg-low-light dark:bg-low-dark'
  } else if (uvIndex.value < 6) {
    return 'bg-moderate-light dark:bg-moderate-dark'
  } else if (uvIndex.value < 8) {
    return 'bg-high-low dark:bg-high-dark'
  } else if (uvIndex.value < 11) {
    return 'bg-veryhigh-light dark:bg-veryhigh-dark'
  } else if (uvIndex.value >= 11) {
    return 'bg-extreme-light dark:bg-extreme-dark'
  }
})
</script>

<template>
  <div
    class="grid content-start justify-items-center rounded-sm py-1 text-neutral-900"
    :class="uvColor"
    :title="`Índice UV máximo ${uvMeaning}`"
  >
    <div class="text-xs">UV</div>
    <div class="font-bold px-2 md:text-xl">
      {{ uvIndex }}
    </div>
  </div>
</template>
