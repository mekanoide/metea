<script lang="ts" setup>
const colorMode = useColorMode()

const modeIcon = computed(() => {
  if (colorMode.value === 'dark') {
    return 'mdi:weather-night'
  }
  return 'mdi:weather-sunny'
})

function onToggleColorMode() {
  colorMode.preference =
    colorMode.preference === 'dark' || colorMode.preference === 'system'
      ? 'light'
      : 'dark'
}
</script>

<template>
  <button
    aria-label="Cambiar modo de color"
    class="grid place-content-center p-2"
    @click.stop="onToggleColorMode()"
  >
    <Icon :name="modeIcon" size="24" />
  </button>
</template>
