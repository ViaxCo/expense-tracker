import bg from "../bg.svg";

const styles = {
  global: {
    //   My resets
    "*, *::before, *::after": {
      boxSizing: "border-box",
    },
    "*": {
      margin: "0",
      padding: "0",
      WebkitTapHighlightColor: "transparent",
    },
    // styles for the `html`
    html: {
      minWidth: "fit-content",
    },
    // styles for the `body`
    body: {
      minWidth: "fit-content",
      minHeight: "100vh",
      // bg: "#4100AA",
      bg: "#4E0098",
      bgImage: `url(${bg})`,
      bgRepeat: "no-repeat",
      bgAttachment: "fixed",
      bgPosition: "center center",
      bgSize: "cover",
    },
    ".overlay": {
      position: "absolute",
      display: "none",
      backdropFilter: "blur(0.3rem)",
      /* stretch to screen edges */
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    ".overlay-shown": {
      display: "block",
    },
    ".f-glass": {
      bg:
        "linear-gradient(to right bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.4))",
      backdropFilter: "blur(0.17rem)  brightness(150%)",
      border: "2px solid rgba(255,255,255,0.01)",
    },
  },
};

export default styles;
