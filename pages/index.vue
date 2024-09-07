<script setup lang="ts">
const { getVisitedTowns } = useVisitedTowns()

const visitedTowns = getVisitedTowns()
</script>

<template>
  <Search />
  <h2 class="text-center mt-6">Últimos vistos</h2>
  <div v-if="visitedTowns && visitedTowns.length > 0">
    <NuxtLink
      v-for="town in visitedTowns"
      :key="town.id"
      class="block py-6 border-t border-1 border-dashed border-neutral-300 dark:border-neutral-700 first:border-none hover:bg-neutral-200 dark:hover:bg-neutral-800"
      :to="`/forecast/${town.id}`">
      <span class="font-semibold">{{ town.name }}</span>, {{ town.province }}
    </NuxtLink>
  </div>
</template>
