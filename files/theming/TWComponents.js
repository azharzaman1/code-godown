export const TWText = ({
  type = "primary",
  dark,
  component = "p",
  children,
  className,
  ...rest
}) => {
  const Tag = component;

  if (type === "primary")
    return (
      <Tag className={`text ${dark && "dark"} ${className}`} {...rest}>
        {children}
      </Tag>
    );
};
