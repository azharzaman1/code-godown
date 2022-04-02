import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardHeader from "../Header";
import Navigation from "../Navigation";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { Paper } from "@mui/material";
import Header from "../../Generic/Header";
import Container from "../../Generic/Layout/Container";
import useAuth from "../../../hooks/auth/useAuth";
// code jsonify
import SyntaxHighlighter from "react-syntax-highlighter";
import a11yDark from "react-syntax-highlighter/dist/cjs/styles/hljs/a11y-dark";
import LoaderModal from "../../Generic/Loader/LoaderModal";

const DashboardLayout = ({
  children,
  className,
  title,
  description,
  descriptionName,
  icon,
}) => {
  const currentUser = useAuth();
  const router = useRouter();

  const showSidebar =
    router.pathname === "/dashboard" && currentUser?.snippets?.length > 0;

  const hideDashboardHeader =
    router.pathname === "/dashboard/snippet/[snippetID]";

  return (
    <div className={`dashboard-container min-h-screen min-w-full ${className}`}>
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
          <div className="w-full flex flex-col space-y-2 md:flex-row md:items-start md:space-y-0 mt-2 md:space-x-2 mb-2">
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
    </div>
  );
};

export default DashboardLayout;
