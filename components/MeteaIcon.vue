<script setup lang="ts">
const props = defineProps<{
  size?: string
}>()
</script>

<template>
  <svg
    :height="size ?? 64"
    viewBox="0 0 72 64"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 32L24 0L0 32H8L0 64L24 32H16Z" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M40 32L48 0L24 32H32L24 64L48 32H40Z" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M64 32L72 0L48 32H56L48 64L72 32H64Z" />
  </svg>
</template>
