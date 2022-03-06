import { useSelector } from "react-redux";
import { selectTheme } from "../../../redux/slices/appSlice";
import { XIcon } from "@heroicons/react/outline";

const ThemeButton = ({
  type = "primary",
  children,
  className,
  href,
  size,
  isDark,
  startIcon, // only for icon button
  afterIcon, // only for icon button
  shrinkTrans = true,

  active, // only for tab button
  tabCloseButton, // only for tab button
  closeButtonOnClick, // only for tab button
  ...rest
}) => {
  const theme = useSelector(selectTheme);

  if (type === "primary")
    return (
      <a
        href={href}
        className={`px-6 py-3 bg-primary hover:bg-opacity-90 text-white font-medium rounded shadow-md  cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
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
        className={`px-5 py-2.5 text-primaryText dark:text-primaryTextDark bg-primary bg-opacity-10 hover:bg-primary hover:text-white font-medium rounded shadow-md border-2 border-primary cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
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
        className={`px-6 py-3 text-primaryText bg-transparent dark:text-primaryTextDark hover:bg-primary hover:bg-opacity-10  hover:border-gray-400 rounded cursor-pointer transition duration-150 ${
          shrinkTrans && "active:scale-95"
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
        className={`flex items-center space-x-3 py-3 px-6 bg-primary text-white hover:bg-opacity-90 font-medium rounded shadow-md cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${className}`}
        {...rest}
      >
        {/* <span className="button-start-icon">{startIcon}</span> */}
        <span>{children}</span>
        <span className="button-end-icon">{afterIcon}</span>
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
