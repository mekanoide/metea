<script setup lang="ts">
import colors from 'tailwindcss/colors'
const props = defineProps<{
  data: any
}>()

/* const { data: sun } = await useFetch('/api/sun', {
  query: {
    lat: forecast.value.town.latitud_dec,
    lng: forecast.value.town.longitud_dec
  }
}) */

const precipitationData = computed(() => {
  const precipitationValues = props.data.probPrecipitacion.map(
    (d: any) => d.value
  )
  return precipitationValues.slice(3)
})

const chartData = computed(() => {
  return {
    labels: props.data.humedadRelativa.dato.map(
      (item: any) => `${item.hora}:00`
    ),
    datasets: [
      {
        label: 'Humedad relativa (%)',
        backgroundColor: colors.gray[500],
        borderColor: colors.gray[500],
        data: props.data.humedadRelativa.dato.map((d: any) => d.value)
      },
      {
        label: 'Prob. precipitación (%)',
        backgroundColor: colors.blue[500],
        borderColor: colors.blue[500],
        data: precipitationData.value
      }
    ]
  }
})
</script>

<template>
  <details
    class="py-6 px-4 border-t border-dashed border-neutral-400 dark:border-neutral-700 first:border-t-2 first:border-solid first:border-neutral-900 first:dark:border-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800">
    <summary class="flex justify-between gap-4">
      <!-- Left block -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <Icon
            class="chevron text-neutral-600 dark:text-neutral-400"
            name="mdi:chevron-down"
            size="24" />
          <h2 class="text-xl font-semibold first-letter:capitalize">
            <NuxtTime
              :datetime="data.fecha"
              weekday="long"
              day="numeric"
              locale="es" />
          </h2>
        </div>
        <div
          v-if="data.estadoCielo.length > 1"
          class="grid gap-4">
          <!-- First period -->
          <Period
            :sky="data.estadoCielo[1]"
            :precipitation="data.probPrecipitacion[1]"
            :wind="data.viento[1]" />
          <!-- Second period -->
          <Period
            :sky="data.estadoCielo[2]"
            :precipitation="data.probPrecipitacion[2]"
            :wind="data.viento[2]" />
        </div>
        <div v-else>
          <Period
            :sky="data.estadoCielo[0]"
            :precipitation="data.probPrecipitacion[0]"
            :wind="data.viento[0]" />
          <!-- First period -->
        </div>
      </div>
      <!-- {{ data }} -->
      <!-- {{ data.probPrecipitacion }} -->
      <!-- Right block -->
      <div class="text-right">
        <div class="text-xl font-semibold">{{ data.temperatura.maxima }}°C</div>
        <div class="text-xl font-semibold mb-3">
          {{ data.temperatura.minima }}°C
        </div>
      </div>
    </summary>
    <div class="mt-6 flex gap-12 flex-wrap">
      <div class="grid gap-2 content-start">
        <div>
          <span class="text-neutral-600 dark:text-neutral-400"
            >Humedad relativa:</span
          >
          {{ data.humedadRelativa.minima }}%
          <span class="text-neutral-600 dark:text-neutral-400">-</span>
          {{ data.humedadRelativa.maxima }}%
        </div>
        <UvIndex
          v-if="data.uvMax"
          :data="data.uvMax" />
      </div>
      <div
        v-if="data.humedadRelativa.dato.length > 0"
        class="flex-1">
        <h3 class="font-semibold mb-2">Evolución</h3>
        <LazyHumidityChart :data="chartData" />
      </div>
    </div>
  </details>
</template>

<style scoped>
.chevron {
  transition: all 0.2s ease-in-out;
}

details[open] .chevron {
  rotate: 180deg;
}
</style>
