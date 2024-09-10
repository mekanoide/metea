<script setup lang="ts">
import conditions from '@/server/data/conditions.json'

const props = defineProps<{
  data: string
}>()

const icon = computed(() => {
  const condition = conditions.find((item) => item.value === props.data)
  return condition || { icon: 'mdi:minus' }
})
</script>

<template>
  <div role="presentation">
    <Icon
      :name="icon.icon"
      size="48" />
  </div>
</template>
