<script setup lang="ts">
const props = defineProps<{
  data: number
}>()
</script>

<template>
  <div class="flex items-center gap-1">
    <Icon
      name="mdi:water"
      class="text-neutral-500" />
    {{ data }}%
  </div>
</template>
