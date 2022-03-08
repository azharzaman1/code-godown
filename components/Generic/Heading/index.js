const Heading = ({ type, className, children, ...rest }) => {
  if (type === "primary" || !type)
    return (
      <h1
        className={`${className} text-2xl sm:text-3xl md:text-4xl lg:text-6xl tracking-tight font-extrabold text-primaryText dark:text-primaryTextDark`}
        {...rest}
      >
        {children}
      </h1>
    );

  if (type === "secondary")
    return (
      <h2
        className={`secondary-heading ${className} text-lg sm:text-xl md:text-3xl tracking-tight font-bold text-primaryText dark:text-primaryTextDark`}
        {...rest}
      >
        {children}
      </h2>
    );

  if (type === "tertiary")
    return (
      <h2
        className={`tertiary-heading ${className} text-base lg:text-lg font-medium text-primaryText dark:text-primaryTextDark`}
        {...rest}
      >
        {children}
      </h2>
    );
};

export default Heading;
