export const getPalette = (light) => {
  return {
    primary: "#E76F51",
    primaryLight: "#d69b8c",
    primaryDark: "#E24D28",
    secondary: "#38bdf8",

    primaryText: light ? "#0f172a" : "#e2e8f0",
    secondaryText: light ? "#334155" : "#a0aec0",
    infoText: light ? "#1f2937" : "#64748b",

    background: light ? "#f9f9f9" : "#252C48",
    backgroundLight: light ? "#f9f9f9" : "#394264",

    dividerColor: light ? "rgba(100,100,100,0.15)" : "rgba(150,150,150,0.2)",
  };
};
