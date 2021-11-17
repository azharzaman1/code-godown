import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";
import AppWrapper from "../components/AppWrapper";
import "../styles/globals.css";
import "@material-tailwind/react/tailwind.css";
import "../styles/tailwind-theming.css";
import "tailwindcss/tailwind.css";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
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
        <SnackbarProvider maxSnack={3}>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </SnackbarProvider>
      </Provider>
    </>
  );
}

export default MyApp;
