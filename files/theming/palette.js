export const getPalette = (light) => {
  return {
    primaryMain: "#E76F51",
    primaryLight: "#d69b8c",
    primaryDark: "#E24D28",
    primaryColorContrast: light ? "#1f2937" : "#d1d5db",
    bgDefault: light ? "#f9f9f9" : "#1a202c",
    bgLight: light ? "#f9f9f9" : "#2D3748",
    primaryTextColor: light ? "#1f2937" : "#d1d5db",
    primaryTextColorContrast: light ? "#1f2937d3" : "#d1d5dbdc",
    dividerColor: light ? "rgba(100,100,100,0.15)" : "rgba(150,150,150,0.2)",
  };
};
