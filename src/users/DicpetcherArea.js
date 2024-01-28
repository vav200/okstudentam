import "./personalarea.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import DispetcherSelect from "./DispetcherSelect";
import DispetcherList from "./DispetcherList";

function DicpetcherArea() {
  let lang = useSelector((dat) => dat.language);
  let main = React.createRef();
  let selectedOrderNum = useSelector((dat) => dat.selectedOrderNum);
  let username = useSelector((dat) => dat.username);
  let usermail = useSelector((dat) => dat.usermail);
  let userstate = useSelector((dat) => dat.userstate);
  let dispetcher_list = useSelector((dat) => dat.dispetcher_list);

  useEffect(() => {
    // Установка куки для каждого параметра входа
    Cookies.set("usermail", usermail);
    Cookies.set("username", username);
    Cookies.set("userstate", userstate);
    let dispetcherListValue = dispetcher_list ? dispetcher_list : "forEvaluation";
    Cookies.set("dispetcher_list", dispetcherListValue);
  }, []);

  return (
    <main className="persarea" ref={main}>
      {/* ------------Список заказов------------ */}

      {selectedOrderNum === "" && <DispetcherList />}

      {/* --------------------------------------- */}

      {/* ------------Выбранный заказ------------ */}

      {selectedOrderNum !== "" && <DispetcherSelect />}

      {/* --------------------------------------- */}
    </main>
  );
}

export default DicpetcherArea;
