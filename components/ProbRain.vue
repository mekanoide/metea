<script setup lang="ts">
const props = defineProps<{
  data: number
}>()
</script>

<template>
  <div
    class="flex items-center gap-1"
    title="Probabilidad de precipitación">
    <Icon
      name="mdi:water"
      class="text-neutral-600 dark:text-neutral-400" />
    <div>
      {{ data }}<span class="text-neutral-600 dark:text-neutral-400">%</span>
    </div>
  </div>
</template>
