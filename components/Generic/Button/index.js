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
        className={`${className} ${size} ${dark && "dark"} ${
          shrink && "button-shrink-transition"
        } ${sizeClasses} rounded-md shadow-md font-medium cursor-pointer select-none bg-[#e76f51] text-white hover:bg-[#e24d28]`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "secondary")
    return (
      <a
        href={href}
        className={`${className} ${dark && "dark"} ${sizeClasses} ${
          shrink && "button-shrink-transition"
        } rounded-md shadow-md font-medium cursor-pointer select-none bg-[#e76f510e] border-[#e24d28] border-2 text-primaryTextLight hover:bg-[#e76f51] hover:text-white hover:border-[#e76f51]`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "text")
    return (
      <a
        href={href}
        className={`${
          dark && "dark"
        } ${className} ${sizeClasses} rounded-md bg-transparent hover:bg-[#e76f513b] hover:border-gray-400 transition duration-150 text-primaryTextLight cursor-pointer button-shrink-transition`}
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
