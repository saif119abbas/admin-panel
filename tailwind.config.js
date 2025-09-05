const AppColors = require("./src/utils/AppColors.js").default;
const AppFonts = require("./src/utils/AppFonts.js").default;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...AppColors,
      },
      fontFamily: {
        sans: [AppFonts.fontFamily], // Quicksand
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
