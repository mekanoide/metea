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
    {{ data }}%
  </div>
</template>
