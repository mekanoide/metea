// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Metea | Previsión metereológica',
      meta: [
        {
          name: 'description',
          content:
            'Previsión metereológica para España basada en la API de la Agencia Estatal de Meteorología.'
        },
        {
          name: 'keywords'
        },
        { name: 'author', content: 'mekanoide' },
        { name: 'google-adsense-account', content: process.env.ADSENSE_ID },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          async: true,
          src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_ID}`,
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  runtimeConfig: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY
  },
  modules: ['nuxt-time', '@nuxt/icon'],
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