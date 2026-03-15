<script setup lang="ts">
const { label } = defineProps<{
  label: string
}>()
</script>

<template>
  <div>
    <span class="text-secondary mr-3">{{ label }}</span>
    <slot></slot>
  </div>
</template>
