import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        primaryOri: { //text-primaryOri
          DEFAULT: "#18181b",
        },
        secondaryOri:{
          DEFAULT: "#ffffff",
        },
        infostate:{
          DEFAULT: "#0dcaf0",
        },
        successstate:{
          DEFAULT: "#198754",
        },
        warningstate:{
          DEFAULT: "#ffc107",
        },
        errostate:{
          DEFAULT: "#dc3545"
        },
        greenOri: { // text-greenOri-500
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efaa",
          400: "#4ade7d",
          500: "#22c55a",
          600: "#16a341",
          700: "#158036",
          800: "#16652e",
          900: "#145327",
          950: "#052e12",
        },
        yellowOri: {
          50:  "#fefce8",
          100: "#fef9c3",
          200: "#fef48a",
          300: "#ffee47",
          400: "#fae715",
          500: "#ead708",
          600: "#cab804",
          700: "#a19307",
          800: "#857a0e",
          900: "#716812",
          950: "#423d06",
        },
        redOri:{
          50:  "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc3545",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        greyOri:{
          50:  "#f5f5f6",
          100: "#e6e6e7",
          200: "#cfcfd2",
          300: "#adadb3",
          400: "#84848c",
          500: "#71717a",
          600: "#5f5f6a",
          700: "#4e4e56",
          800: "#434349",
          900: "#30303c",
          950: "#27272a",
        },
      },
      fontFamily: { //font-thin, font-extralight, font-light, font-regular, font-semibold, font-medium, font-bold, font-black
        geist: ['Geist', 'sans-serif'],
      },
      fontSize: { //text-xs-ori
        'xs-ori': ['0.75rem', { lineHeight: '1.05rem' }], // 12px
        'sm-ori': ['0.875rem', { lineHeight: '1.225rem' }], // 14px
        'base-ori': ['1rem', { lineHeight: '1.4rem' }], // 16px
        'lg-ori': ['1.125rem ', { lineHeight: '1.575rem' }], // 18px
        'xl-ori': ['1.25rem ', { lineHeight: '1.375rem' }], // 20px
        '2xl-ori': ['1.5rem ', { lineHeight: '1.65rem' }], // 24px
        '3xl-ori': ['1.875rem  ', { lineHeight: '2.2rem' }], // 30px
        '4xl-ori': ['2.25rem  ', { lineHeight: '2.75rem' }], // 36px
        '5xl-ori': ['3rem  ', { lineHeight: '3.3rem' }], //  48px
        '6xl-ori': ['3.5rem', { lineHeight: '3.85rem' }], // 56px
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

export default config;