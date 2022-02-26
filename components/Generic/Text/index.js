const ThemeText = ({
  type = "primary",
  component = "p",
  children,
  className,
  ...rest
}) => {
  const Tag = component;

  if (type === "primary")
    return (
      <Tag
        className={`${className} text-sm md:text-base font-normal text-primaryText dark:text-primaryTextDark`}
        {...rest}
      >
        {children}
      </Tag>
    );

  if (type === "info")
    return (
      <Tag
        className={`${className} text-xs md:text-sm text-infoText dark:text-infoTextDark font-normal`}
        {...rest}
      >
        {children}
      </Tag>
    );
};

export default ThemeText;
