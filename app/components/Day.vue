<script setup lang="ts">
import colors, { sky } from 'tailwindcss/colors'
import uv from '@/data/uv.json'
const props = defineProps<{
  data: any
}>()

const isExpanded = ref<boolean>(false)

/* const { data: sun } = await useFetch('/api/sun', {
  query: {
    lat: forecast.value.town.latitud_dec,
    lng: forecast.value.town.longitud_dec
  }
}) */

function uvMeaning(i: number): string | undefined {
  const uvLevel = uv.find((item) => item.value === i)
  if (!uvLevel) return
  return uvLevel?.label
}

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

const sky = computed(() => {
  const period = props.data.estadoCielo[0].value
    ? props.data.estadoCielo[0]
    : props.data.estadoCielo.find((d: any) => d.value)
  return {
    value: period.value,
    description: period.description
  }
})
</script>

<template>
  <details
    class="py-6 border-t border-dashed border-neutral-300 dark:border-neutral-700 first:border-t-2 first:border-solid first:border-neutral-900 first:dark:border-neutral-200"
  >
    <summary class="flex justify-between items-center gap-4">
      <!-- Left block -->
      <DayHeader :date="data.fecha" />
      <!-- Middle block -->

      <!-- Right block -->
      <div class="flex gap-6 items-center justify-self-end">
        <!-- TODO: alerts and warnings -->
        <div :aria-label="sky.description" :title="sky.description">
          <IconSky :data="sky.value" />
        </div>
        <div
          class="w-12 text-right"
          aria-label="Temperaturas máxima y mínima"
          title="Temperaturas máxima y mínima"
        >
          <div class="text-xl font-semibold md:text-2xl">
            {{ data.temperatura.maxima }}°C
          </div>
          <div class="md:text-xl">{{ data.temperatura.minima }}°C</div>
        </div>
      </div>
    </summary>
    <div class="mt-6">
      <!-- Four periods -->
      <div v-if="data.estadoCielo.length === 7">
        <div class="flex">
          <PeriodCompact
            :temp="data.temperatura.dato[0].value"
            :sky="data.estadoCielo[3]"
            :precipitation="data.probPrecipitacion[3]"
            :wind="data.viento[3]"
            :gust="data.rachaMax[3].value"
            :snowLevel="data.cotaNieveProv[3].value"
          />
          <PeriodCompact
            :temp="data.temperatura.dato[1].value"
            :sky="data.estadoCielo[4]"
            :precipitation="data.probPrecipitacion[4]"
            :wind="data.viento[4]"
            :gust="data.rachaMax[4].value"
            :snowLevel="data.cotaNieveProv[4].value"
          />
          <PeriodCompact
            :temp="data.temperatura.dato[2].value"
            :sky="data.estadoCielo[5]"
            :precipitation="data.probPrecipitacion[5]"
            :wind="data.viento[5]"
            :gust="data.rachaMax[5].value"
            :snowLevel="data.cotaNieveProv[5].value"
          />
          <PeriodCompact
            :temp="data.temperatura.dato[3].value"
            :sky="data.estadoCielo[6]"
            :precipitation="data.probPrecipitacion[6]"
            :wind="data.viento[6]"
            :gust="data.rachaMax[6].value"
            :snowLevel="data.cotaNieveProv[6].value"
          />
        </div>
      </div>
      <!-- Two periods -->
      <div v-else-if="data.probPrecipitacion.length === 3">
        <div class="flex">
          <PeriodCompact
            :sky="data.estadoCielo[1]"
            :precipitation="data.probPrecipitacion[1]"
            :wind="data.viento[1]"
            :gust="data.rachaMax[1].value"
          />
          <PeriodCompact
            :sky="data.estadoCielo[2]"
            :precipitation="data.probPrecipitacion[2]"
            :wind="data.viento[2]"
            :gust="data.rachaMax[2].value"
          />
        </div>
      </div>
      <div v-else>
        <PeriodCompact
          :sky="data.estadoCielo[0]"
          :precipitation="data.probPrecipitacion[0]"
          :wind="data.viento[0]"
          :gust="data.rachaMax[0].value"
        />
      </div>
      <div class="grid gap-8">
        <SunInfo :data="data.sunInfo" />
        <div class="grid gap-2 content-start">
          <DataField class="flex items-baseline">
            <label>Humedad relativa: </label>
            <Value
              class="text-neutral-900 dark:text-neutral-100 font-semibold"
              >{{ data.humedadRelativa.minima }}</Value
            ><Unit>%</Unit><span> - </span>
            <Value
              class="text-neutral-900 dark:text-neutral-100 font-semibold"
              >{{ data.humedadRelativa.maxima }}</Value
            ><Unit>%</Unit>
          </DataField>
          <DataField v-if="data.uvMax">
            Índice UV máximo:
            <Value>{{ data.uvMax }}</Value> ({{ uvMeaning(data.uvMax) }})
          </DataField>
          <DataField v-if="data.rachaMax[0].value">
            Rachas máximas:
            <Value>{{ data.rachaMax[0].value }}</Value
            ><Unit>km/h</Unit>
          </DataField>
        </div>
      </div>
      <!-- {{ props.data }} -->
    </div>
  </details>

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
</template>

<style scoped>
details :deep(.chevron) {
  transition: all 0.2s ease-in-out;
}

details[open] :deep(.chevron) {
  rotate: 180deg;
}
</style>
