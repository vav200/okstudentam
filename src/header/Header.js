import React from "react";
import HeaderRU from "./HeaderRU";
import HeaderUA from "./HeaderUA";
import HeaderAdmin from "./HeaderAdmin";
import { useSelector } from "react-redux";
import Header_user from "./Header_user";
import Header_customer from "./Header_customer";
import Header_dispetcher from "./Header_dispetcher";

function Header() {
  let lang = useSelector((dat) => dat.language);
  let stateadmin = useSelector((dat) => dat.adminpanel);
  let userstate = useSelector((dat) => dat.userstate);

  if (stateadmin) return <HeaderAdmin />;
  else if (userstate === "customer") return <Header_customer />;
  else if (userstate === "dispetcher") return <Header_dispetcher />;
  else {
    return <Header_user />;
    // if (lang === "ru") return <HeaderRU />;
    // else return <HeaderUA />;
  }
}

export default Header;
