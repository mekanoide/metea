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
  <details
    class="py-6 border-t border-dashed border-neutral-300 dark:border-neutral-700 first:border-t-2 first:border-solid first:border-neutral-700 dark:first:border-neutral-300">
    <summary class="flex justify-between gap-4">
      <!-- Left block -->
      <div>
        <h2 class="text-xl font-semibold first-letter:capitalize mb-2">
          <NuxtTime
            :datetime="data.fecha"
            weekday="long"
            day="numeric"
            month="short"
            locale="es" />
        </h2>
        <div
          v-if="data.estadoCielo.length > 1"
          class="text-neutral-400">
          <div v-if="data.estadoCielo[1].descripcion" class="flex items-center flex-wrap gap-x-6 gap-y-2">
            <!-- Period -->
            {{ normalizedPeriod(data.estadoCielo[1].periodo) }}
            <div class="flex items-center" aria-label="Estado del cielo">
              {{ data.estadoCielo[1].descripcion }}
            </div>
            <!-- Precipitation -->
            <div class="flex items-center" aria-label="Probabilidad de lluvia">
              <Icon name="mdi:water" />
              {{ data.probPrecipitacion[1].value }}%
            </div>
            <!-- Wind -->
            <Wind :data="data.viento[1]" />
          </div>
          <p>
            <!-- Period -->
            {{ normalizedPeriod(data.estadoCielo[2].periodo) }}
            <!-- Sky -->
            <span class="font-semibold">
              {{ data.estadoCielo[2].descripcion }}
            </span>
            <!-- Precipitation -->
            <span>
              <Icon name="mdi:water" />
              {{ data.probPrecipitacion[2].value }}%
            </span>
            <!-- Wind -->
            <Wind :data="data.viento[2]" />
          </p>
        </div>
        <p v-else>
          {{ data.estadoCielo[0].periodo }}
          <span class="font-semibold">{{
            data.estadoCielo[0].descripcion
          }}</span>
          {{ data.probPrecipitacion[0].value }}%
        </p>
      </div>
      <!-- {{ data }} -->
      <!-- {{ data.probPrecipitacion }} -->
      <!-- Right block -->
      <div class="text-2xl font-semibold">
        <div class="text-red-700 dark:text-red-400">
          {{ data.temperatura.maxima }}°C
        </div>
        <div class="text-sky-700 dark:text-sky-400">
          {{ data.temperatura.minima }}°C
        </div>
      </div>
    </summary>
  </details>
</template>
