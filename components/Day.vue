<script setup lang="ts">
const props = defineProps<{
  data: any
}>()

function normalizedPeriod(period: string) {
  if (period === '00-12') return 'AM'
  return 'PM'
}
</script>

<template>
  <div
    class="py-6 border-t border-1 border-dashed border-zinc-300 dark:border-zinc-700 flex justify-between">
    <!-- Left block -->
    <div>
      <h2 class="first-letter:capitalize mb-2">
        <NuxtTime
          class="text-xl font-semibold"
          :datetime="data.fecha"
          weekday="long"
          locale="es" />
        <p>
          <NuxtTime
            :datetime="data.fecha"
            day="numeric"
            month="long"
            locale="es" />
        </p>
      </h2>
      <div v-if="data.estadoCielo.length > 1">
        <p v-if="data.estadoCielo[1].descripcion">
          {{ normalizedPeriod(data.estadoCielo[1].periodo) }}:
          <span class="font-semibold">
            {{ data.estadoCielo[1].descripcion }}
            <Icon name="mdi:water" /> {{ data.probPrecipitacion[1].value }}%
          </span>
        </p>
        <p>
          {{ normalizedPeriod(data.estadoCielo[2].periodo) }}:
          <span class="font-semibold">
            {{ data.estadoCielo[2].descripcion }}
            <Icon name="mdi:water" /> {{ data.probPrecipitacion[2].value }}%
          </span>
        </p>
      </div>
      <p v-else>
        {{ data.estadoCielo[0].periodo }}
        <span class="font-semibold">{{ data.estadoCielo[0].descripcion }}</span>
        {{ data.probPrecipitacion[0].value }}%
      </p>
      <!-- {{ dia }} -->
      <!-- {{ data.probPrecipitacion }} -->
    </div>

    <!-- Right block -->
    <div>
      <div class="text-2xl font-semibold">
        <div class="text-red-700 dark:text-red-400">
          {{ data.temperatura.maxima }}°C
        </div>
        <div class="text-sky-700 dark:text-sky-400">
          {{ data.temperatura.minima }}°C
        </div>
      </div>
    </div>
  </div>
</template>
