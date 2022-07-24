import { whiteColor, hexToRgb } from "assets/jss/material-kit-pro-react.js";

const cardBodyStyle = {
  cardBody: {
    padding: 16,
    flex: "1 1 auto",
    WebkitBoxFlex: "1"
  },
  cardBodyBackground: {
    position: "relative",
    zIndex: "2",
    minHeight: "230px",
    paddingTop: "40px",
    paddingBottom: "40px",
    maxWidth: "440px",
  },
  cardBodyPlain: {
    paddingLeft: "5px",
    paddingRight: "5px"
  },
  cardBodyFormHorizontal: {
    paddingLeft: "15px",
    paddingRight: "15px",
    "& form": {
      margin: "0"
    }
  },
  cardPricing: {
    padding: "15px!important",
    margin: "0px!important"
  },
  cardSignup: {
    padding: "0px 30px 0px 30px"
  },
  cardBodyColor: {
    borderRadius: "6px",
    "& h1,& h2,& h3": {
      "& small": {
        color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)"
      }
    }
  }
};

export default cardBodyStyle;
