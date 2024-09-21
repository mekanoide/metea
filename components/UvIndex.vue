<script setup lang="ts">
import uv from '@/server/data/uv.json'
const props = defineProps<{
  data: number
}>()

const uvMeaning = computed(() => {
  const level = uv.find((item) => item.value === props.data)
  return level?.label
})

const uvColor = computed(() => {
  if (props.data < 3) {
    return 'text-green-600 dark:text-green-400'
  } else if (props.data < 6) {
    return 'text-yellow-600 dark:text-yellow-400'
  } else if (props.data < 8) {
    return 'text-orange-600 dark:text-orange-400'
  } else if (props.data < 11) {
    return 'text-red-600 dark:text-red-400'
  } else if (props.data >= 11) {
    return 'text-purple-600 dark:text-purple-400'
  }
})
</script>

<template>
  <div class="flex gap-1 justify-end" :title="`Índice UV máximo ${uvMeaning}`" :class="uvColor">
    <span>UV</span>
    <span
      class="font-semibold">
      {{ data }}
    </span>
  </div>
</template>
