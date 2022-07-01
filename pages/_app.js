import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "next/router";
import MuiThemeWrapper from "../theming/MuiThemeWrapper";
import PersistLogin from "../components/Auth/PersistLogin";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import ProgressBar from "@badrap/bar-of-progress";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import store from "../redux/store";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/globals.css";
import "../styles/theme.css";
import "../styles/tailwind-theming.css";
import "../components/Generic/Loader/Loader.css";
import "../components/Dashboard/Editor.css";
import "../components/Dashboard/SnippetsArchivePanel/SnippetsArchivePanel.css";
import "../components/Dashboard/Snippet/SnippetLeftPanel.css";
import AppWrapper from "../components/AppWrapper";

const progress = new ProgressBar({
  size: 2,
  color: "#ff6d00",
  className: "z-10",
  delay: 0,
});

Router?.events?.on("routeChangeStart", progress.start);
Router?.events?.on("routeChangeComplete", progress.finish);
Router?.events?.on("routeChangeError", progress.finish);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <NextThemeProvider attribute="class">
        <Provider store={store}>
          <AppWrapper>
            <MuiThemeWrapper>
              <QueryClientProvider client={queryClient}>
                <SnackbarProvider maxSnack={3}>
                  <PersistLogin>
                    {getLayout(<Component {...pageProps} />)}
                    <CssBaseline />
                  </PersistLogin>
                  <ReactQueryDevtools initialIsOpen={false} />
                </SnackbarProvider>
              </QueryClientProvider>
            </MuiThemeWrapper>
          </AppWrapper>
        </Provider>
      </NextThemeProvider>
    </>
  );
}

export default MyApp;
