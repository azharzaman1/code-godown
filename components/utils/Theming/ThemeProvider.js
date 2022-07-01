import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeProvider = ({ children, theme }) => {
  const { theme: nextTheme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return children;
};

export default ThemeProvider;
