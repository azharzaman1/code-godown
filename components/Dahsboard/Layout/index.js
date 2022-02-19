import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectDashboardCurrentState } from "../../../redux/slices/appSlice";
import Header from "../../Generic/Header";
import LayoutContainer from "../../Generic/Layout/Container";
import Loader from "../../Generic/Loader";
import DashboardHeader from "../Header";
import Navigation from "../Navigation";

const DashboardLayout = ({
  children,
  className,
  title,
  description,
  descriptionName,
  icon,
}) => {
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const dashboardCurrentState = useSelector(selectDashboardCurrentState);

  useEffect(() => {
    setTimeout(() => {
      setDashboardLoading(false);
    }, 2000);
  }, []);

  const showSidebar = dashboardCurrentState === "displaySnippets";

  return (
    <div
      className={`${className} dashboard-container bg-gray-100 dark:bg-backgroundV1 min-h-screen`}
    >
      <Head>
        <title>{title || "Dashboard | Code Godown"}</title>
        <meta
          name={descriptionName || "descritpion"}
          content={
            description || "Code management applicatoin created with NextJs"
          }
        />
        <link rel="icon" href={icon || "/favicon.ico"} />
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
                  <div className="w-full md:w-1/6 bg-backgroundV1 border border-gray-700">
                    <Navigation />
                  </div>
                )}
                <div
                  className={`w-full ${
                    showSidebar && "md:w-5/6"
                  } p-1 sm:p-2 md:p-3 bg-backgroundV1 border border-gray-700`}
                >
                  {children}
                </div>
              </div>
            </LayoutContainer>
          </main>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
