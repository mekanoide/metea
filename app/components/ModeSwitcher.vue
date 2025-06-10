<script lang="ts" setup>
const colorMode = useColorMode()

const currentIcon = computed(() => {
  return colorMode.value === 'dark' ? 'mdi:weather-night' : 'mdi:weather-sunny'
})

function onToggleColorMode() {
  colorMode.preference =
    colorMode.preference === 'dark' || colorMode.preference === 'system'
      ? 'light'
      : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button
      aria-label="Cambiar modo de color"
      class="grid place-content-center p-2"
      @click.stop="onToggleColorMode()"
    >
      <Icon :name="currentIcon" size="24" />
    </button>
  </ClientOnly>
</template>
