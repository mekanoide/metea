<script setup lang="ts">
const searchQuery = ref('')
const searchResults = ref<any>([])
const resultsLayer = ref<HTMLElement | null>(null)

async function onSearch(e: Event) {
  if (!searchQuery.value) {
    searchResults.value = []
    if (resultsLayer.value) resultsLayer.value.hidePopover()
    return
  }
  console.log('search', searchQuery.value)
  const data = await $fetch('/api/search/town', {
    params: {
      search: searchQuery.value
    }
  })
  if (resultsLayer.value) resultsLayer.value.showPopover()
  searchResults.value = data
}

function onNavigateToTown(id: string) {
  const formattedId = id.replace('id', '')
  searchResults.value = []
  if (resultsLayer.value) resultsLayer.value.hidePopover()
  navigateTo(`/forecast/${formattedId}`)
}
</script>

<template>
  <div class="grid relative">
    <input
      type="search"
      style="anchor-name: --search-input;"
      placeholder="Buscar municipio..."
      v-model="searchQuery"
      @input="onSearch" />
    <ul
      popover
      style="position-anchor: --search-input; top: anchor(--search-input bottom); left: anchor(--search-input left); right: anchor(--search-input left);"
      ref="resultsLayer"
      v-if="searchResults.length > 0"
      class="absolute shadow-2xl rounded bg-zinc-100 max-h-[66dvh] w-[min(100% - 2rem, 1024px)] dark:bg-zinc-800 dark:text-zinc-200">
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
