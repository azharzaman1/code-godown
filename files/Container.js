export const Container = ({ children, className, ...rest }) => {
  return (
    <main className={`w-full px-2 sm:px-3 md:px-5 lg:px-9 ${className}`}>
      {children}
    </main>
  );
};

export default Container;
