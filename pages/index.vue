<script setup lang="ts">
definePageMeta({
  layout: 'home'
})
const { getVisitedTowns } = useVisitedTowns()

const visitedTowns = getVisitedTowns()

useHead({
  title: 'Metea | Previsión meteorológica para España'
})
</script>

<template>
  <Search />
  <div v-if="visitedTowns && visitedTowns.length > 0">
    <h2 class="text-center mt-6">{{ $t('lastSeen') }}</h2>
    <NuxtLink
      v-for="town in visitedTowns"
      :key="town.id"
      class="block px-4 py-6 border-t border-1 border-dashed border-neutral-300 dark:border-neutral-700 first-of-type:border-none hover:bg-neutral-200 dark:hover:bg-neutral-800"
      :to="`/forecast/${town.id}`">
      <span class="font-semibold">{{ town.name }}</span
      >, <span class="text-neutral-600 dark:text-neutral-400">{{ town.province }}</span>
    </NuxtLink>
  </div>
</template>
