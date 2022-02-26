import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "../../Generic/Header";
import Loader from "../../Generic/Loader";
import DashboardHeader from "../Header";
import Navigation from "../Navigation";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";
import LayoutContainer from "../../Generic/Layout/Container";
import "primereact/resources/themes/vela-blue/theme.css";

const DashboardLayout = ({
  children,
  className,
  title,
  description,
  descriptionName,
  icon,
}) => {
  const { theme, setTheme } = useTheme();
  const [dashboardLoading, setDashboardLoading] = useState(true);

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  useEffect(() => {
    setTimeout(() => {
      setDashboardLoading(false);
    }, 2000);
  }, []);

  const router = useRouter();

  const showSidebar = router.asPath === "/dashboard";

  return (
    <div className={`${className} dashboard-container min-h-screen`}>
      <Head>
        <title>{title || "Dashboard | Code Godown"}</title>
        <meta
          name={descriptionName || "descritpion"}
          content={
            description || "Code management applicatoin created with NextJs"
          }
        />
        <link rel="icon" href={icon || "/favicon.ico"} />
        {theme === "dark" ? (
          <link rel="stylesheet" href="vela-orange/theme.css" />
        ) : (
          <link rel="stylesheet" href="saga-orange/theme.css" />
        )}
      </Head>
      {dashboardLoading ? (
        <div className="loader-container w-full min-h-screen flex justify-center items-center">
          <Loader label="hang on, while we prepare a dashboard for you" />
        </div>
      ) : (
        <>
          <Header />
          <main>
            <LayoutContainer className="mt-1">
              <DashboardHeader />
              <div className="w-full flex flex-col space-y-2 md:flex-row md:space-y-0 mt-1 md:space-x-2">
                {showSidebar && (
                  <Paper className="w-full md:w-1/6 mt-1">
                    <Navigation />
                  </Paper>
                )}
                <Paper
                  className={`w-full ${
                    showSidebar && "md:w-5/6"
                  } bg-backgroundV1 dark:bg-backgroundV1Dark border-borderColor dark:border-dividerColor`}
                >
                  {children}
                </Paper>
              </div>
            </LayoutContainer>
          </main>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
