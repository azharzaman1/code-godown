const Text = ({
  type,
  component = "p",
  bold,
  colorVariant = "normal",
  children,
  className,
  ...rest
}) => {
  const Tag = component;

  const colorsVariants = {
    normal: `text-primaryText dark:text-primaryTextDark`,
    dim: `text-secondaryText dark:text-secondaryTextDark`,
  };

  if (!type || type === "primary")
    return (
      <Tag
        className={`text-sm md:text-base ${colorsVariants[colorVariant]} ${
          bold && "font-semibold"
        } ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    );

  if (!type || type === "heading")
    return (
      <Tag
        className={`text-md md:text-lg lg:text-xl xl:text-2xl font-normal md:font-medium ${
          colorsVariants[colorVariant]
        } ${bold && "font-semibold"} ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    );

  if (type === "info")
    return (
      <Tag
        className={`text-xs md:text-sm text-infoText dark:text-infoTextDark font-normal ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    );
};

export default Text;
