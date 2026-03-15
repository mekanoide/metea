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
  try {
    const data = await $fetch('/api/search/town', {
      params: {
        search: searchQuery.value
      }
    })
    searchResults.value = data
  } catch {
    searchResults.value = []
  }
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
  <div class="grid relative pb-6" ref="searchElement">
    <div class="relative">
      <Icon
        name="mdi:magnify"
        aria-hidden="true"
        size="24"
        class="absolute top-4 left-2 text-secondary"
      />
      <input
        type="search"
        placeholder="Buscar municipio..."
        v-model="searchQuery"
        class="pl-10! text-lg"
        @keyup.enter="onNavigateToSelectedTown()"
        @keyup.down="onSelectNextTown()"
        @keyup.up="onSelectPreviousTown()"
        @keyup.escape="reset()"
      />
    </div>
    <ul
      v-if="searchResults.length > 0"
      class="absolute z-50 top-14 left-0 right-0 shadow-2xl max-h-[66dvh] overflow-y-auto bg-shaded backdrop-blur-2xl"
    >
      <li
        v-for="(town, index) in searchResults"
        class="block border-t border-dashed border-highlighted first:border-0 cursor-pointer p-4 hover:bg-highlighted transition-all duration-200"
        :class="{
          'bg-highlighted': selectedIndex === index
        }"
        role="button"
        @click.prevent="onNavigateToTown(town.id)"
      >
        <span class="font-semibold">{{ town.nombre }}</span
        >,
        <span class="text-secondary">{{ town.province }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  box-shadow: 0 0.5rem 0 hsl(0 0 0 / 0.2);
}
</style>
