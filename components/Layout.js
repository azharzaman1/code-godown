import Head from "next/head";
import Header from "./Header";

const Layout = ({
  children,
  hideHeader = false,
  hideFooter = false,
  className,
  title = "Code Godown",
  description = "Code management applicatoin created with NextJs",
  descriptionName = "descritpion",
  icon = "/favicon.ico",
  navigation,
}) => {
  return (
    <div className={`layout-contaianer ${className}`}>
      <Head>
        <title>{title}</title>
        <meta name={descriptionName} content={description} />
        <link rel="icon" href={icon} />
      </Head>
      {!hideHeader && <Header navigation={navigation} />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
