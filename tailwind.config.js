/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
      },
      colors: {
        '--theme-primary': '#F1C84B',
        '--theme-secondary': '#FFFFFF',
        '--theme-accent': '#D7705B',
        '--theme-background': '#FDF3DD',
        '--theme-font-color': '#1B0902',
      },
    },
  },
  plugins: [nextui()],
}
// accent 2  #b724a6 //

