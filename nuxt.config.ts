// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
