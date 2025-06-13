<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const searchQuery = ref('')
const searchResults = ref<any>([])
const searchElement = ref<HTMLElement | null>(null)
const selectedIndex = ref(0)

async function onSearch() {
  if (!searchQuery.value) {
    searchResults.value = []
    return
  }
  const data = await $fetch('/api/search/town', {
    params: {
      search: searchQuery.value
    }
  })
  searchResults.value = data
}

function reset() {
  searchResults.value = []
  selectedIndex.value = 0
}

function onNavigateToTown(id: string) {
  const formattedId = id.replace('id', '')
  reset()
  navigateTo(`/forecast/${formattedId}`)
}

function onNavigateToSelectedTown() {
  if (searchResults.value.length > 0) {
    onNavigateToTown(searchResults.value[selectedIndex.value].id)
  }
}

function onSelectNextTown() {
  if (
    searchResults.value.length > 0 &&
    selectedIndex.value < searchResults.value.length - 1
  ) {
    selectedIndex.value++
  }
}

function onSelectPreviousTown() {
  if (searchResults.value.length > 0 && selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

onClickOutside(searchElement, () => {
  reset()
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
  <div
    class="grid relative"
    ref="searchElement">
    <input
      type="search"
      placeholder="Buscar municipio..."
      v-model="searchQuery"
      @keyup.enter="onNavigateToSelectedTown()"
      @keyup.down="onSelectNextTown()"
      @keyup.up="onSelectPreviousTown()"
      @keyup.escape="reset()" />
    <ul
      v-if="searchResults.length > 0"
      class="absolute z-50 top-16 left-0 right-0 shadow-2xl bg-neutral-100 max-h-[66dvh] overflow-y-auto dark:bg-neutral-800 dark:text-neutral-200">
      <li
        v-for="(town, index) in searchResults"
        class="block border-t border-1 border-dashed border-neutral-300 first:border-0 cursor-pointer p-4 hover:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:hover:text-neutral-50"
        :class="{
          'bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-50':
            selectedIndex === index
        }"
        role="button"
        @click.prevent="onNavigateToTown(town.id)">
        <span class="font-semibold">{{ town.nombre }}</span
        >,
        <span class="text-neutral-600 dark:text-neutral-400">{{
          town.province
        }}</span>
      </li>
    </ul>
  </div>
</template>
