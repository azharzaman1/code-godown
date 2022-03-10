import { Container } from "@mui/material";

export const LayoutContainer = ({ children, className, ...rest }) => {
  return (
    <Container
      maxWidth={false}
      className={`${className} w-full max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 mx-auto`}
      {...rest}
    >
      {children}
    </Container>
  );
};
export default LayoutContainer;
