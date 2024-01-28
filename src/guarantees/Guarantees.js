import React, { useEffect } from "react";
import GuaranteesRU from "./GuaranteesRU";
import GuaranteesUA from "./GuaranteesUA";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Guarantees() {
  let lang = useSelector((dat) => dat.language);
  if (lang === "ru") return <GuaranteesRU />;
  else return <GuaranteesUA />;
}

export default Guarantees;
