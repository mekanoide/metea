<script setup lang="ts">
const route = useRoute()

const { data: forecast } = useFetch(`/api/forecast/town/${route.params.id}`)

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
    <TownInfo :data="forecast.town" />
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
