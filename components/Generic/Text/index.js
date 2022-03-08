const Text = ({
  type,
  component = "p",
  bold,
  dim,
  children,
  className,
  ...rest
}) => {
  const Tag = component;

  if (!type || type === "primary")
    return (
      <Tag
        className={`text-sm md:text-base text-primaryText dark:text-primaryTextDark ${
          dim && "text-secondaryText dark:text-secondaryTextDark"
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
