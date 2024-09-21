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
    class="py-6 border-t border-dashed border-neutral-400 dark:border-neutral-700 first:border-t-2 first:border-solid first:border-neutral-900 first:dark:border-neutral-200">
    <summary class="group flex justify-between gap-4">
      <!-- Left block -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <h2 class="text-xl font-semibold first-letter:capitalize">
            <NuxtTime
              :datetime="data.fecha"
              weekday="long"
              day="numeric"
              locale="es" />
          </h2>
          <Icon
            class="chevron text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
            name="mdi:chevron-down"
            size="24" />
        </div>
        <div
          v-if="data.estadoCielo.length === 7"
          class="grid gap-4">
          <Period
            :sky="data.estadoCielo[3]"
            :precipitation="data.probPrecipitacion[3]"
            :wind="data.viento[3]" />
          <Period
            :sky="data.estadoCielo[4]"
            :precipitation="data.probPrecipitacion[4]"
            :wind="data.viento[4]" />
          <Period
            :sky="data.estadoCielo[5]"
            :precipitation="data.probPrecipitacion[5]"
            :wind="data.viento[5]" />
          <Period
            :sky="data.estadoCielo[6]"
            :precipitation="data.probPrecipitacion[6]"
            :wind="data.viento[6]" />
        </div>
        <div v-else-if="data.probPrecipitacion.length === 3">
          <Period
            :sky="data.estadoCielo[1]"
            :precipitation="data.probPrecipitacion[1]"
            :wind="data.viento[1]" />
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
        </div>
      </div>
      <!-- {{ data }} -->
      <!-- {{ data.estadoCielo.length }} -->
      <!-- {{ data.probPrecipitacion }} -->
      <!-- Right block -->
      <div class="text-right">
        <div class="text-xl font-semibold">{{ data.temperatura.maxima }}°C</div>
        <div class="text-xl font-semibold mb-3">
          {{ data.temperatura.minima }}°C
        </div>
        <UvIndex
          v-if="data.uvMax"
          :data="data.uvMax" />
      </div>
    </summary>
    <div class="mt-8 grid gap-8">
      <div>
        <h2 class="mb-2">Salida y puesta del sol</h2>
        <SunInfo :data="data.sunInfo" />
      </div>
      <div class="grid gap-2 content-start">
        <DataField class="flex">
          Humedad relativa:
          <span class="text-neutral-900 dark:text-neutral-100 font-semibold">{{
            data.humedadRelativa.minima
          }}</span
          >% -
          <span class="text-neutral-900 dark:text-neutral-100 font-semibold">{{
            data.humedadRelativa.maxima
          }}</span
          >%
        </DataField>
        <DataField v-if="data.rachaMax[0].value">
          Rachas máximas:
          <Value>{{ data.rachaMax[0].value }}</Value
          >km/h
        </DataField>
      </div>
<!--       <DataField>
        Duración del día:
        <Value>
          {{ turnTimeto24HourFormat(data.sunInfo.day_length) }}
        </Value>
        horas
      </DataField>
      {{ data.sunInfo }} -->

      <!--       <div
        v-if="data.humedadRelativa.dato.length > 0"
        class="flex-1">
        <h3 class="font-semibold mb-2">Evolución</h3>
        <LazyHumidityChart :data="chartData" />
      </div> -->
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
