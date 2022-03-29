import { Close } from "@mui/icons-material";

const Chip = ({
  children,
  className,
  shrink = false,
  color = "primary",
  size = "medium",
  startIcon,
  endIcon,
  closeIconAction,
  ...rest
}) => {
  const colorSchemes = {
    light:
      "border-gray-400 border-opacity-30 hover:bg-gray-100 bg-opacity-95 dark:bg-opacity-10",
    lightContained:
      "border-gray-300 border-opacity-30 bg-gray-100 bg-opacity-95",
    primary: "text-primary border-primary border-opacity-40",
    primaryContained:
      "text-white bg-primary bg-opacity-80 border-primary border-opacity-40",
  };

  const sizes = {
    small: "py-0.5 px-2 text-sm hover:shadow-sm space-x-1",
    medium: "pb-1.5 pt-1 px-3 text space-x-2",
    large: "pb-2 pt-1.5 px-3 space-x-2",
  };

  const chipEndIcon = closeIconAction ? (
    <Close fontSize="small" onClick={closeIconAction} />
  ) : (
    endIcon
  );

  return (
    <span
      className={`flex items-center border-2 rounded-full hover:shadow transition-all duration-150 cursor-pointer select-none ${
        sizes[size]
      } ${colorSchemes[color]} ${shrink && "active:scale-95"} ${className}`}
      {...rest}
    >
      {startIcon && (
        <span className="text-inherit opacity-70">{startIcon}</span>
      )}
      <span>{children}</span>
      {chipEndIcon && (
        <span className="text-inherit opacity-70">{chipEndIcon}</span>
      )}
    </span>
  );
};

export default Chip;
