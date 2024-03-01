import React, { useEffect } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { useSelector, useDispatch } from "react-redux";
import HeaderUser from "./HeaderUser";
import HeaderCustomer from "./HeaderCustomer";
import HeaderDispetcher from "./HeaderDispetcher";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

function Header() {
  let stateadmin = useSelector((dat) => dat.adminpanel);
  let userstate = useSelector((dat) => dat.userstate);
  let dispatch = useDispatch();
  let loc = useLocation();

  useEffect(() => {
    dispatch({
      type: "USERDATA",
      data: {
        usermail: Cookies.get("usermail"),
        username: Cookies.get("username"),
        userstate: Cookies.get("userstate"),
      },
    });
    let dispetcherListValue = Cookies.get("dispetcher_list")
      ? Cookies.get("dispetcher_list")
      : "forEvaluation";
    dispatch({ type: "SETDISPETCHERLIST", data: dispetcherListValue });
  }, []);

  if (stateadmin) return <HeaderAdmin />;
  else if (userstate === "customer") return <HeaderCustomer />;
  else if (userstate === "dispetcher") return <HeaderDispetcher />;
  else {
    return <HeaderUser path={loc.pathname} />;
  }
}

export default Header;
