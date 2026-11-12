import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          blue: '#60A5FA',
          orange: '#FB923C',
          yellow: '#FBBF24',
          green: '#34D399',
        }
      },
    },
  },
  plugins: [],
}
export default config
