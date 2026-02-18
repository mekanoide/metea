<template>
  <footer class="flex justify-between items-center py-2 text-center text-sm">
    <div>
      Creado por
      <NuxtLink
        class="underline underline-offset-4"
        to="https://github.com/mekanoide"
        target="_blank"
        >mekanoide</NuxtLink
      >, 2025. Información elaborada por la
      <NuxtLink
        class="underline underline-offset-4"
        to="https://www.aemet.es"
        target="_blank"
        >Agencia Estatal de Meteorología</NuxtLink
      >.
    </div>
    <!--     <div class="mt-6"></div> -->
    <ModeSwitcher class="justify-self-end" />
  </footer>
</template>
