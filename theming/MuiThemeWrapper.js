import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { palette, paletteDark } from "./palette";

const MuiThemeWrapper = ({ children }) => {
  const { theme, resolvedTheme } = useTheme();
  const light = resolvedTheme === "light";

  const colorTheme = createTheme({
    palette: {
      type: resolvedTheme === "system" ? theme : resolvedTheme, // resolvedTheme is async
      //take some time, till 'theme' will be used

      primary: {
        main: light ? palette.primary : paletteDark.primary,
        dark: light ? palette.primaryDark : paletteDark.primaryDark,
        light: light ? palette.primaryLight : paletteDark.primaryLight,
        contrastText: light ? palette.primaryText : paletteDark.primaryText,
      },

      secondary: {
        main: light ? palette.secondary : paletteDark.secondary,
        dark: light ? palette.secondaryDark : paletteDark.secondaryDark,
        light: light ? palette.secondaryLight : paletteDark.secondaryLight,
        contrastText: light ? palette.secondaryText : paletteDark.secondaryText,
      },

      background: {
        default: light
          ? palette.backgroundColor1
          : paletteDark.backgroundColor1,
        paper: light ? palette.backgroundColor2 : paletteDark.backgroundColor2,
      },

      text: {
        primary: light ? palette.primaryText : paletteDark.primaryText,
        secondary: light ? palette.secondaryText : paletteDark.secondaryText,
        disabled: light ? palette.secondaryText : paletteDark.secondaryText,
      },
      divider: light ? palette.dividerColor : paletteDark.dividerColor,
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      button: {
        fontWeight: 600,
      },
      fontFamily:
        '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.57,
      },
      subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.75,
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.57,
      },
      overline: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.5px",
        lineHeight: 2.5,
        textTransform: "uppercase",
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.66,
      },
      h1: {
        fontWeight: 700,
        fontSize: "3.5rem",
        lineHeight: 1.375,
      },
      h2: {
        fontWeight: 700,
        fontSize: "3rem",
        lineHeight: 1.375,
      },
      h3: {
        fontWeight: 700,
        fontSize: "2.25rem",
        lineHeight: 1.375,
      },
      h4: {
        fontWeight: 700,
        fontSize: "2rem",
        lineHeight: 1.375,
      },
      h5: {
        fontWeight: 600,
        fontSize: "1.5rem",
        lineHeight: 1.375,
      },
      h6: {
        fontWeight: 600,
        fontSize: "1.125rem",
        lineHeight: 1.375,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        xl2: 1536,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
          },
          sizeSmall: {
            padding: "6px 16px",
          },
          sizeMedium: {
            padding: "8px 20px",
          },
          sizeLarge: {
            padding: "11px 24px",
          },
          textSizeSmall: {
            padding: "7px 12px",
          },
          textSizeMedium: {
            padding: "9px 16px",
          },
          textSizeLarge: {
            padding: "12px 16px",
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "32px 24px",
            "&:last-child": {
              paddingBottom: "32px",
            },
          },
        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: {
            variant: "h6",
          },
          subheaderTypographyProps: {
            variant: "body2",
          },
        },
        styleOverrides: {
          root: {
            padding: "32px 24px",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          "*": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
          },
          html: {
            MozOsxFontSmoothing: "grayscale",
            WebkitFontSmoothing: "antialiased",
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            width: "100%",
          },
          body: {
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            minHeight: "100%",
            width: "100%",
          },
          "#__next": {
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "#E6E8F0",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: "#F3F4F6",
            ".MuiTableCell-root": {
              color: "#374151",
            },
            borderBottom: "none",
            "& .MuiTableCell-root": {
              borderBottom: "none",
              fontSize: "12px",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: 0.5,
              textTransform: "uppercase",
            },
            "& .MuiTableCell-paddingCheckbox": {
              paddingTop: 4,
              paddingBottom: 4,
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#fff",
            color: "#333333",
            fontSize: 12,
            boxShadow: "0px 0 15px 0px rgba(255,255,255,0.8)",
          },
        },
        popperArrow: {
          fill: "#fff",
        },
      },
    },
    shadows: [
      "none",
      "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
      "0px 1px 2px rgba(100, 116, 139, 0.12)",
      "0px 1px 4px rgba(100, 116, 139, 0.12)",
      "0px 1px 5px rgba(100, 116, 139, 0.12)",
      "0px 1px 6px rgba(100, 116, 139, 0.12)",
      "0px 2px 6px rgba(100, 116, 139, 0.12)",
      "0px 3px 6px rgba(100, 116, 139, 0.12)",
      "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
      "0px 5px 12px rgba(100, 116, 139, 0.12)",
      "0px 5px 14px rgba(100, 116, 139, 0.12)",
      "0px 5px 15px rgba(100, 116, 139, 0.12)",
      "0px 6px 15px rgba(100, 116, 139, 0.12)",
      "0px 7px 15px rgba(100, 116, 139, 0.12)",
      "0px 8px 15px rgba(100, 116, 139, 0.12)",
      "0px 9px 15px rgba(100, 116, 139, 0.12)",
      "0px 10px 15px rgba(100, 116, 139, 0.12)",
      "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
      "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
      "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
      "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
      "0px 25px 50px rgba(100, 116, 139, 0.25)",
    ],
  });
  return (
    <>
      <ThemeProvider theme={colorTheme}>{children}</ThemeProvider>
    </>
  );
};

export default MuiThemeWrapper;
