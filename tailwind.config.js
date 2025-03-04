/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue'
  ],
  theme: {
    fontFamily: {
      sans: ['Inconsolata', 'sans-serif']
    },
    extend: {}
  },
  darkMode: 'class',
  plugins: []
}
