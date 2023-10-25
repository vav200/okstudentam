import React from "react";
import HeaderRU from "./HeaderRU";
import HeaderUA from "./HeaderUA";
import HeaderAdmin from "./HeaderAdmin";
import { useSelector } from "react-redux";

function Header() {
  let lang = useSelector((dat) => dat.language);
  let stateadmin = useSelector((dat) => dat.adminpanel);

  if (stateadmin) return <HeaderAdmin />;
  else {
    if (lang === "ru") return <HeaderRU />;
    else return <HeaderUA />;
  }
}

export default Header;
