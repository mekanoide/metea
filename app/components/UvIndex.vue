<script setup lang="ts">
import uv from '@/data/uv.json'
const props = defineProps<{
  data: number
}>()

const uvMeaning = computed(() => {
  const level = uv.find((item) => item.value === props.data)
  return level?.label
})

const uvColor = computed(() => {
  if (props.data < 3) {
    return 'bg-green-600 dark:bg-green-400'
  } else if (props.data < 6) {
    return 'bg-yellow-600 dark:bg-yellow-400'
  } else if (props.data < 8) {
    return 'bg-orange-600 dark:bg-orange-400'
  } else if (props.data < 11) {
    return 'bg-red-600 dark:bg-red-400'
  } else if (props.data >= 11) {
    return 'bg-purple-600 dark:bg-purple-400'
  }
})
</script>

<template>
  <div
    class="grid content-start justify-items-center"
    :title="`Índice UV máximo ${uvMeaning}`">
    <div>UV</div>
    <div
      class="font-semibold text-neutral-900 px-2 rounded-sm md:text-lg"
      :class="uvColor">
      {{ data }}
    </div>
  </div>
</template>
