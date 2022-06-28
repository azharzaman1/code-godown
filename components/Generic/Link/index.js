import NextLink from "next/link";

const Link = ({
  type,
  href,
  query = {},
  bold,
  underline,
  children,
  className,
  ...rest
}) => {
  if (!type || type === "primary")
    return (
      <NextLink href={{ pathname: href, query }} passHref {...rest}>
        <a
          className={`text-base font-medium text-secondaryText dark:text-secondaryTextDark hover:text-primary dark:hover:text-primary ${
            bold && "font-semibold"
          } ${
            underline && "hover:underline"
          } cursor-pointer transition duration-150 ${className}`}
        >
          {children}
        </a>
      </NextLink>
    );
};

export default Link;
