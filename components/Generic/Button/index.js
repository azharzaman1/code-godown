import { XIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/slices/appSlice";

const ThemeButton = ({
  children,
  className,
  href,
  type = "primary",
  size,
  isDark,
  text,
  icon,
  afterIcon,
  shrink = true,

  label, // only for tab button
  active, // only for tab button
  tabCloseButton, // only for tab button
  closeButtonOnClick, // only for tab button
  ...rest
}) => {
  const theme = useSelector(selectTheme);
  const dark = isDark ? isDark : theme === "dark";
  const sizeClasses =
    !size || size === "medium"
      ? "px-8 py-3.5"
      : size === "small"
      ? "px-5 py-2.5"
      : "px-10 py-4";

  if (type === "primary")
    return (
      <a
        href={href}
        className={`${className} ${size} ${
          dark && "dark"
        } ${sizeClasses} rounded-md shadow-md font-medium cursor-pointer select-none bg-primary text-white hover:bg-primaryDark transition-colors duration-150`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "secondary")
    return (
      <a
        href={href}
        className={`${className} ${
          dark && "dark"
        } ${sizeClasses} rounded-md shadow-md font-medium cursor-pointer select-none bg-[#e76f510e] border-primaryDark border-2 text-primaryTextLight hover:bg-primary hover:text-white hover:border-primary transition-colors duration-150`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "text")
    return (
      <a
        href={href}
        className={`text-button ${
          dark && "dark"
        } ${className} ${sizeClasses} rounded-md bg-transparent hover:bg-[#e76f513b] hover:border-gray-400 text-primaryTextLight cursor-pointer button-shrink-transition transition-colors duration-150`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "icon")
    return (
      <a
        href={href}
        className={`${className} ${
          dark && "dark"
        } ${sizeClasses} flex-between-center px-5 py-3 space-x-2 bg-primary text-white hover:bg-primaryDark rounded-md shadow-md font-medium cursor-pointer select-none transition-colors duration-150`}
        {...rest}
      >
        <span>{icon}</span>
        <span>{text}</span>
        <span>{afterIcon}</span>
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
};

export default ThemeButton;
