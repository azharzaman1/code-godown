export const getPalette = (light) => {
  return {
    primary: "#E76F51",
    primaryLight: "rgb(235, 139, 115)",
    primaryDark: "rgb(161, 77, 56)",
    secondary: "#38bdf8",
    secondaryLight: "rgb(95, 202, 249)",
    secondaryDark: "rgb(39, 132, 173)",

    primaryText: light ? "#1e293b" : "#e2e8f0",
    secondaryText: light ? "#334155" : "#a0aec0",
    infoText: light ? "#475569" : "#94a3b8",

    background: light ? "#f9f9f9" : "#252C48",
    backgroundLight: light ? "#f9f9f9" : "#394264",

    dividerColor: light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
  };
};

// export const getPalette = (light) => {
//   return {
//     primary: "#E76F51",
//     primaryLight: "rgb(255, 138, 51)",
//     primaryDark: "rgb(178, 76, 0)",
//     secondary: "#16a34a",
//     secondaryLight: "rgb(68, 181, 110)",
//     secondaryDark: "rgb(15, 114, 51)",

// primaryText: light ? "#1e293b" : "#e2e8f0",
// secondaryText: light ? "#334155" : "#a0aec0",
// infoText: light ? "#475569" : "#94a3b8",

//     background: light ? "#eee" : "#0f172a",
//     backgroundLight: light ? "#ffffff" : "#1e293b",

//     dividerColor: light ? "rgba(100,100,100,0.12)" : "rgba(255,255,255,0.12)",
//   };
// };
