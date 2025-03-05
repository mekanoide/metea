// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  future: { compatibilityVersion: 4 },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Metea - Previsión metereológica para tu ciudad',
      meta: [
        {
          name: 'description',
          content:
            'Previsión metereológica para España basada en los datos actualizados de la Agencia Estatal de Meteorología.'
        },
        {
          name: 'og:title',
          content: 'Metea - Previsión metereológica para tu ciudad'
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
            'Previsión metereológica para España basada en los datos actualizados de la Agencia Estatal de Meteorología.'
        },
        {
          name: 'og:image',
          content: 'https://metea.es/og.jpg'
        },
        { name: 'author', content: 'mekanoide' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
      script: [
        {
          defer: true,
          'data-domain': process.env.PLAUSIBLE_DOMAIN,
          src: process.env.PLAUSIBLE_APIHOST
        }
      ]
    }
  },
  runtimeConfig: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY
  },
  modules: [
    'nuxt-time',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss'
  ],
  tailwindcss: {
    exposeConfig: true,
    cssPath: '@/assets/css/tailwind.css',
    viewer: true
  },
  i18n: {
    vueI18n: '@@/i18n.config.ts'
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
