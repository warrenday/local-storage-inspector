import { ChakraProvider } from "@chakra-ui/react";
import PageLocalStorageProvider from "./providers/PageLocalStorageProvider";
import Home from "./Home";
import theme from "./theme";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <PageLocalStorageProvider>
        <Home />
      </PageLocalStorageProvider>
    </ChakraProvider>
  );
};

export default App;
