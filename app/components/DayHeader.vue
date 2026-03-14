<script setup lang="ts">
const props = defineProps<{
  date: string
  expanded?: boolean
}>()
</script>

<template>
  <div>
    <h2 class="flex gap-2 items-center">
      <span class="text-xl font-semibold first-letter:capitalize md:text-2xl">
        <NuxtTime :datetime="date" weekday="long" locale="es" />
      </span>
    </h2>
    <NuxtTime
      class="text-secondary md:text-xl"
      :datetime="date"
      day="numeric"
      month="long"
      locale="es"
    />
  </div>
</template>
