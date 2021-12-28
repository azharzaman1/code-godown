import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";
import AppWrapper from "../components/AppWrapper";
import { SnackbarProvider } from "notistack";
import "../styles/globals.css";
import "../styles/tailwind-theming.css";
import "tailwindcss/tailwind.css";
import "../components/Generic/Loader.css";
import "../components/Dahsboard/SnippetsArchivePanel.css";
import "../components/Dahsboard/SaveSnippet.css";
import ThemeWrapper from "../files/theming/ThemeWrapper";
import { ChakraProvider } from "@chakra-ui/react";

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

      <Provider store={store}>
        <ChakraProvider>
          <ThemeWrapper>
            <SnackbarProvider maxSnack={3}>
              <AppWrapper>
                <Component {...pageProps} />
              </AppWrapper>
            </SnackbarProvider>
          </ThemeWrapper>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
