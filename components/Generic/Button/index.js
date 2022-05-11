import { XIcon } from "@heroicons/react/outline";
import Loader from "../Loader";

const Button = ({
  type = "primary",
  children,
  className,
  href,
  size = "small",
  startIcon, // only for icon button
  endIcon, // only for icon button
  shrinkTrans = true,
  loading,

  active, // only for tab button
  tabCloseButton, // only for tab button
  closeButtonOnClick, // only for tab button
  ...rest
}) => {
  const sm = size === "small";

  const tabButtonSizes = {
    small: `px-2 py-1 text-sm md:text-base`,
    medium: `px-2 py-1 md:px-3 md:py-1.5 xl:px-4 xl:py-2 text-sm md:text-base`,
    large: `px-4 py-2 text-base`,
  };

  if (type === "primary")
    return (
      <button
        type="button"
        href={href}
        className={`flex items-center bg-primary hover:bg-opacity-90 text-white font-medium rounded shadow-md cursor-pointer select-none transition duration-150 ${
          sm ? "px-4 py-2" : "px-6 py-3"
        } ${shrinkTrans && "active:scale-95"} ${className}`}
        {...rest}
      >
        {loading ? <Loader size="small" color="light" type={2} /> : children}
      </button>
    );

  if (type === "secondary")
    return (
      <a
        type="button"
        href={href}
        className={`text-primaryText dark:text-primaryTextDark bg-primary bg-opacity-10 hover:bg-primary hover:text-white font-medium rounded shadow-md border-2 border-primary cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "px-3.5 py-1.5" : "px-5 py-2.5"} ${className}`}
        {...rest}
      >
        {children}
      </a>
    );

  if (type === "text")
    return (
      <button
        type="button"
        href={href}
        className={`text-primaryText bg-transparent dark:text-primaryTextDark hover:bg-primary hover:bg-opacity-10  hover:border-gray-400 rounded cursor-pointer transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "py-2 px-3" : "px-5 py-2.5"} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );

  if (type === "icon")
    return (
      <button
        type="button"
        href={href}
        className={`flex items-center bg-primary text-white hover:bg-opacity-90 font-medium rounded shadow-md cursor-pointer select-none transition duration-150 ${
          shrinkTrans && "active:scale-95"
        } ${sm ? "py-2 px-3 space-x-2" : "px-5 py-2.5 space-x-3"} ${className}`}
        {...rest}
      >
        {loading && startIcon ? (
          <Loader size="small" color="light" type={2} />
        ) : (
          <span className="button-start-icon">{startIcon}</span>
        )}
        <span>{children}</span>
        {loading && endIcon ? (
          <Loader size="small" color="light" type={2} />
        ) : (
          <span className="button-end-icon">{endIcon}</span>
        )}
      </button>
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
        {loading ? <Loader size="small" color="primary" type={2} /> : children}
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
      <button
        role="tab"
        className={`flex items-center space-x-4 text-gray-200 bg-white bg-opacity-10 hover:bg-opacity-20 border-r border-dividerColor dark:border-dividerColorDark cursor-pointer ${
          active &&
          "pl-4 pr-3 bg-transparent text-primary transition duration-150"
        } ${tabButtonSizes[size]} ${className}`}
        {...rest}
      >
        <span>{children}</span>
        {tabCloseButton && (
          <span onClick={closeButtonOnClick}>
            <XIcon
              className={`h-5 ${
                active
                  ? "text-gray-800 dark:text-gray-300"
                  : "text-gray-600 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
              } transition-colors duration-150`}
            />
          </span>
        )}
      </button>
    );
};

export default Button;
