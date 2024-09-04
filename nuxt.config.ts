// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Metea | Previsión metereológica',
      meta: [{ name: 'description', content: 'Previsión metereológica para España basada en la API de la Agencia Estatal de Meteorología.' }],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  runtimeConfig: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY
  },
  modules: ['nuxt-time'],
  css: ['@/styles/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
