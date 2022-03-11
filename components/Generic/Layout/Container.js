import { Container as MuiContainer } from "@mui/material";

export const Container = ({ children, className, ...rest }) => {
  return (
    <MuiContainer
      maxWidth={false}
      className={`${className} w-full px-3 sm:px-4 md:px-6 lg:px-8 mx-auto`}
      {...rest}
    >
      {children}
    </MuiContainer>
  );
};
export default Container;
