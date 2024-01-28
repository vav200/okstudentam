import "./personalarea.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { usePageVisibility } from "react-page-visibility";

function DispetcherList() {
  let dispatch = useDispatch();
  let dispetcher_list = useSelector((dat) => dat.dispetcher_list);
  // dispetcher_list = dispetcher_list ? dispetcher_list : "forEvaluation";
  let lang = useSelector((dat) => dat.language);
  let isVisibl = usePageVisibility();
  let domen = useSelector((dat) => dat.domen);
  let selectedOrderNum = useSelector((dat) => dat.selectedOrderNum);

  const [orders, setOrders] = useState([]);
  const [findparameter, setFindparameter] = useState("bynum");
  const [searchname, setSearchname] = useState("");
  const [fetchingData, setFetchingData] = useState(false);
  const timerIdRef = useRef(null);

  function findOrder(e) {
    console.log(e.target.value);
    if (findparameter === "bynum") {
      const regEx = /[^\d]/g;
      let inp = e.target.value.replace(regEx, "");
      e.target.value = inp;
    }
    setSearchname(e.target.value.trim().toLowerCase());
  }

  function outputOrderStatus(status) {
    switch (status) {
      case "forEvaluation":
        if (lang === "ru") return "Ожидает оценки";
        else return "Чекає на оцінку";
      case "waitingPayment":
        if (lang === "ru") return "Ожидает оплаты";
        else return "Чекає на оплату";
      case "atWork":
        if (lang === "ru") return "В работе";
        else return "В роботі";
      case "onGuarantee":
        if (lang === "ru") return "На гарантии";
        else return "На гарантії";
      case "done":
        if (lang === "ru") return "Выполнено";
        else return "Виконано";
    }
  }

  function dataFetch() {
    let url = domen + "/users/getAllOrders.php";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "&status=" + dispetcher_list,
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error(`Network response was not ok, status: ${data.status}`);
        }
        return data.json();
      })
      .then((data) => {
        console.log(dispetcher_list);
        if (data && data !== "notdata") {
          data.sort((b, a) => {
            if (a.countChatFromCustomer === "" && b.countChatFromCustomer === "") {
              return 0;
            } else if (a.countChatFromCustomer === "") {
              return 1;
            } else if (b.countChatFromCustomer === "") {
              return -1;
            } else {
              return a.countChatFromCustomer - b.countChatFromCustomer;
            }
          });
        }
        setOrders(data);
        console.log(data);
        console.log("isVisibl", isVisibl);
        console.log("timerIdRef", timerIdRef);
      });
  }

  useEffect(() => {
    setOrders("");
    if (isVisibl) {
      dataFetch();
      timerIdRef.current = setInterval(dataFetch, 6000);
    } else {
      clearInterval(timerIdRef.current);
      // timerIdRef.current = setInterval(dataFetch, 120000);
    }
    return () => {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    };
  }, [dispetcher_list, isVisibl]);

  return (
    <div>
      <div className={`findblock `}>
        <input
          type="text"
          className="inpsecondform"
          placeholder={lang === "ru" ? "Поиск заказа..." : "Пошук замовлення..."}
          onChange={(e) => {
            findOrder(e);
          }}
          onFocus={() => {
            clearInterval(timerIdRef.current);
          }}
          onBlur={() => {
            timerIdRef.current = setInterval(dataFetch, 6000);
          }}
        />
        <select className="inpsecondform212" onChange={(e) => setFindparameter(e.target.value)}>
          <option value="bynum">{lang === "ru" ? "по номеру" : "за номером"}</option>
          <option value="bytheme">{lang === "ru" ? "по теме" : "за темою"}</option>
        </select>
      </div>

      <div>
        {orders ? (
          orders === "notdata" ? (
            <p className="mt-4 ps-3 fs-2">
              {lang === "ru" ? "Нет данных для отображения" : "Немає даних для відображення"}
            </p>
          ) : (
            <>
              <ul className={`orders__list`}>
                {orders
                  .filter((item) =>
                    searchname != "" && findparameter === "bynum"
                      ? item.numorder.includes(searchname)
                      : searchname != "" && findparameter === "bytheme"
                      ? item.theme.toLowerCase().includes(searchname)
                      : item
                  )
                  .map((item) => (
                    <li className="orders__item" key={item.numorder}>
                      <div
                        className="orders__box"
                        onClick={() => {
                          dispatch({ type: "SELECTEDORDERNUM", data: item.numorder });
                        }}
                      >
                        <span className="orders__box_num">{"№" + item.numorder + " "}</span>
                        <span
                          dangerouslySetInnerHTML={{ __html: item.theme.replace(/\n/g, "<br />") }}
                        />
                        <span
                          className={`orders__count ${
                            item.countChatFromCustomer == 0 ? "d-none" : ""
                          }`}
                        >
                          {item.countChatFromCustomer}
                        </span>
                      </div>
                      <ul className="orders__list-secondlvl">
                        <li>
                          {lang === "ru" ? "Статус заказа: " : "Статус заказу: "}
                          {outputOrderStatus(item.status)}
                        </li>
                        <li className={item.ordercost ? "" : "d-none"}>
                          {lang === "ru" ? "Цена: " : "Ціна: "}
                          {item.ordercost + " грн"}{" "}
                          <span className={`ms-2 ${item.orderprepayment ? "" : "d-none"}`}>
                            {lang === "ru" ? "Аванс: " : "Аванс: "} {item.orderprepayment + " грн"}
                          </span>
                        </li>
                      </ul>
                    </li>
                  ))}
              </ul>
            </>
          )
        ) : (
          <p className="mt-4 ps-3 orders__zagruzka"></p>
        )}
      </div>
    </div>
  );
}

export default DispetcherList;
