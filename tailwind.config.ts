/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        hind: ['Hind Siliguri', 'sans-serif'],
      },
      colors: {
        primary: '#1c2541',
        background: '#ebf5f5',
        foreground: '#598588',
      },
    },
  },
  prefix: 'tw-',
  important: true,
  corePlugins: {
    preflight: false,
  },
}
