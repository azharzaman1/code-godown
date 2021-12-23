import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/slices/appSlice";

const ThemeText = ({
  type = "primary",
  component = "p",
  children,
  className,
  ...rest
}) => {
  const Tag = component;
  const themePreference = useSelector(selectTheme);
  const dark = themePreference === "dark";

  if (type === "primary")
    return (
      <Tag className={`text ${dark && "dark"} ${className}`} {...rest}>
        {children}
      </Tag>
    );
};

export default ThemeText;
