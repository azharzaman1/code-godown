import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { getPalette } from "./palette";
import { useTheme } from "next-themes";

const ThemeWrapper = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const light = theme === "light";
  const muiPalette = getPalette(light);

  const colorTheme = createTheme({
    palette: {
      type: theme,

      primary: {
        main: muiPalette.primary,
        dark: muiPalette.primaryDark,
        light: muiPalette.primaryLight,
        contrastText: muiPalette.primaryText,
      },

      secondary: {
        main: muiPalette.secondary,
        light: muiPalette.secondaryLight,
        dark: muiPalette.secondaryDark,
        contrastText: muiPalette.primaryText,
      },

      background: {
        default: muiPalette.background,
        paper: muiPalette.backgroundLight,
      },

      text: {
        primary: muiPalette.primaryText,
        secondary: muiPalette.secondaryText,
        disabled: muiPalette.infoText,
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
