import Head from "next/head";
import ThemeWrapper from "../theming/ThemeWrapper";
import AppWrapper from "../components/AppWrapper";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { ThemeProvider } from "next-themes";
import store from "../redux/store";
import "../styles/globals.css";
import "../styles/tailwind-theming.css";
import "../components/Generic/Loader.css";
import "../components/Dahsboard/SnippetsArchivePanel.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-orange/theme.css";

const progress = new ProgressBar({
  size: 3,
  color: "#ff6d00",
  className: "z-10",
  delay: 0,
});

Router?.events?.on("routeChangeStart", progress.start);
Router?.events?.on("routeChangeComplete", progress.finish);
Router?.events?.on("routeChangeError", progress.finish);

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

      <ThemeProvider attribute="class">
        <Provider store={store}>
          <ThemeWrapper>
            <SnackbarProvider maxSnack={3}>
              <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>
            </SnackbarProvider>
          </ThemeWrapper>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
