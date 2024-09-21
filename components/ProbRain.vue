<script setup lang="ts">
const props = defineProps<{
  data: number
}>()
</script>

<template>
  <DataField
    class="flex items-center"
    title="Probabilidad de precipitación"
    aria-label="Probabilidad de precipitación">
    <Icon name="mdi:water" aria-hidden="true" />
    <Value>{{ data }}</Value
    >%
  </DataField>
</template>
