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

function isCurrentIndex(index: number): boolean {
  if (uvIndex.value >= 11 && index === 0) {
    return true
  }
  if (uvIndex.value < 11 && uvIndex.value >= 8 && index === 1) {
    return true
  }
  if (uvIndex.value < 8 && uvIndex.value >= 6 && index === 2) {
    return true
  }
  if (uvIndex.value < 6 && uvIndex.value >= 3 && index === 3) {
    return true
  }
  if (uvIndex.value < 3 && index === 4) {
    return true
  }
  return false
}

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
    class="flex gap-1"
    :title="`Índice UV máximo ${uvMeaning}`"
  >
    <div class="text-center">
      <div class="text-xs">UV</div>
      <div class="font-bold px-2 md:text-2xl">
        {{ uvIndex }}
      </div>
    </div>
    <div class="grid gap-[2px]">
      <div
        v-for="(item, index) in 5"
        class="w-4 rounded-sm"
        :class="
          isCurrentIndex(index) ? uvColor : 'bg-neutral-300 dark:bg-neutral-700'
        "
      ></div>
    </div>
  </div>
</template>
