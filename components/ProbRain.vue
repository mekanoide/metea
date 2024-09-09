<script setup lang="ts">
const props = defineProps<{
  data: number
}>()
</script>

<template>
  <div class="flex items-center gap-1">
    <Icon
      name="mdi:water"
      class="text-neutral-600 dark:text-neutral-400" />
    <span v-if="props.data > 0">{{ data }}%</span>
    <span v-else>-</span>
  </div>
</template>
