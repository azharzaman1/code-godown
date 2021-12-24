import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/slices/appSlice";

const ThemeHeading = ({ type, className, children, ...rest }) => {
  const theme = useSelector(selectTheme);
  const dark = theme === "dark";

  if (type === "primary" || !type)
    return (
      <h2
        className={`primary-heading ${dark && "dark"} ${className}`}
        {...rest}
      >
        {children}
      </h2>
    );

  if (type === "secondary")
    return (
      <h2
        className={`secondary-heading ${dark && "dark"} ${className}`}
        {...rest}
      >
        {children}
      </h2>
    );

  if (type === "tertiary")
    return (
      <h2
        className={`tertiary-heading ${dark && "dark"} ${className}`}
        {...rest}
      >
        {children}
      </h2>
    );
};

export default ThemeHeading;
