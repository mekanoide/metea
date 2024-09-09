<script setup lang="ts">
const props = defineProps<{
  data: string
}>()

const period = computed(() => {
  switch (props.data) {
    case '00-12':
      return { start: '00', end: '12' }
    case '12-24':
      return { start: '12', end: '24' }
    default:
      return { start: '00', end: '24' }
  }
})
</script>

<template>
  <div class="text-neutral-500">
    <div>{{ period.start }}</div>
    <div>{{ period.end }}</div>
  </div>
</template>
