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
        <NuxtTime
          :datetime="date"
          weekday="long"
          locale="es" />
      </span>
      <Icon
        class="chevron text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
        name="mdi:chevron-down"
        size="24" />
    </h2>
    <NuxtTime
      class="text-neutral-600 dark:text-neutral-400 md:text-xl"
      :datetime="date"
      day="numeric"
      month="long"
      locale="es" />
  </div>
</template>
