import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environmentMatchGlobs: [
      ['tests/server/**', 'nuxt'],
    ],
  },
})
