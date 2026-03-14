<template>
  <div class="max-w-3xl mx-auto min-h-dvh grid grid-rows-[auto_1fr_auto] p-4">
    <header class="space-y-2 mb-8">
      <h1 class="flex justify-center">
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
    </header>
    <main class="max-w-3xl">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>
