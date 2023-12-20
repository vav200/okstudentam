import React from "react";
import Customer_area from "./Customer_area";
import Dicpetcher_area from "./Dicpetcher_area";
import { useSelector } from "react-redux";

function Personal_area() {
  let userstate = useSelector((dat) => dat.userstate);

  switch (userstate) {
    case "customer":
      return <Customer_area />;
    case "dispetcher":
      return <Dicpetcher_area />;
    default:
      break;
  }
}

export default Personal_area;
