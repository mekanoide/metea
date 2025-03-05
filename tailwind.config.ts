export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/'
  ],
  theme: {
    fontFamily: {
      sans: ['Inconsolata', 'sans-serif']
    },
    extend: {
      colors: {
        low: {
          light: 'oklch(0.828 0.14 136)',
          dark: 'oklch(0.769 0.14 136)'
        },
        moderate: {
          light: 'oklch(0.828 0.12 82)',
          dark: 'oklch(0.769 0.12 82)'
        },
        high: {
          light: 'oklch(0.828 0.16 44)',
          dark: 'oklch(0.769 0.16 44)'
        },
        veryhigh: {
          light: 'oklch(0.828 0.18 20)',
          dark: 'oklch(0.769 0.18 20)'
        },
        extreme: {
          light: 'oklch(0.828 0.16 316)',
          dark: 'oklch(0.769 0.16 316)'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: []
}
