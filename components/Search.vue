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
      type="text"
      class="border-2 border-zinc-900 w-full p-2 rounded"
      style="anchor-name: --search-input;"
      placeholder="Buscar municipio..."
      v-model="searchQuery"
      @input="onSearch" />
    <ul
      popover
      style="position-anchor: --search-input; top: anchor(--search-input bottom); left: anchor(--search-input left); right: anchor(--search-input left);"
      ref="resultsLayer"
      v-if="searchResults.length > 0"
      class="absolute bg-white max-h-[66dvh] w-[min(100% - 2rem, 1024px)]">
      <li
        v-for="town in searchResults"
        class="block border-t border-1 border-zinc-200 cursor-pointer p-4"
        role="button"
        @click.prevent="onNavigateToTown(town.id)">
        {{ town.nombre }}
      </li>
    </ul>
  </div>
</template>
