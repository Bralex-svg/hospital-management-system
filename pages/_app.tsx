import React from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "../app/store";
import { PersistGate } from "redux-persist/integration/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Layout, Loader } from "../components";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <Loader />
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
