<template>
  <div class="min-h-[90dvh] grid grid-rows-[auto_1fr_auto]">
    <header class="mb-6 flex justify-center">
      <Banner />
      <h1>
        <NuxtLink
          class="text-xl font-semibold"
          to="/"
          aria-label="Ir a página de inicio"
          ><MeteaIcon size="32"
        /></NuxtLink>
      </h1>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer class="py-4 text-center text-sm">
      Creado por
      <NuxtLink
        class="underline underline-offset-4"
        to="https://github.com/mekanoide"
        target="_blank"
        >mekanoide</NuxtLink
      >, 2024. Información elaborada por la
      <NuxtLink
        class="underline underline-offset-4"
        to="https://www.aemet.es"
        target="_blank"
        >Agencia Estatal de Meteorología</NuxtLink
      >.
    </footer>
  </div>
</template>
