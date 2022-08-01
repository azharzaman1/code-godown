import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardHeader from "../Header";
import DashboardNavigation from "../DashboardNavigation";
import { useRouter } from "next/router";
import Header from "../../Generic/Header";
import Container from "../../Generic/Layout/Container";
// code jsonify
// import SyntaxHighlighter from "react-syntax-highlighter";
// import a11yDark from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark";

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

  const router = useRouter();

  const showSidebar = router.pathname === "/dashboard";

  const hideDashboardHeader =
    router.pathname === "/dashboard/snippet/[snippetID]";

  return (
    <div className={`${className} dashboard-container min-h-screen min-w-full`}>
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
      <Header />
      <main>
        <Container className="mt-1" maxWidth={false}>
          {!hideDashboardHeader && <DashboardHeader />}
          <div className="w-full flex flex-col space-y-2 lg:flex-row lg:items-start lg:space-y-0 mt-2 lg:space-x-2 mb-2">
            {showSidebar && (
              <div className="w-full bg-backgroundV1 dark:bg-backgroundContrastDark lg:w-1/6">
                <DashboardNavigation />
              </div>
            )}
            <div
              className={`w-full flex bg-transparent dark:bg-backgroundV1Dark ${
                showSidebar && "lg:w-5/6"
              }`}
            >
              {children}
            </div>
          </div>
        </Container>
      </main>
      {/* <div className="mt-3 z-10">
            <SyntaxHighlighter
              language={"javascript"}
              style={a11yDark}
              showLineNumbers
              lineNumberStyle={{ fontSize: "10px" }}
            >
              {JSON.stringify(snippet, null, 4)}
            </SyntaxHighlighter>
          </div> */}
      {/* </>
      )} */}
    </div>
  );
};

export default DashboardLayout;
