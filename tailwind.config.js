const { palette, paletteDark } = require("./theming/palette");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./theming/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: palette.primary,
        primaryDark: palette.primaryDark,
        primaryLight: palette.primaryLight,
        secondary: palette.secondary,
        secondaryDark: palette.secondaryDark,
        secondaryLight: palette.secondaryLight,

        primaryText: palette.primaryText,
        secondaryText: palette.secondaryText,
        infoText: palette.secondaryText,

        primaryTextDark: paletteDark.primaryText,
        secondaryDark: paletteDark.secondaryText,
        infoTextDark: paletteDark.secondaryText,

        dividerColor: palette.dividerColor,
        dividerDark: paletteDark.dividerColor,

        borderColor: palette.borderColor,
        borderColorDark: paletteDark.borderColor,

        backgroundV1: palette.backgroundColor1,
        backgroundV2: palette.backgroundColor2,
        backgroundContrast: palette.backgroundContrastColor,

        backgroundV1Dark: paletteDark.backgroundColor1,
        backgroundV2Dark: paletteDark.backgroundColor2,
        backgroundContrastDark: paletteDark.backgroundContrastColor,
      },
      fontSize: {
        xs: "11px",
        sm: "13px",
        base: "15px",
        lg: "1.125rem",
        xl: "1.25rem",
      },
    },
    fontFamily: {
      sans: ["Inter", "Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
