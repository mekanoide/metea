<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
} > ()

const errorMessage = computed(() => {
  if (props.error.statusCode === 404) {
    return 'La página solicitada no existe.'
  }
  return 'Algo salio mal.'
})
</script>

<template>
  <div class="flex gap-4 items-center">
    <Icon
      name="wi:thunderstorm"
      size="96" />
    <div>
      <h1 class="text-4xl font-bold">Error {{ props.error.statusCode }}</h1>
      <p class="text-neutral-600 dark:text-neutral-400">
        {{ errorMessage }}
      </p>
      <NuxtLink
        class="underline underline-offset-4"
        to="/">
        Volver al inicio
      </NuxtLink>
    </div>
  </div>
</template>
