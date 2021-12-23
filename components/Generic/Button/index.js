import { XIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/slices/appSlice";

const ThemeButton = ({
  children,
  className,
  href,
  type = "primary",
  size = "medium",

  label, // only for tab button
  active, // only for tab button
  tabCloseButton, // only for tab button
  closeButtonOnClick, // only for tab button
  ...rest
}) => {
  const theme = useSelector(selectTheme);
  const dark = theme === "dark";

  if (type === "primary")
    return (
      <a
        href={href}
        className={`primary-button ${dark && "dark"} ${size} ${className}`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "secondary")
    return (
      <a
        href={href}
        className={`secondary-button ${dark && "dark"} ${className}`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "text")
    return (
      <a
        href={href}
        className={`text-button ${dark && "dark"} ${className}`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "icon")
    return (
      <a
        href={href}
        className={`icon-button ${dark && "dark"} ${className}`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "icon-text")
    return (
      <a
        href={href}
        className={`icon-text-button ${dark && "dark"} ${className}`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "tab")
    return (
      <div
        className={`tab-button ${active && "active"} ${
          dark && "dark"
        } ${className}`}
        {...rest}
      >
        <span>{label}</span>
        {tabCloseButton && (
          <span onClick={closeButtonOnClick}>
            <XIcon
              className={`h-5 ${dark ? "text-white-400" : "text-gray-700"}`}
            />
          </span>
        )}
      </div>
    );

  return (
    <button
      className={`primary-button ${dark && "dark"} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ThemeButton;
