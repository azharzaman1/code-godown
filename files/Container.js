import { Container } from "@mui/material";

export const LayoutContainer = ({ children, className, ...rest }) => {
  return (
    <Container
      maxWidth={false}
      {...rest}
      className={`w-full px-2 sm:px-3 md:px-5 lg:px-9 ${className}`}
    >
      {children}
    </Container>
  );
};

export default LayoutContainer;
