<template>
  <div
    class="max-w-screen-md mx-auto min-h-[90dvh] grid grid-rows-[auto_1fr_auto] p-4"
  >
    <header>
      <div class="mb-3 grid grid-cols-[2rem_1fr_2rem] items-center">
        <h1 class="col-start-2 flex justify-center">
          <NuxtLink
            class="text-xl font-semibold"
            to="/"
            aria-label="Ir a página de inicio"
          >
            <MeteaIcon size="48" />
          </NuxtLink>
        </h1>
        <ModeSwitcher class="justify-self-end" />
      </div>
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
