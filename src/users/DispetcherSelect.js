import "./personalarea.css";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePageVisibility } from "react-page-visibility";
// import sendIcon from "./img/sendmess1.png";

function DispetcherSelect() {
  let dispatch = useDispatch();
  let domen = useSelector((dat) => dat.domen);
  let lang = useSelector((dat) => dat.language);
  let selectedOrderNum = useSelector((dat) => dat.selectedOrderNum);
  let formForMessage = React.createRef();
  let dispetcher_list = useSelector((dat) => dat.dispetcher_list);
  let isVisiblSelectOrder = usePageVisibility();

  const [selectedOrder, setSelectedOrder] = useState("");
  const [message, setMessage] = useState("");
  const [addDopfiles, setAddDopfiles] = useState([]);
  const [switchorderinfo, setSwitchorderinfo] = useState(true);
  const [nameCustomerFromSelectedOrder, setNameCustomerFromSelectedOrder] = useState();
  const [orderPrepayment, setOrderPrepayment] = useState("");
  const [orderCost, setOrderCost] = useState("");

  const [changeOrderCost, setChangeOrderCost] = useState(true);
  const [changeOrderPrepayment, setChangeOrderPrepayment] = useState(true);
  const timerIdSelect = useRef(null);
  const isInitialLoad = useRef(true);
  let masMessenges = useRef([]);

  function getLinkFromText(txt) {
    let incomingtext = txt;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let parts = incomingtext.split(urlRegex);
    let textWithLinks = parts.map((part, index) => {
      if (urlRegex.test(part)) {
        // Это ссылка, вставляем ее в тег <a>
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {/* {part} */}
            link
          </a>
        );
      } else {
        // Это обычный текст, вставляем его без изменений
        return <span key={index}>{part} </span>;
      }
    });
    return textWithLinks;
  }

  function getLinkFromTextChat(txt) {
    let incomingtext = txt.replace(/\n/g, "<br />");
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let parts = incomingtext.split(urlRegex);
    let textWithLinks = parts.map((part, index) => {
      if (urlRegex.test(part)) {
        // Это ссылка, вставляем ее в тег <a>
        return `<a key=${index} href=${part} target="_blank" rel="noopener noreferrer">link</a>`;
      } else {
        // Это обычный текст, вставляем его без изменений
        return `<span key=${index}>${part}</span>`;
      }
    });
    return textWithLinks.join("");
  }

  function changeCost() {
    let url = domen + "/users/changeOrderCost.php";
    console.log(orderCost);
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "orderNumber=" + selectedOrder.numorder + "&ordercost=" + orderCost,
    })
      .then((data) => data.text())
      .then((data) => {
        console.log(data);
        setChangeOrderCost(true);
      });
  }

  function changePrepayment() {
    let url = domen + "/users/changeOrderPrepayment.php";
    console.log(orderCost);
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "orderNumber=" + selectedOrder.numorder + "&orderprepayment=" + orderPrepayment,
    })
      .then((data) => data.text())
      .then((data) => {
        console.log(data);
        setChangeOrderPrepayment(true);
      });
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      // Если нажат шифт и клавиша Enter, добавляем новую строку
      setMessage((prevMess) => prevMess + "");
    } else if (e.key === "Enter") sendmessage(e);
  };

  function showCustomerFiles() {
    if (selectedOrder.customerFiles) {
      let customerFilesObject = JSON.parse(selectedOrder.customerFiles);
      return customerFilesObject.map((item, ind) => {
        return (
          <li className="list-interval" key={"fc" + ind}>
            <a
              className="order__link"
              href={`${domen}/users/${item.path}`}
              download
              target="_blank"
            >
              {item.name}
            </a>
            <p className="p-0 m-0">{item.dataTime}</p>
          </li>
        );
      });
    } else return <p>Нет приложенных файлов</p>;
  }

  function showAuthorFiles() {
    if (selectedOrder.authorFiles) {
      let authorFilesObject = JSON.parse(selectedOrder.authorFiles);
      return authorFilesObject.map((item, ind) => {
        return (
          <li className="list-interval" key={"fa" + ind}>
            <a
              className="order__link"
              href={`${domen}/users/${item.path}`}
              download
              target="_blank"
            >
              {item.name}
            </a>
            <p className="p-0 m-0">{item.dataTime}</p>
          </li>
        );
      });
    } else return <p>Нет приложенных файлов</p>;
  }

  function showCorrespondence() {
    if (selectedOrder.correspondence) {
      let correspondenceObject = JSON.parse(selectedOrder.correspondence);
      // console.log(correspondenceObject);
      return correspondenceObject.map((item, ind) => {
        return (
          <li
            className={item.status === "author" ? "message__customer" : "message__author"}
            key={"corr" + ind}
          >
            <div className="order__chatnames">
              {item.status === "customer" ? nameCustomerFromSelectedOrder + ":" : "OKstudentam:"}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: getLinkFromTextChat(item.text),
              }}
            />
            {item.hasOwnProperty("files") && (
              <ul className="order__filesInChat">
                {item.files.map((el, i) => (
                  <li key={i}>
                    <a
                      className="order__linkChat"
                      href={`${domen}/users/${el.path}`}
                      download
                      target="_blank"
                    >
                      {el.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <p className="message__datatime">{item.date}</p>
          </li>
        );
      });
    } else return "";
  }

  function outputTypeWork(typeFromBase) {
    switch (typeFromBase) {
      case "diplomnaia":
        if (lang === "ru") return "Дипломная работа";
        else return "Дипломна робота";
      case "doklad":
        if (lang === "ru") return "Доклад";
        else return "Доповідь";
      case "kontrolnaia":
        if (lang === "ru") return "Контрольная работа";
        else return "Контрольна робота";
      case "kursovaia":
        if (lang === "ru") return "Курсовая работа";
        else return "Курсова робота";
      case "magisterskaia":
        if (lang === "ru") return "Магистерская диссертация";
        else return "Магістерська дисертація";
      case "otchet":
        if (lang === "ru") return "Отчет";
        else return "Звіт";
      case "referat":
        if (lang === "ru") return "Реферат";
        else return "Реферат";
      case "statia":
        if (lang === "ru") return "Статья";
        else return "Стаття";
      case "esse":
        if (lang === "ru") return "Эссе";
        else return "Есе";
      case "drugoe":
        if (lang === "ru") return "Другое";
        else return "Інше";
    }
  }

  function sendmessage(e) {
    let dataform = new FormData();
    e.preventDefault();
    if (message === "" && addDopfiles.length == 0) {
      return false;
    } else {
      dataform.append("orderNumber", selectedOrder.numorder);
      dataform.append("message", message);
      // Добавляем пустое поле addDopfiles, если массив пуст
      if (addDopfiles.length === 0) {
        dataform.append("addDopfiles", "");
      } else {
        // Добавляем каждый элемент массива с ключом вида "addDopfiles[]"
        addDopfiles.forEach((file, index) => {
          dataform.append(`addDopfiles[${index}]`, file);
        });
      }
      for (let key of dataform.keys()) {
        console.log(`${key}: ${dataform.get(key)}`);
      }

      let url = domen + "/users/sendMessageFromAutor.php";
      fetch(url, {
        method: "POST",
        body: dataform,
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          setMessage("");
          setAddDopfiles([]);
        });
    }
  }

  function changStatusIcons(numorder) {
    let url = domen + "/users/changStatusIconsbyAutor.php";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "orderNumber=" + numorder + "&status=" + dispetcher_list,
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error(`Network response was not ok, status: ${data.status}`);
        }
        return data.json();
      })
      .then((data) => {
        dispatch({ type: "SELECTEDORDERNUM", data: "" });
      });
  }

  function statusChange(e) {
    let url = domen + "/users/changeStatusOrder.php";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "status=" + e.target.value + "&orderNumber=" + selectedOrder.numorder,
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error(`Network response was not ok, status: ${data.status}`);
        }
        return data.text();
      })
      .then((data) => {
        console.log(data);
      });
  }

  useEffect(() => {
    const scrollToBottome = () => {
      window.scrollTo(0, document.body.scrollHeight);
    };
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    if (masMessenges.current.length > 4) {
      scrollToBottome();
    } else {
      scrollToTop();
    }
  }, [isInitialLoad.current, masMessenges.current.length]);

  useEffect(() => {
    let url = domen + "/users/getSelectedOrderByDispetcher.php";
    function dataFetch() {
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: "&orderNumber=" + selectedOrderNum,
      })
        .then((data) => {
          if (!data.ok) {
            throw new Error(`Network response was not ok, status: ${data.status}`);
          }
          return data.json();
        })
        .then((data) => {
          if (isInitialLoad.current) {
            isInitialLoad.current = false;
          }
          if (data) {
            if (data.correspondence) {
              masMessenges.current = JSON.parse(data.correspondence);
            }
            console.log(data);
            console.log(isVisiblSelectOrder);
            setSelectedOrder(data);
          }
        });
    }

    if (isVisiblSelectOrder) {
      dataFetch();
      timerIdSelect.current = setInterval(dataFetch, 3000);
    } else {
      clearInterval(timerIdSelect.current);
    }
    return () => {
      clearInterval(timerIdSelect.current);
      timerIdSelect.current = null;
    };
  }, [isVisiblSelectOrder]);

  function getName() {
    let url = domen + "/users/getNameCustomerBySelectedOrder.php";
    if (selectedOrder) {
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: "&usermail=" + selectedOrder.email,
      })
        .then((data) => {
          if (!data.ok) {
            throw new Error(`Network response was not ok, status: ${data.status}`);
          }
          return data.text();
        })
        .then((data) => {
          if (data) {
            setNameCustomerFromSelectedOrder(data);
          }
        });
    }
  }

  return (
    <div>
      {selectedOrder ? (
        <>
          {getName()}
          <div className="orders__list_dispetcher">
            <h4 className="mb-3 selectedOrder d-flex">
              <span
                className="selectedOrder_num"
                onClick={() => {
                  changStatusIcons(selectedOrder.numorder);
                }}
              >
                {"№" + selectedOrder.numorder + " "}
              </span>
              <span
                className="selectedOrder__theme"
                dangerouslySetInnerHTML={{ __html: selectedOrder.theme.replace(/\n/g, "<br />") }}
              />
            </h4>

            <div className="order__switches">
              <div className="order__switch switch1" onClick={() => setSwitchorderinfo(1)}>
                {lang === "ru" ? "Инфо" : "Інфо"}
              </div>
              <div className="order__switch switch2" onClick={() => setSwitchorderinfo(2)}>
                {lang === "ru" ? "Файлы заказчика" : "Файли замовника"}
              </div>
              <div className="order__switch switch3" onClick={() => setSwitchorderinfo(3)}>
                {lang === "ru" ? "Файлы автора" : "Файли автора"}
              </div>
            </div>
            <div
              className={`order__box ${
                switchorderinfo == 1 ? "switch1" : switchorderinfo == 2 ? "switch2" : "switch3"
              }`}
            >
              <ul
                className={`orders__list-secondlvl ${switchorderinfo == 1 ? "d-block" : "d-none"}`}
              >
                <li>
                  {lang === "ru" ? "Тип работы: " : "Тип роботы: "}
                  {selectedOrder === "" ? "" : outputTypeWork(selectedOrder.typework)}
                </li>
                <li>
                  {lang === "ru" ? "Дата подачи заявки: " : "Дата подання заявки: "}
                  {selectedOrder === "" ? "" : selectedOrder.applicationDate}
                </li>
                <li>
                  {lang === "ru" ? "Срок выполнения заказа: " : "Термін виконання замовлення: "}
                  {selectedOrder === "" ? "" : selectedOrder.completionDate}
                </li>
                {/* <li>
                  {lang === "ru" ? "Уникальность: " : "Уникальність: "}
                  {selectedOrder === "" ? "" : selectedOrder.unikalnost}%
                </li> */}
                <li>
                  {lang === "ru"
                    ? "Число страниц/уникальность: "
                    : "Кількість сторінок/уникальність: "}
                  {selectedOrder === "" ? "" : selectedOrder.numstr}/
                  {selectedOrder === "" ? "" : selectedOrder.unikalnost}%
                </li>
                <li className="comentsHidden">
                  <span className="titlesInfo">
                    {lang === "ru" ? "Коментарии: " : "Коментарі: "}
                  </span>
                  <span>{selectedOrder === "" ? "" : getLinkFromText(selectedOrder.koments)}</span>
                </li>
                <li className="d-flex">
                  {lang === "ru" ? "Статус заказа: " : "Статус заказу: "}
                  <select
                    onChange={statusChange}
                    value={selectedOrder.status}
                    className="selectsmall"
                  >
                    <option value="forEvaluation">
                      {lang === "ru" ? "Ожидает оценки" : "Чекає на оцінку"}
                    </option>
                    <option value="waitingPayment">
                      {lang === "ru" ? "Ожидает оплаты" : "Чекає на оплату"}
                    </option>
                    <option value="atWork">{lang === "ru" ? "В работе" : "В роботі"}</option>
                    <option value="onGuarantee">
                      {lang === "ru" ? "На гарантии" : "На гарантії"}
                    </option>
                    <option value="done">{lang === "ru" ? "Выполнено" : "Виконано"}</option>
                  </select>
                </li>
                <li className="d-flex">
                  {lang === "ru" ? "Цена: " : "Ціна: "}
                  <div
                    className={`buttonsBox ${
                      selectedOrder.ordercost && changeOrderCost ? "d-none" : ""
                    }`}
                  >
                    <input
                      type="text"
                      className="inpsmall"
                      onChange={(e) => setOrderCost(e.target.value)}
                      value={orderCost}
                    />
                    <button className="butsmallOk" onClick={changeCost}></button>
                  </div>
                  <div
                    className={`ps-1 buttonsBox ${
                      selectedOrder.ordercost && changeOrderCost ? "" : "d-none"
                    }`}
                  >
                    {selectedOrder.ordercost + " грн"}
                    <button
                      className="butsmallEdit"
                      onClick={() => setChangeOrderCost(false)}
                    ></button>
                  </div>
                  {/* ----------------------------------- */}
                  <span className="ms-2">{lang === "ru" ? "Аванс: " : "Аванс: "}</span>
                  <div
                    className={`buttonsBox ${
                      selectedOrder.orderprepayment && changeOrderPrepayment ? "d-none" : ""
                    }`}
                  >
                    <input
                      type="text"
                      className="inpsmall"
                      onChange={(e) => setOrderPrepayment(e.target.value)}
                      value={orderPrepayment}
                    />
                    <button className="butsmallOk" onClick={changePrepayment}></button>
                  </div>
                  <div
                    className={`ps-1 buttonsBox ${
                      selectedOrder.orderprepayment && changeOrderPrepayment ? "" : "d-none"
                    }`}
                  >
                    {selectedOrder.orderprepayment + " грн"}
                    <button
                      className="butsmallEdit"
                      onClick={() => setChangeOrderPrepayment(false)}
                    ></button>
                  </div>
                </li>
              </ul>
              <div className="twoColumns">
                <ul
                  className={`orders__list-secondlvl ${
                    switchorderinfo == 2 ? "d-block" : "d-none"
                  }`}
                >
                  {showCustomerFiles()}
                </ul>
              </div>
              <div className="twoColumns">
                <ul
                  className={`orders__list-secondlvl ${
                    switchorderinfo == 3 ? "d-block" : "d-none"
                  }`}
                >
                  {showAuthorFiles()}
                </ul>
              </div>
            </div>
          </div>
          <ul className="order__correspondencebox_dispetcher">{showCorrespondence()}</ul>

          <div className="sendMessform">
            <form ref={formForMessage}>
              <div className="sendMessform__window">
                <div className="sendMessform__input">
                  <textarea
                    type="text"
                    name="message"
                    className="sendMessform__input"
                    style={{ height: `${(message.split("\n").length - 1) * 24 + 38}px` }}
                    // rows="1"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    value={message}
                    onKeyDown={handleKeyDown}
                  />
                  <ul className={`sendMessform-list ${addDopfiles.length > 0 ? "" : "d-none"}`}>
                    {addDopfiles.length > 0
                      ? addDopfiles.map((file, index) => <li key={index}>{file.name}</li>)
                      : ""}
                  </ul>
                </div>

                <label htmlFor="getdopfiles" className="getdopfiles">
                  <input
                    id="getdopfiles"
                    type="file"
                    name="addDopfiles[]"
                    className="uploadfile"
                    multiple
                    onChange={(e) => setAddDopfiles(Array.from(e.target.files))}
                  />
                  <div className="sendMessform__butaddfiles">+ </div>
                </label>

                {/* <input
                  type="submit"
                  name="but"
                  value={lang === "ru" ? "Отправить" : "Відправити"}
                  className="sendMessform__send"
                  onClick={sendmessage}
                /> */}
                <button
                  className="sendMessform__send"
                  type="submit"
                  name="but"
                  onClick={sendmessage}
                >
                  {/* <img src={sendIcon} alt="send" className=""/> */}
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <p className="mt-4 ps-3 orders__zagruzka"></p>
      )}
    </div>
  );
}

export default DispetcherSelect;
