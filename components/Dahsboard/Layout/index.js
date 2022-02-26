import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../Generic/Header";
import LayoutContainer from "../../Generic/Layout/Container";
import Loader from "../../Generic/Loader";
import DashboardHeader from "../Header";
import Navigation from "../Navigation";
import { selectDashboardCurrentState } from "../../../redux/slices/appSlice";
import { useTheme } from "next-themes";
import "primereact/resources/themes/vela-orange/theme.css";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";

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
          <link rel="stylesheet" href="vela-blue/theme.css" />
        ) : (
          <link rel="stylesheet" href="lara-light-blue/theme.css" />
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
                  <Paper className="w-full md:w-1/6">
                    <Navigation />
                  </Paper>
                )}
                <Paper
                  className={`w-full ${
                    showSidebar && "md:w-5/6"
                  } p-1 sm:p-2 md:p-3 bg-backgroundV1 dark:bg-backgroundV1Dark border border-borderColor dark:border-dividerColor`}
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
