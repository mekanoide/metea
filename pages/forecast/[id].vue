<script setup lang="ts">
const route = useRoute()

const { data: forecast } = useFetch(`/api/forecast/town/${route.params.id}`)

const normalizedPopulation = computed(() => {
  return Intl.NumberFormat('es-ES', {
    notation: 'standard',
    maximumFractionDigits: 0
  }).format(forecast.value.town.num_hab)
})

const formattedLatitude = computed(() => {
  const latitude = `${forecast.value.town.latitud.split("'")[0]}'`
  const hemisphere = latitude[0] === '-' ? 'S' : 'N'
  return `${latitude}${hemisphere}`
})

const formattedLongitude = computed(() => {
  const longitude = `${forecast.value.town.longitud.split("'")[0]}'`
  const hemisphere = longitude[0] === '-' ? 'W' : 'E'
  const longitudeWithoutHemisphere =
    longitude[0] === '-' ? longitude.slice(1) : longitude
  return `${longitudeWithoutHemisphere}${hemisphere}`
})

function normalizedPeriod(period: string) {
  if (period === '00-12') return 'AM'
  return 'PM'
}

useHead({
  title: `Previsión para ${forecast.value?.town?.nombre} | Metea`
})
</script>

<template>
  <Search />
  <article v-if="forecast">
    <div class="py-6">
      <!-- {{ forecast.town }} -->
      <h1 class="mb-2">
        <span class="text-4xl font-semibold">{{ forecast.town.nombre }}</span
        ><span class="text-xl font-semibold">
          // {{ forecast.province.nombre }}</span
        >
      </h1>
      <p>
        Altitud:
        <span class="font-semibold">{{ forecast.town.altitud }}m</span> Latitud:
        <span class="font-semibold">{{ formattedLatitude }}</span> Longitud:
        <span class="font-semibold">{{ formattedLongitude }}</span>
      </p>
      <p>
        Población:
        <span class="font-semibold">{{ normalizedPopulation }}</span>
      </p>
    </div>
    <div
      v-for="dia in forecast.prediccion.dia"
      class="py-6 border-t border-1 border-dashed border-zinc-300 dark:border-zinc-700 flex justify-between">
      <div>
        <h2 class="text-xl font-semibold first-letter:capitalize mb-2">
          <NuxtTime
            :datetime="dia.fecha"
            weekday="long"
            locale="es" />
        </h2>
        <p>
          <NuxtTime
            :datetime="dia.fecha"
            day="numeric"
            month="long"
            locale="es" />
        </p>
        <div v-if="dia.estadoCielo.length > 1">
          <p v-if="dia.estadoCielo[1].descripcion">
            {{ normalizedPeriod(dia.estadoCielo[1].periodo) }}:
            <span class="font-semibold">
              {{ dia.estadoCielo[1].descripcion }}
              <Icon name="mdi:water" /> {{ dia.probPrecipitacion[1].value }}%
            </span>
          </p>
          <p>
            {{ normalizedPeriod(dia.estadoCielo[2].periodo) }}:
            <span class="font-semibold">
              {{ dia.estadoCielo[2].descripcion }}
              <Icon name="mdi:water" /> {{ dia.probPrecipitacion[2].value }}%
            </span>
          </p>
        </div>
        <p v-else>
          {{ dia.estadoCielo[0].periodo }}
          <span class="font-semibold">{{
            dia.estadoCielo[0].descripcion
          }}</span>
          {{ dia.probPrecipitacion[0].value }}%
        </p>
        <!-- {{ dia }} -->
        <!-- {{ dia.probPrecipitacion }} -->
      </div>
      <div>
        <div class="text-2xl font-semibold">
          <div class="text-red-700 dark:text-red-400">
            {{ dia.temperatura.maxima }}°C
          </div>
          <div class="text-sky-700 dark:text-sky-400">
            {{ dia.temperatura.minima }}°C
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
