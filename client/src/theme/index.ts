import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import styles from "./styles";

const overrides = {
  styles,
  fonts: {
    heading: "'Poppins', sans-serif;",
    body: "'Poppins', sans-serif;",
  },
};

export default extendTheme(overrides);
