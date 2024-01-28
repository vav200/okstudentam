import React from "react";
import CustomerArea from "./CustomerArea";
import DicpetcherArea from "./DicpetcherArea";
import { useSelector } from "react-redux";

function PersonalArea() {
  let userstate = useSelector((dat) => dat.userstate);

  switch (userstate) {
    case "customer":
      return <CustomerArea />;
    case "dispetcher":
      return <DicpetcherArea />;
    default:
      break;
  }
}

export default PersonalArea;
