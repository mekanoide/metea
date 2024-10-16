<script setup lang="ts">
import conditions from '@/data/conditions.json'

const props = defineProps<{
  data: string
}>()

const icon = computed(() => {
  const condition = conditions.find((item) => item.value === props.data)
  return condition || { icon: 'mdi:minus' }
})
</script>

<template>
  <Icon aria-hidden="true" :name="icon.icon" size="48" />
</template>
