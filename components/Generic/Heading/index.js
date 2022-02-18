import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/slices/appSlice";

const ThemeHeading = ({ type, className, children, ...rest }) => {
  const theme = useSelector(selectTheme);
  const dark = theme === "dark";

  if (type === "primary" || !type)
    return (
      <h1
        className={`primary-heading ${className} text-4xl tracking-tight font-extrabold text-primaryTextLight dark:text-primaryText sm:text-5xl md:text-6xl`}
        {...rest}
      >
        {children}
      </h1>
    );

  if (type === "secondary")
    return (
      <h2
        className={`secondary-heading ${className} ${
          dark && "dark"
        } text-xl tracking-tight font-bold text-primaryTextLight dark:text-primaryText sm:text-2xl md:text-4xl`}
        {...rest}
      >
        {children}
      </h2>
    );

  if (type === "tertiary")
    return (
      <h2
        className={`tertiary-heading ${className} ${
          dark && "dark"
        } text-lg font-medium text-primaryTextLight dark:text-primaryText sm:text-lg md:text-xl`}
        {...rest}
      >
        {children}
      </h2>
    );
};

export default ThemeHeading;
