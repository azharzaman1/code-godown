import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "../Header";
import Navigation from "../Navigation";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import a11yDark from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark";
import Header from "../../Generic/Header";
import Loader from "../../Generic/Loader";
import LayoutContainer from "../../Generic/Layout/Container";
import { selectSnippet } from "../../../redux/slices/appSlice";

const DashboardLayout = ({
  children,
  className,
  title,
  description,
  descriptionName,
  icon,
}) => {
  const snippet = useSelector(selectSnippet);
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

  console.log("Snippet", snippet);

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
          <link rel="stylesheet" href="pr-dark-theme/theme.css" />
        ) : (
          <link rel="stylesheet" href="pr-dark-theme/theme.css" />
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
              <div className="w-full flex flex-col space-y-2 md:flex-row md:space-y-0 mt-1 md:space-x-2 mb-2">
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
              {/* <Paper>
                <div>
                  <SyntaxHighlighter
                    language={"json"}
                    style={a11yDark}
                    wrapLongLines
                    showLineNumbers
                    lineNumberStyle={{ fontSize: "10px" }}
                  >
                    {JSON.stringify(snippet, null, "\t")}
                  </SyntaxHighlighter>
                </div>
              </Paper> */}
            </LayoutContainer>
          </main>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
