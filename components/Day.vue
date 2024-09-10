<script setup lang="ts">
const props = defineProps<{
  data: any
}>()
</script>

<template>
  <details
    class="appearance-none py-6 px-4 border-t border-dashed border-neutral-400 dark:border-neutral-700 first:border-t-2 first:border-solid first:border-neutral-900 first:dark:border-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800">
    <summary class="flex justify-between gap-4">
      <!-- Left block -->
      <div>
        <h2 class="text-xl font-semibold first-letter:capitalize mb-2">
          <NuxtTime
            :datetime="data.fecha"
            weekday="long"
            day="numeric"
            locale="es" />
        </h2>
        <div
          v-if="data.estadoCielo.length > 1"
          class="grid gap-4">
          <!-- First period -->
          <div
            v-if="data.estadoCielo[1].descripcion"
            class="flex items-start flex-nowrap gap-x-4 gap-y-2">
            <!-- Period -->
            <Period :data="data.estadoCielo[1].periodo" />
            <IconSky :data="data.estadoCielo[1].value" />
            <div
              class="grid"
              aria-label="Probabilidad de lluvia">
              <div class="overflow-hidden text-ellipsis">
                {{ data.estadoCielo[1].descripcion }}
              </div>
              <div class="flex items-center gap-4">
                <!-- Rain -->
                <ProbRain :data="data.probPrecipitacion[1].value" />
                <!-- Wind -->
                <Wind :data="data.viento[1]" />
              </div>
            </div>
          </div>
          <!-- Second period -->
          <div
            v-if="data.estadoCielo[2].descripcion"
            class="flex items-start flex-nowrap gap-x-4 gap-y-2">
            <!-- Period -->
            <Period :data="data.estadoCielo[2].periodo" />
            <IconSky :data="data.estadoCielo[2].value" />
            <div
              class="grid"
              aria-label="Probabilidad de lluvia">
              {{ data.estadoCielo[2].descripcion }}
              <div class="flex items-center gap-4">
                <!-- Rain -->
                <ProbRain :data="data.probPrecipitacion[2].value" />
                <!-- Wind -->
                <Wind :data="data.viento[2]" />
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <!-- First period -->
          <div
            v-if="data.estadoCielo[0].descripcion"
            class="flex items-start flex-nowrap gap-x-4 gap-y-2 text-pretty">
            <!-- Period -->
            <Period :data="data.estadoCielo[0].periodo" />
            <IconSky :data="data.estadoCielo[0].value" />
            <div
              class="grid"
              aria-label="Probabilidad de lluvia">
              <div class="overflow-hidden text-ellipsis">
                {{ data.estadoCielo[0].descripcion }}
              </div>
              <div class="flex items-center gap-4">
                <!-- Rain -->
                <ProbRain :data="data.probPrecipitacion[0].value" />
                <!-- Wind -->
                <Wind :data="data.viento[0]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- {{ data }} -->
      <!-- {{ data.probPrecipitacion }} -->
      <!-- Right block -->
      <div class="text-right">
        <div class="text-red-700 dark:text-red-400 text-xl font-semibold">
          {{ data.temperatura.maxima }}°C
        </div>
        <div class="text-sky-700 dark:text-sky-400 text-xl font-semibold mb-1">
          {{ data.temperatura.minima }}°C
        </div>
        <UvIndex v-if="data.uvMax" :data="data.uvMax" />
      </div>
    </summary>
    <!-- {{ data }} -->
  </details>
</template>
