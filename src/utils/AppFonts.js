// src/utils/AppFonts.js
const AppFonts = {
  // Font family
  fontFamily: "Quicksand, sans-serif",

  // Base styles creator
  createStyle: ({
    fontSize,
    fontWeight = 400,
    color = "#000000",
    letterSpacing,
    lineHeight,
    textDecoration = "none",
    fontFamily = "Quicksand, sans-serif",
  }) => ({
    fontFamily,
    fontSize: `${fontSize}px`,
    fontWeight,
    color,
    letterSpacing,
    lineHeight,
    textDecoration,
  }),

  // XL Styles (20px)
  xlLight: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 20,
      fontWeight: 300,
      ...options,
    }),
  xlRegular: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 20,
      fontWeight: 400,
      ...options,
    }),
  xlMedium: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 20,
      fontWeight: 500,
      ...options,
    }),
  xlSemiBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 20,
      fontWeight: 600,
      ...options,
    }),
  xlBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 20,
      fontWeight: 700,
      ...options,
    }),

  // LG Styles (18px)
  lgLight: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 18,
      fontWeight: 300,
      ...options,
    }),
  lgRegular: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 18,
      fontWeight: 400,
      ...options,
    }),
  lgMedium: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 18,
      fontWeight: 500,
      ...options,
    }),
  lgSemiBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 18,
      fontWeight: 600,
      ...options,
    }),
  lgBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 18,
      fontWeight: 700,
      ...options,
    }),

  // MD Styles (16px)
  mdLight: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 16,
      fontWeight: 300,
      ...options,
    }),
  mdRegular: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 16,
      fontWeight: 400,
      ...options,
    }),
  mdMedium: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 16,
      fontWeight: 500,
      ...options,
    }),
  mdSemiBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 16,
      fontWeight: 600,
      ...options,
    }),
  mdBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 16,
      fontWeight: 700,
      ...options,
    }),

  // SM Styles (14px)
  smLight: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 14,
      fontWeight: 300,
      ...options,
    }),
  smRegular: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 14,
      fontWeight: 400,
      ...options,
    }),
  smMedium: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 14,
      fontWeight: 500,
      ...options,
    }),
  smSemiBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 14,
      fontWeight: 600,
      ...options,
    }),
  smBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 14,
      fontWeight: 700,
      ...options,
    }),

  // XS Styles (12px)
  xsLight: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 12,
      fontWeight: 300,
      ...options,
    }),
  xsRegular: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 12,
      fontWeight: 400,
      ...options,
    }),
  xsMedium: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 12,
      fontWeight: 500,
      ...options,
    }),
  xsSemiBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 12,
      fontWeight: 600,
      ...options,
    }),
  xsBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 12,
      fontWeight: 700,
      ...options,
    }),

  // XXS Styles (10px)
  xxsLight: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 10,
      fontWeight: 300,
      ...options,
    }),
  xxsRegular: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 10,
      fontWeight: 400,
      ...options,
    }),
  xxsMedium: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 10,
      fontWeight: 500,
      ...options,
    }),
  xxsSemiBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 10,
      fontWeight: 600,
      ...options,
    }),
  xxsBold: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 10,
      fontWeight: 700,
      ...options,
    }),

  // Heading Styles
  h1: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 38,
      fontWeight: 700,
      ...options,
    }),
  h2: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 30,
      fontWeight: 700,
      ...options,
    }),
  h3: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 24,
      fontWeight: 700,
      ...options,
    }),
  h4: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 20,
      fontWeight: 700,
      ...options,
    }),
  h5: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 18,
      fontWeight: 700,
      ...options,
    }),
  h6: (options = {}) =>
    AppFonts.createStyle({
      fontSize: 14,
      fontWeight: 700,
      ...options,
    }),
};

export default AppFonts;
