import "./personalarea.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import { usePageVisibility } from "react-page-visibility";

function CustomerList() {
  let dispatch = useDispatch();
  let lang = useSelector((dat) => dat.language);
  let usermail = useSelector((dat) => dat.usermail);
  let domen = useSelector((dat) => dat.domen);
  let thisOrder = [{ numorder: "", countChatFromAuthor: "" }];
  let isVisibl = usePageVisibility();

  const [userorders, setUserorders] = useState();
  const timerIdRef = useRef(null);

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

  let lastSuccessfulFetchTime;
  function dataFetch() {
    let url = domen + "/users/getUserOrders.php";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "&usermail=" + usermail,
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error(`Network response was not ok, status: ${data.status}`);
        }
        return data.json();
      })
      .then((data) => {
        if (data && data !== "notdata") {
          data.sort((a, b) => a.numorder - b.numorder);
          thisOrder.sort((a, b) => a.numorder - b.numorder);
          // console.log("data", data);
          // console.log("thisOrder", thisOrder);
        }
        // console.log(
        //   thisOrder
        //     .map((item, ind) => {
        //       console.log(
        //         "item.countChatFromAuthor = ",
        //         item.countChatFromAuthor,
        //         "data[ind].countChatFromAuthor = ",
        //         data[ind].countChatFromAuthor
        //       );
        //       return item.countChatFromAuthor === data[ind].countChatFromAuthor;
        //     })
        //     .some((result) => result === false)
        // );

        if (data && data !== "notdata") {
          if (
            data.length !== thisOrder.length ||
            thisOrder
              .map((item, ind) => item.countChatFromAuthor === data[ind].countChatFromAuthor)
              .some((result) => result === false)
          ) {
            thisOrder = data;
            lastSuccessfulFetchTime = Date.now();
            setUserorders(
              data.sort((b, a) => {
                if (a.countChatFromAuthor === "" && b.countChatFromAuthor === "") {
                  return 0;
                } else if (a.countChatFromAuthor === "") {
                  return 1;
                } else if (b.countChatFromAuthor === "") {
                  return -1;
                } else {
                  return a.countChatFromAuthor - b.countChatFromAuthor;
                }
              })
            );
          }
        } else {
          setUserorders(data);
        }
      })
      .finally(() => {
        if (isVisibl) {
          timerIdRef.current = setTimeout(dataFetch, 6000);
        } else {
          clearTimeout(timerIdRef.current);
          timerIdRef.current = null;
        }
      });
  }

  useEffect(() => {
    clearTimeout(timerIdRef.current);
    timerIdRef.current = null;
    dataFetch();
    return () => {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    };
  }, [isVisibl]);

  return (
    <div>
      {userorders ? (
        userorders === "notdata" ? (
          <p className="mt-4 ps-3 fs-2">
            {lang === "ru" ? "Нет данных для отображения" : "Немає даних для відображення"}
          </p>
        ) : (
          <ul className={`orders__list`}>
            {userorders.map((item) => (
              <li className="orders__item" key={item.numorder}>
                <div
                  className="orders__box"
                  onClick={() => {
                    dispatch({ type: "SELECTEDORDERNUM", data: item.numorder });
                  }}
                >
                  <span className="orders__box_num">{"№" + item.numorder + " "}</span>
                  <span dangerouslySetInnerHTML={{ __html: item.theme.replace(/\n/g, "<br />") }} />
                  <span
                    className={`orders__count ${item.countChatFromAuthor == 0 ? "d-none" : ""}`}
                  >
                    {item.countChatFromAuthor}
                  </span>
                </div>
                <ul className="orders__list-secondlvl">
                  <li>
                    {lang === "ru" ? "Статус заказа: " : "Статус заказу: "}
                    {outputOrderStatus(item.status)}
                  </li>
                  <li className={item.ordercost ? "" : "d-none"}>
                    {lang === "ru" ? "Стоимость: " : "Вартість: "}
                    {item.ordercost + " грн"}{" "}
                    <span className={`ms-2 ${item.orderprepayment ? "" : "d-none"}`}>
                      {lang === "ru" ? "Оплачено: " : "Оплачено: "}
                      {item.orderprepayment + " грн"}
                    </span>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        )
      ) : (
        <p className="mt-4 ps-3 orders__zagruzka"></p>
      )}
    </div>
  );
}

export default CustomerList;
