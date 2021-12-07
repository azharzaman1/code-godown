import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/appSlice";

const ThemeWrapper = ({ children }) => {
  const themePreference = useSelector(selectTheme);

  const muiPalette = {
    primaryMain: "#E76F51",
    primaryLight: "#d69b8c",
    primaryDark: "#E24D28",
    primaryColorContrast:
      themePreference === "light"
        ? "rgba(0,0,0,0.65)"
        : "rgba(255, 255, 255, 0.80)",

    bgDefault: themePreference === "light" ? "#f9f9f9" : "#1a202c",
    bgLight: themePreference === "light" ? "#f9f9f9" : "#2D3748",

    dividerColor:
      themePreference === "light"
        ? "rgba(100,100,100,0.10)"
        : "rgba(150,150,150,0.125)",
  };

  const colorTheme = createTheme({
    palette: {
      type: themePreference,

      primary: {
        dark: muiPalette.primaryDark,
        main: muiPalette.primaryMain,
        light: muiPalette.primaryLight,
        contrastText: muiPalette.primaryColorContrast,
      },
      background: {
        default: muiPalette.bgDefault,
        paper: muiPalette.bgLight,
      },
      divider: muiPalette.dividerColor,
    },
    shape: {
      borderRadius: "3px",
    },
  });
  return (
    <>
      <ThemeProvider theme={colorTheme}>{children}</ThemeProvider>
    </>
  );
};

export default ThemeWrapper;
