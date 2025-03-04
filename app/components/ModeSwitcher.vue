<script lang="ts" setup>
const colorMode = useColorMode()

const isDark = computed(() => colorMode.preference === 'dark')

function onToggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    class="grid place-content-center p-2"
    @click.stop="onToggleColorMode()"
  >
    <Icon
      :name="isDark ? 'mdi:weather-night' : 'mdi:weather-sunny'"
      size="24"
    />
  </button>
</template>
