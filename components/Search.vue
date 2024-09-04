<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

const searchQuery = ref('')
const searchResults = ref<any>([])
const resultsLayer = ref<HTMLElement | null>(null)

async function onSearch(e: Event) {
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
</script>

<template>
  <div class="grid relative">
    <input
      type="search"
      placeholder="Buscar municipio..."
      v-model="searchQuery"
      @input="onSearch" />
    <ul
      v-if="searchResults.length > 0"
      ref="resultsLayer"
      class="absolute top-16 shadow-2xl rounded-lg bg-zinc-100 max-h-[66dvh] overflow-y-auto w-full dark:bg-zinc-800 dark:text-zinc-200">
      <li
        v-for="town in searchResults"
        class="block border-t border-1 border-dashed border-zinc-300 cursor-pointer p-4 hover:bg-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-50"
        role="button"
        @click.prevent="onNavigateToTown(town.id)">
        {{ town.nombre }}
      </li>
    </ul>
  </div>
</template>
