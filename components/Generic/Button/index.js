import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/slices/appSlice";
import { XIcon } from "@heroicons/react/outline";

const ThemeButton = ({
  type = "primary",
  children,
  className,
  href,
  size = "sm",
  fluid,
  isDark,
  startIcon, // only for icon button
  endIcon, // only for icon button
  shrinkTrans = true,

  active, // only for tab button
  tabCloseButton, // only for tab button
  closeButtonOnClick, // only for tab button
  ...rest
}) => {
  const sm = size === "sm";

  if (type === "primary")
    return (
      <a
        href={href}
        className={`bg-primary hover:bg-opacity-90 text-white font-medium rounded shadow-md cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "px-4 py-2" : "px-6 py-3"} ${
          fluid && "min-w-full text-center"
        } ${className}`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "secondary")
    return (
      <a
        href={href}
        className={`text-primaryText dark:text-primaryTextDark bg-primary bg-opacity-10 hover:bg-primary hover:text-white font-medium rounded shadow-md border-2 border-primary cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "px-3.5 py-1.5" : "px-5 py-2.5"} ${
          fluid && "min-w-full text-center"
        } ${className}`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "text")
    return (
      <a
        href={href}
        className={`text-primaryText bg-transparent dark:text-primaryTextDark hover:bg-primary hover:bg-opacity-10  hover:border-gray-400 rounded cursor-pointer transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "py-2 px-3" : "px-5 py-2.5"} ${
          fluid && "min-w-full text-center"
        } ${className}`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "icon")
    return (
      <a
        href={href}
        className={`flex items-center bg-primary text-white hover:bg-opacity-90 font-medium rounded shadow-md cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "py-2 px-3 space-x-2" : "px-5 py-2.5 space-x-3"} ${className}`}
        {...rest}
      >
        <span className="button-start-icon">{startIcon}</span>
        <span>{children}</span>
        <span className="button-end-icon">{endIcon}</span>
      </a>
    );

  if (type === "special-icon")
    return (
      <a
        href={href}
        className={`px-12 flex items-center justify-center rounded-md shadow font-medium py-3 border hover:bg-gray-50 cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${className}`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "text-icon")
    return (
      <a
        href={href}
        className={`flex items-center space-x-3 text-primaryText dark:text-primaryTextDark bg-transparent hover:bg-primary hover:bg-opacity-10 font-medium rounded shadow-md cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "py-2 px-3 space-x-2" : "px-5 py-2.5 space-x-3"} ${className}`}
        {...rest}
      >
        <span className="button-start-icon">{startIcon}</span>
        <span>{children}</span>
        <span className="button-end-icon">{endIcon}</span>
      </a>
    );

  if (type === "tab")
    return (
      <div
        className={`px-4 py-2 flex items-center space-x-4 text-gray-200 bg-white bg-opacity-10 hover:bg-opacity-20 border-r border-white border-opacity-40 cursor-pointer ${
          active &&
          "bg-transparent text-primary transition duration-100 pl-4 pr-3"
        } ${className}`}
        {...rest}
      >
        <span>{children}</span>
        {tabCloseButton && (
          <span onClick={closeButtonOnClick}>
            <XIcon className={`h-5 text-gray-700 dark:text-gray-400`} />
          </span>
        )}
      </div>
    );
};

export default ThemeButton;
