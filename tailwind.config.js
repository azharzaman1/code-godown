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
        primary: "#E76F51",
        primaryDark: "#e24d28",
        primaryLight: "#ff8500",
        secondary: "#38bdf8",
        secondaryDark: "#38bdf8",
        secondaryLight: "#38bdf8",

        primaryText: "#e2e8f0",
        secondaryText: "#a0aec0",
        infoText: "#64748b",
        primaryTextLight: "#0f172a",
        secondaryTextLight: "#334155",
        infoTextLight: "#1f2937",

        divider: "rgba(255,255,255,0.12)",
        dividerDark: "rgba(0,0,0,0.12)",

        backgroundV1: "#252C48",
        backgroundV2: "#053c5e",
        backgroundContrast: "#394264",
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
