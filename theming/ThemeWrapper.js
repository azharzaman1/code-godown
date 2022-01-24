import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "../redux/slices/appSlice";
import { getPalette } from "./palette";

const ThemeWrapper = ({ children }) => {
  const themePreference = useSelector(selectTheme);
  const light = themePreference === "light";
  const muiPalette = getPalette(light);

  const colorTheme = createTheme({
    palette: {
      type: themePreference,

      primary: {
        main: muiPalette.primary,
        dark: muiPalette.primaryDark,
        light: muiPalette.primaryLight,
        contrastText: muiPalette.primaryText,
      },

      secondary: {
        main: muiPalette.secondary,
      },

      background: {
        default: muiPalette.background,
        paper: muiPalette.backgroundLight,
      },

      text: {
        primary: muiPalette.primaryText,
        secondary: muiPalette.secondaryText,
      },
      divider: muiPalette.dividerColor,
    },
    shape: {
      borderRadius: "3px",
    },
    components: {
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: muiPalette.primaryText,
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "medium",
            color: muiPalette.primaryText,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          outlined: {
            border: `2px solid ${muiPalette.primaryText}`,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            paddingTop: "10px",
            paddingBottom: "10px",
          },
        },
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={colorTheme}>{children}</ThemeProvider>
    </>
  );
};

export default ThemeWrapper;
