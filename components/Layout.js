import Head from "next/head";
import useSWR from "swr";
import { fetcher } from "../files/utils";
import Header from "./Generic/Header/Header";

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
}) => {
  const { data, error } = useSWR("/api/navigation", fetcher);

  return (
    <div className={`layout-contaianer ${className}`}>
      <Head>
        <title>{title}</title>
        <meta name={descriptionName} content={description} />
        <link rel="icon" href={icon} />
      </Head>
      {!hideHeader && (
        <Header
          navigation={navigation || data}
          transparentEffect={tranparentHeader}
          variant={headerVariant}
        />
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
