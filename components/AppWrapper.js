import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_SYNTAX_THEME } from "../redux/slices/appSlice";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    // change syntax theme to github - light if color scheme is light
    if (resolvedTheme === "light") {
      dispatch(SET_SYNTAX_THEME("github"));
    }
  }, [resolvedTheme]);
  return children;
};

export default AppWrapper;
