import React from "react";
import GuaranteesRU from "./GuaranteesRU";
import GuaranteesUA from "./GuaranteesUA";
import { useSelector } from "react-redux";

function Guarantees() {
  let lang = useSelector((dat) => dat.language);
  if (lang === "ru") return <GuaranteesRU />;
  else return <GuaranteesUA />;
}

export default Guarantees;
