/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#05CBE7",
        white: "#FFFFFF",
        secondary: "#3623B7",
        border:"#E5E5E5",
        border2:"#F0F0F0",
        placeholder:"#ADB5BD",
        text:"#515151",
        graybg2:"#F4F8FB",
        accent: "#FFE66D",
        dark: "#292F36",
        light: "#F7FFF7",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        math: ['"STIX Two Math"', 'serif'],
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
         'spin': 'spin 1s steps(12) infinite',
      },
      keyframes: {
          spin: {
          '100%': { transform: 'rotate(1turn)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
};