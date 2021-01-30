import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "./context/GlobalState";
import theme from "./theme";
// Remove blue outline from buttons and links
import "focus-visible/dist/focus-visible";

render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById("root")
);
