import GlobalStyles from "../components/GlobalStyles";
import { ChakraProvider } from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Provider } from "react-redux";
import { useStore } from "../store";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <ChakraProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
