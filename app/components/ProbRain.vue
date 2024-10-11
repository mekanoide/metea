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
    <span>
      <Value>{{ data }}</Value
      ><Unit>%</Unit>
    </span>
  </DataField>
</template>
