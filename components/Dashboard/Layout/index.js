import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "../Header";
import Navigation from "../Navigation";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";
import Header from "../../Generic/Header";
import Loader from "../../Generic/Loader";
import Container from "../../Generic/Layout/Container";
import { selectSnippet } from "../../../redux/slices/appSlice";
import useAuth from "../../../hooks/auth/useAuth";
// code jsonify
import SyntaxHighlighter from "react-syntax-highlighter";
import a11yDark from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark";

const DashboardLayout = ({
  children,
  className,
  title,
  description,
  descriptionName,
  icon,
}) => {
  const { theme, setTheme } = useTheme();
  const snippet = useSelector(selectSnippet);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const currentUser = useAuth();

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  useEffect(() => {
    setTimeout(() => {
      setDashboardLoading(false);
    }, 2000);
  }, []);

  const router = useRouter();

  const showSidebar =
    router.asPath === "/dashboard" && currentUser?.snippets?.length > 0;

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
      </Head>
      {dashboardLoading ? (
        <div className="loader-container w-full min-h-screen flex justify-center items-center">
          <Loader label="hang on, while we prepare a dashboard for you" />
        </div>
      ) : (
        <>
          <Header />
          <main>
            <Container className="mt-1" maxWidth={false}>
              <DashboardHeader />
              <div className="w-full flex flex-col space-y-2 md:flex-row md:space-y-0 mt-2 md:space-x-2 mb-2">
                {showSidebar && (
                  <Paper className="w-full md:w-1/6">
                    <Navigation />
                  </Paper>
                )}
                <Paper
                  className={`w-full flex bg-backgroundV1 dark:bg-backgroundV1Dark border-borderColor dark:border-dividerColor ${
                    showSidebar && "md:w-5/6"
                  }`}
                >
                  {children}
                </Paper>
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
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
