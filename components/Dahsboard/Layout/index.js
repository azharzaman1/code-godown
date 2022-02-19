import Head from "next/head";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setTimeout(() => {
      setDashboardLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={`dashboard-container min-h-screen ${className}`}>
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
                <div className="w-full md:w-1/6 bg-backgroundV1 border border-gray-700">
                  <Navigation />
                </div>
                <div className="w-full md:w-5/6 bg-backgroundV1 border border-gray-700">
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
