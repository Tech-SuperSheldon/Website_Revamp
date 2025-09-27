/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
  //     keyframes: {
  //   float1: {
  //     "0%, 100%": { transform: "translate(0,0)" },
  //     "50%": { transform: "translate(-10px,12px) scale(1.08)" },
  //   },
  //   float2: {
  //     "0%, 100%": { transform: "translate(0,0)" },
  //     "50%": { transform: "translate(14px,-10px) scale(1.05)" },
  //   },
  //   float3: {
  //     "0%, 100%": { transform: "translate(0,0)" },
  //     "50%": { transform: "translate(-8px,10px) scale(1.07)" },
  //   },
  // },
  // animation: {
  //   float1: "float1 4s ease-in-out infinite",
  //   float2: "float2 5s ease-in-out infinite",
  //   float3: "float3 6s ease-in-out infinite",
  // },
      colors: {
        // Add any custom colors here
      },
       fontFamily: {
        sans: ["var(--font-quicksand)", "sans-serif"], // ✅ Quicksand global
      },
      animation: {
        'float-1': 'float-1 4s ease-in-out infinite',
        'float-2': 'float-2 5s ease-in-out infinite',
        'float-3': 'float-3 6s ease-in-out infinite',
      },
      keyframes: {
        'float-1': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-5px, -10px)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(5px, -8px)' },
        },
        'float-3': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-3px, -12px)' },
        },
      },
    },
  },
  plugins: [],
};