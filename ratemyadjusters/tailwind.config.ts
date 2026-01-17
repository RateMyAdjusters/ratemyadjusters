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
        // Navy Blue - Trust, Authority, Calm (Primary ~20%)
        navy: {
          50: '#E8EEF4',
          100: '#C5D4E3',
          200: '#9FB8D0',
          300: '#7A9CBD',
          400: '#5E86AD',
          500: '#0A3D62',
          600: '#093558',
          700: '#072C49',
          800: '#05223A',
          900: '#03172B',
        },
        // Off-White - Clean, Open, Unbiased (Background ~60%)
        offwhite: '#F8F9FA',
        // Soft Green - Healing, Progress, Success (~10% accent)
        success: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        // Muted Teal - Calming alternative green
        teal: {
          500: '#20A39E',
          600: '#1C8F8A',
        },
        // Warm Orange - Openness, Vulnerability, CTAs (~5% accent)
        warm: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB366',
          400: '#FFA726',
          500: '#FF9800',
          600: '#F57C00',
          700: '#EF6C00',
        },
        // Deep Red - Alerts only (<3%)
        alert: {
          500: '#D32F2F',
          600: '#C62828',
        },
        // Neutral Grays - Text & Support
        charcoal: '#333333',
        slate: '#666666',
        lightgray: '#EEEEEE',
        // Keep primary for backwards compatibility
        primary: {
          50: '#E8EEF4',
          100: '#C5D4E3',
          200: '#9FB8D0',
          300: '#7A9CBD',
          400: '#5E86AD',
          500: '#0A3D62',
          600: '#093558',
          700: '#072C49',
          800: '#05223A',
          900: '#03172B',
        },
      },
    },
  },
  plugins: [],
}
export default config
