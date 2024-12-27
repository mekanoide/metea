<template>
  <div class="min-h-[90dvh] grid grid-rows-[auto_1fr_auto] p-4">
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
    <Footer />
  </div>
</template>
