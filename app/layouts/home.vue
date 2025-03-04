<template>
  <div class="min-h-[90dvh] grid grid-rows-[auto_1fr_auto] p-4">
    <header class="mb-6 grid justify-center">
      <h1 class="flex mb-4 justify-center">
        <NuxtLink
          class="text-xl font-semibold"
          to="/"
          aria-label="Ir a página de inicio"
        >
          <MeteaIcon size="48" />
        </NuxtLink>
      </h1>
      <h2 class="text-center mb-4 text-balance">
        Previsión meteorológica para España con datos de la AEMET
      </h2>
      <ModeSwitcher />
    </header>
    <main class="max-w-3xl">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>
