<script setup lang="ts">
const props = defineProps<{
  data?: string
}>()

const period = computed(() => {
  switch (props.data) {
    case '00-12':
      return { start: '00', end: '12' }
    case '12-24':
      return { start: '12', end: '24' }
    case '00-06':
      return { start: '00', end: '06' }
    case '06-12':
      return { start: '06', end: '12' }
    case '12-18':
      return { start: '12', end: '18' }
    case '18-24':
      return { start: '18', end: '24' }
    default:
      return { start: '00', end: '24' }
  }
})
</script>

<template>
  <div class="text-neutral-600 dark:text-neutral-400 flex md:block">
    <div>{{ period.start }}<span class="hidden md:inline">:00</span></div>
    <div class="text-center md:hidden">-</div>
    <div>{{ period.end }}<span class="hidden md:inline">:00</span></div>
  </div>
</template>
