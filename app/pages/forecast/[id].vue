<script setup lang="ts">
const route = useRoute()
const { saveVisitedTown } = useVisitedTowns()

const id = route.params.id as string

// Estado de carga inmediato
const isLoading = ref(true)
const error = ref<any>(null)
const forecastData = ref<any>(null)

// Función para cargar datos
async function loadForecast() {
  isLoading.value = true
  error.value = null
  
  const { data, error: fetchError } = await useFetch(`/api/forecast/town/${id}`)
  
  if (fetchError.value) {
    error.value = fetchError.value
  } else {
    forecastData.value = data.value
    
    // Guardar municipio visitado
    if (data.value?.town) {
      saveVisitedTown({
        id: id,
        name: data.value.town.nombre,
        province: data.value.town.province.name
      })
    }
  }
  
  isLoading.value = false
}

// Cargar datos al montar el componente
await loadForecast()

// Actualizar título de la página
useHead({
  title: forecastData.value?.town?.nombre 
    ? `Previsión para ${forecastData.value.town.nombre} | Metea`
    : 'Cargando pronóstico | Metea',
  meta: [
    {
      name: 'og:title',
      content: forecastData.value?.town?.nombre 
        ? `Previsión para ${forecastData.value.town.nombre}`
        : 'Cargando pronóstico'
    }
  ]
})

// Función para reintentar
function retry() {
  loadForecast()
}

// Función para obtener mensaje de error específico
function getErrorMessage(error: any) {
  if (error?.statusCode === 408) {
    return 'Tiempo de espera agotado al conectar con AEMET'
  }
  if (error?.statusCode === 503) {
    return 'No hay conexión con el servidor de AEMET'
  }
  if (error?.statusCode === 404) {
    return 'Municipio no encontrado'
  }
  return error?.message || 'Error desconocido'
}
</script>

<template>
  <Search />
  
  <!-- Estado de carga -->
  <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[50vh] p-8">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
    <h2 class="text-xl font-semibold mb-2">Cargando pronóstico</h2>
    <p class="text-neutral-600 dark:text-neutral-400">
      Conectando con AEMET...
    </p>
  </div>

  <!-- Estado de error -->
  <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[50vh] p-8">
    <div class="text-center max-w-md">
      <div class="text-red-500 mb-4">
        <Icon name="mdi:alert-circle" size="48" />
      </div>
      <h2 class="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">
        Error al cargar el pronóstico
      </h2>
      <p class="text-neutral-600 dark:text-neutral-400 mb-4">
        {{ getErrorMessage(error) }}
      </p>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        @click="retry"
      >
        Intentar de nuevo
      </button>
    </div>
  </div>

  <!-- Datos del pronóstico -->
  <article v-else-if="forecastData" class="animate-fade-in">
    <TownInfo :data="forecastData.town" />
    <Day v-for="day in forecastData.prediccion.dia" :key="day.fecha" :data="day" />
  </article>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
