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
        secondary: "#38bdf8",
        primaryText: "#e2e8f0",
        secondaryText: "#a0aec0",
        infoText: "#64748b",
        primaryTextLight: "#0f172a",
        secondaryTextLight: "#334155",
        infoTextLight: "#1f2937",
      },
    },
    fontFamily: {
      sans: ["Inter", "Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
