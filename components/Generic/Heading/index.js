const Heading = ({ type, className, children, ...rest }) => {
  if (type === "primary" || !type)
    return (
      <h1
        className={`text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-primaryText dark:text-primaryTextDark ${className}`}
        {...rest}
      >
        {children}
      </h1>
    );

  if (type === "secondary")
    return (
      <h2
        className={`text-lg sm:text-xl md:text-3xl tracking-tight font-bold text-primaryText dark:text-primaryTextDark ${className}`}
        {...rest}
      >
        {children}
      </h2>
    );

  if (type === "tertiary")
    return (
      <h2
        className={`text-sm md:text-base lg:text-lg font-medium text-primaryText dark:text-primaryTextDark ${className}`}
        {...rest}
      >
        {children}
      </h2>
    );
};

export default Heading;
