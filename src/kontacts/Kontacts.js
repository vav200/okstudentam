import React from "react";
import KontactsRU from "./KontactsRU";
import KontactsUA from "./KontactsUA";
import { useSelector } from "react-redux";

function Main() {
  let lang = useSelector((dat) => dat.language);
  if (lang === "ru") return <KontactsRU />;
  else return <KontactsUA />;
}

export default Main;
