import GlobalStyles from "../components/GlobalStyles";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "@/Header";
import { Scrollbars } from "react-custom-scrollbars-2";

const App = ({ Component, pageProps }) => (
  <Scrollbars style={{ width: "100%", height: "100vh" }} universal={true}>
    <ChakraProvider>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  </Scrollbars>
);

export default App;
