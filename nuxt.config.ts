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
            'Previsión metereológica para España basada en los datos de la Agencia Estatal de Meteorología.'
        },
        {
          name: 'keywords',
          content:
            'Previsión, meteorología, Tiempo, España, Lluvia, Nubosidad, Nieve, Viento, Clima, Humedad, Calor, Frío, Niebla, Calima'
        },
        {
          name: 'og:title',
          content: 'Metea | Previsión metereológica'
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:url',
          content: 'https://metea.es'
        },
        {
          name: 'og:description',
          content:
            'Previsión metereológica para España basada en los datos de la Agencia Estatal de Meteorología.'
        },
        {
          name: 'og:image',
          content: 'https://metea.es/og.jpg'
        },
        { name: 'author', content: 'mekanoide' },
        { name: 'google-adsense-account', content: process.env.ADSENSE_ID }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
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
    API_KEY: process.env.API_KEY,
    public: {
      ADSENSE_ID: process.env.ADSENSE_ID
    }
  },
  modules: ['nuxt-time', '@nuxt/icon', '@nuxtjs/i18n'],
  css: ['@/styles/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  i18n: {
    vueI18n: '@/i18n.config.ts'
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
