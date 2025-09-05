const AppColors = require("./src/utils/AppColors.js").default;
const AppFonts = require("./src/utils/AppFonts.js").default;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...AppColors,
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
        sans: [AppFonts.fontFamily], // Quicksand
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
      },
      fontSize: {
        xxs: ["10px", { lineHeight: "14px" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        md: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "26px" }],
        xl: ["20px", { lineHeight: "28px" }],
        h1: ["38px", { lineHeight: "46px", fontWeight: "700" }],
        h2: ["30px", { lineHeight: "38px", fontWeight: "700" }],
        h3: ["24px", { lineHeight: "32px", fontWeight: "700" }],
        h4: ["20px", { lineHeight: "28px", fontWeight: "700" }],
        h5: ["18px", { lineHeight: "26px", fontWeight: "700" }],
        h6: ["14px", { lineHeight: "20px", fontWeight: "700" }],
      },
    },
  },
  plugins: [],
};