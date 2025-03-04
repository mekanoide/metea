<template>
  <div
    class="max-w-screen-md mx-auto min-h-[90dvh] grid grid-rows-[auto_1fr_auto] p-4"
  >
    <header class="mb-6 grid grid-cols-[6rem_1fr_6rem] items-center">
      <h1 class="col-start-2 justify-self-center">
        <NuxtLink
          class="text-xl font-semibold"
          to="/"
          aria-label="Ir a página de inicio"
          ><MeteaIcon size="32"
        /></NuxtLink>
      </h1>
      <ModeSwitcher class="justify-self-end" />
    </header>
    <main>
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>
