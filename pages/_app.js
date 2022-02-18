import Head from "next/head";
import ThemeWrapper from "../theming/ThemeWrapper";
import AppWrapper from "../components/AppWrapper";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "next-themes";
import store from "../redux/store";
import "../styles/globals.css";
import "../styles/tailwind-theming.css";
import "../components/Generic/Loader.css";
import "../components/Dahsboard/SnippetsArchivePanel.css";
import "../components/Dahsboard/SaveSnippet.css";

function MyApp({ Component, pageProps }) {
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
              <AppWrapper>
                <Component {...pageProps} />
              </AppWrapper>
            </SnackbarProvider>
          </ThemeWrapper>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
