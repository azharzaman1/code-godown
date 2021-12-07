import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/slices/appSlice";

const ThemeHeading = ({ type = "secondary", className, children, ...rest }) => {
  const theme = useSelector(selectTheme);
  const dark = theme === "dark";

  if (type === "primary")
    return (
      <h2
        className={`primary-heading ${dark && "dark"} ${className}`}
        {...rest}
      >
        {children}
      </h2>
    );
};

export default ThemeHeading;
