<template>
  <div class="min-h-[90dvh] grid grid-rows-[auto_1fr_auto]">
    <header class="mb-4 grid justify-center">
      <h1 class="flex mb-4 justify-center">
        <NuxtLink
          class="text-xl font-semibold"
          to="/"
          aria-label="Ir a página de inicio">
          <MeteaIcon size="48" />
        </NuxtLink>
      </h1>
      <h2 class="text-center mb-4 text-balance">
        Previsión meteorológica para España con datos de la AEMET
      </h2>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer class="p-4 text-center text-sm">
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
