<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const searchQuery = ref('')
const searchResults = ref<any>([])
const resultsLayer = ref<HTMLElement | null>(null)

async function onSearch() {
  if (!searchQuery.value) {
    searchResults.value = []
    return
  }
  console.log('search', searchQuery.value)
  const data = await $fetch('/api/search/town', {
    params: {
      search: searchQuery.value
    }
  })
  searchResults.value = data
}

function onNavigateToTown(id: string) {
  const formattedId = id.replace('id', '')
  searchResults.value = []
  navigateTo(`/forecast/${formattedId}`)
}

onClickOutside(resultsLayer, () => {
  searchResults.value = []
})

watch(searchQuery, () => {
  if (!searchQuery.value) {
    searchResults.value = []
  }

  if (searchQuery.value.length >= 2) {
    onSearch()
  }
})
</script>

<template>
  <div class="grid relative">
    <input
      type="search"
      placeholder="Buscar municipio..."
      v-model="searchQuery" />
    <ul
      v-if="searchResults.length > 0"
      ref="resultsLayer"
      class="absolute z-50 top-16 left-0 right-0 shadow-2xl bg-neutral-100 max-h-[66dvh] overflow-y-auto dark:bg-neutral-800 dark:text-neutral-200">
      <li
        v-for="town in searchResults"
        class="block border-t border-1 border-dashed border-neutral-300 first:border-0 cursor-pointer p-4 hover:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
        role="button"
        @click.prevent="onNavigateToTown(town.id)">
        <span class="font-semibold">{{ town.nombre }}</span>, {{ town.province }}
      </li>
    </ul>
  </div>
</template>
