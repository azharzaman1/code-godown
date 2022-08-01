const Text = ({
  type,
  component = "p",
  bold,
  colorVariant,
  size,
  children,
  className,
  ...rest
}) => {
  const Tag = component;

  const sizeVariants = {
    small: `text-sm tracking-tight`,
    normal: `text-base tracking-normal`,
    large: `text-xl tracking-tight leading-8`,
    // specials
    info: `text-xs md:text-sm font-normal`,
    heading: `text-md md:text-lg lg:text-xl xl:text-2xl font-normal md:font-medium xl:font-semibold`,
  };

  const colorVariants = {
    normal: `text-primaryText dark:text-primaryTextDark`,
    dim: `text-secondaryText dark:text-secondaryTextDark`,
    // specials
    info: `text-infoText dark:text-infoTextDark`,
  };

  if (!type || type === "primary")
    return (
      <Tag
        className={`${sizeVariants[size || "normal"]} ${
          colorVariants[colorVariant || "normal"]
        } ${bold && "font-semibold"}  ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    );

  if (!type || type === "heading")
    return (
      <Tag
        className={`${sizeVariants["heading"]} ${colorVariants[colorVariant]} ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    );

  if (type === "info")
    return (
      <Tag
        className={`${sizeVariants["info"]} ${colorVariants["info"]} ${className}`}
        {...rest}
      >
        {children}
      </Tag>
    );
};

export default Text;
