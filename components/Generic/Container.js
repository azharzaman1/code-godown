import { Container } from "@mui/material";

export const LayoutContainer = ({ children, className, ...rest }) => {
  return (
    <Container
      maxWidth={false}
      {...rest}
      className={`w-full px-2 sm:px-3 md:px-4 lg:px-7.5 ${className}`}
    >
      {children}
    </Container>
  );
};

export default LayoutContainer;
