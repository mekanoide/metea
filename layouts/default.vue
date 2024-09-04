<template>
  <div>
    <header class="mb-6 text-center">
      <div class="text-xl font-semibold">Metea</div>
    </header>
    <slot></slot>
    <footer class="p-4 text-center text-sm">Creado por <NuxtLink to="https://github.com/mekanoide" target="_blank">mekanoide</NuxtLink>, 2024. Información elaborada por la <NuxtLink to="https://aemet.es" target="_blank">Agencia Estatal de Meteorología</NuxtLink>.</footer>
  </div>
</template>