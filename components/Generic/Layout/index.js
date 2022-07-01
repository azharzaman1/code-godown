import Head from "next/head";
import Header from "../../Generic/Header";

const Layout = ({
  children,
  hideHeader = false,
  headerVariant = "light",
  tranparentHeader = false,
  hideFooter = false,
  className,
  title = "Code Godown",
  description = "Code management applicatoin created with NextJs",
  descriptionName = "descritpion",
  icon = "/favicon.ico",
  themeSwitch,
}) => {
  return (
    <div className={`layout-container min-h-screen min-w-full ${className}`}>
      <Head>
        <title>{title}</title>
        <meta name={descriptionName} content={description} />
        <link rel="icon" href={icon} />
      </Head>
      {!hideHeader && <Header themeSwitch={themeSwitch} />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
