<script setup lang="ts">
import uv from '@/server/data/uv.json'
const props = defineProps<{
  data: number
}>()

const alert = computed(() => {
  if (props.data < 6) {
    return
  } else if (props.data >= 11) {
    return '!!!'
  } else if (props.data >= 8) {
    return '!!'
  } else {
    return '!'
  }
})

const title = computed(() => {
  const level = uv.find((item) => item.value === props.data)
  return `Índice ultravioleta ${level?.label}`
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
  } else {
    return 'text-red-600 dark:text-red-400'
  }
})
</script>

<template>
  <div
    class="text-right flex gap-1 justify-end"
    :title="title">
    <span class="text-neutral-600 dark:text-neutral-400">UV</span>
    <span>{{ data }}{{ alert }}</span>
  </div>
</template>
