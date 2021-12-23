import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { selectTheme } from "../../redux/slices/appSlice";
import { getPalette } from "./palette";

const ThemeWrapper = ({ children }) => {
  const themePreference = useSelector(selectTheme);
  const light = themePreference === "light";
  const muiPalette = getPalette(light);

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
      text: {
        primary: muiPalette.primaryTextColor,
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
            color: muiPalette.primaryTextColorContrast,
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "medium",
            color: muiPalette.primaryTextColorContrast,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          outlined: {
            border: `2px solid ${muiPalette.primaryTextColor}`,
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
