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

const currentLevel = computed(() => {
  if (uvIndex.value >= 11) return 0
  if (uvIndex.value >= 8) return 1
  if (uvIndex.value >= 6) return 2
  if (uvIndex.value >= 3) return 3
  return 4
})

const uvColor = computed(() => {
  if (uvIndex.value >= 11) return 'bg-extreme'
  if (uvIndex.value >= 8) return 'bg-veryhigh'
  if (uvIndex.value >= 6) return 'bg-high'
  if (uvIndex.value >= 3) return 'bg-moderate'
  return 'bg-low'
})

function cellColor(index: number): string {
  return index >= currentLevel.value ? uvColor.value : 'bg-highlighted'
}
</script>

<template>
  <div class="flex gap-1" :title="`Índice UV máximo ${uvMeaning}`">
    <div class="text-center">
      <div class="text-xs">UV</div>
      <div class="font-bold px-2 md:text-2xl">
        {{ uvIndex }}
      </div>
    </div>
    <div class="grid gap-[2px]">
      <div
        v-for="(item, index) in 5"
        class="w-4"
        :class="cellColor(index)"
      ></div>
    </div>
  </div>
</template>
