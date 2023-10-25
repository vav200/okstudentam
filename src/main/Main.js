import React from "react";
import MainRU from "./MainRU";
import MainUA from "./MainUA";
import { useSelector } from "react-redux";

function Main() {
  let lang = useSelector((dat) => dat.language);
  if (lang === "ru") return <MainRU />;
  else return <MainUA />;
}

export default Main;
