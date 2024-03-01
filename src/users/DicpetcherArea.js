import "./personalarea.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import DispetcherSelect from "./DispetcherSelect";
import DispetcherList from "./DispetcherList";

function DicpetcherArea() {
  // let lang = useSelector((dat) => dat.language);
  let dispatch = useDispatch();
  let domen = useSelector((dat) => dat.domen);
  let main = React.createRef();
  let selectedOrderNum = useSelector((dat) => dat.selectedOrderNum);
  let finishedWorks = useSelector((dat) => dat.finishedWorks);
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
    let dataform = new FormData();
    let url = domen + "/users/getUsersettings.php";
    dataform.append("usermail", usermail);
    fetch(url, {
      method: "POST",
      body: dataform,
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error(`Network response was not ok, status: ${data.status}`);
        }
        return data.json();
      })
      .then((data) => {
        console.log("data", data);
        dispatch({ type: "USERSETTINGS", data: data });
      });
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
