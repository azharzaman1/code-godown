import Head from "next/head";
import useSWR from "swr";
import Header from "../../Generic/Header";
import { fetcher } from "../../../files/utils";

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
  navigation,
  themeSwitch,
}) => {
  const { data, error } = useSWR("/api/navigation", fetcher);

  return (
    <div className={`layout-container min-h-screen min-w-full ${className}`}>
      <Head>
        <title>{title}</title>
        <meta name={descriptionName} content={description} />
        <link rel="icon" href={icon} />
      </Head>
      {!hideHeader && <Header />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
