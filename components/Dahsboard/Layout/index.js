import Head from "next/head";
import Header from "../../Generic/Header";

const DashboardLayout = ({
  children,
  hideHeader = false,
  headerVariant = "light",
  className,
  title = "Dashboard | Code Godown",
  description = "Code management applicatoin created with NextJs",
  descriptionName = "descritpion",
  icon = "/favicon.ico",
}) => {
  return (
    <div className={`dashboard-container ${className}`}>
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

export default DashboardLayout;
