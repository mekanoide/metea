<script setup lang="ts">
import type { Wind } from "@@/types/weather"

const props = defineProps<{
  data: Wind
  gust?: number
}>()

function iconWindDirection(dir: string): string {
  switch (dir) {
    case "N":
      return "mdi:arrow-down"
    case "NE":
      return "mdi:arrow-bottom-left"
    case "E":
      return "mdi:arrow-left"
    case "SE":
      return "mdi:arrow-top-left"
    case "S":
      return "mdi:arrow-up"
    case "SO":
      return "mdi:arrow-top-right"
    case "O":
      return "mdi:arrow-right"
    case "NO":
      return "mdi:arrow-bottom-right"
    default:
      return "mdi:minus"
  }
}

function textWindDirection(dir: string): string {
  switch (dir) {
    case "N":
      return "Norte"
    case "NE":
      return "Noreste"
    case "E":
      return "Este"
    case "SE":
      return "Sureste"
    case "S":
      return "Sur"
    case "SO":
      return "Suroeste"
    case "O":
      return "Oeste"
    case "NO":
      return "Noroeste"
    default:
      return "mdi:minus"
  }
}
</script>

<template>
  <DataField
    class="flex items-center gap-1 flex-wrap"
    title="Viento y rachas máximas"
    aria-label="Viento y rachas máximas"
  >
    <Icon name="mdi:weather-windy" aria-hidden="true" />
    <span v-if="data.velocidad > 0" class="flex items-center gap-1">
      <span>
        <Value>{{ data.velocidad }}</Value
        ><span v-if="gust"
          >(<Value>{{ gust }}</Value
          >)</span
        ><Unit>km/h</Unit>
      </span>
      <Icon
        :name="iconWindDirection(data.direccion)"
        :aria-label="`Dirección ${textWindDirection(data.direccion)}`"
      />
    </span>
    <span v-else>-</span>
  </DataField>
</template>
