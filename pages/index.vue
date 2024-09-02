<script setup lang="ts">
const config = useRuntimeConfig()

const { data } = await useFetch('/api/forecast/town/28079')
</script>

<template>
  <main>
    <h1>{{ data.nombre }}</h1>
    <div
      v-for="dia in data.prediccion.dia"
      class="py-8 border-t border-1 border-gray-500">
      <header class="flex justify-between text-2xl mb-4 font-bold">
        <h2><NuxtTime :datetime="dia.fecha" day="numeric" month="long" weekday="long" locale="es" /></h2>
        <p><span class="text-red-700">{{ dia.temperatura.maxima }}°C</span> / <span class="text-blue-700">{{ dia.temperatura.minima }}°C</span></p>
      </header>
      <div v-if="dia.estadoCielo.length > 1">
        <p>{{ dia.estadoCielo[1].periodo }} <span class="font-bold">{{ dia.estadoCielo[1].descripcion }}</span></p>
        <p>{{ dia.estadoCielo[2].periodo }} <span class="font-bold">{{ dia.estadoCielo[2].descripcion }}</span></p>
      </div>
      <p v-else>{{ dia.estadoCielo[0].periodo }} <span class="font-bold">{{ dia.estadoCielo[0].descripcion }}</span></p>
      <!-- {{ dia }} -->
    </div>
  </main>
</template>
