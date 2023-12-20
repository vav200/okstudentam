import "./personal_area.css";
import { Slide, Zoom, Fade } from "react-awesome-reveal";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

function Dicpetcher_area() {
  let dispatch = useDispatch();
  let username = useSelector((dat) => dat.username);
  let dispetcher_list = useSelector((dat) => dat.dispetcher_list);
  let lang = useSelector((dat) => dat.language);
  let formForMessage = React.createRef();
  let main = React.createRef();

  const [orders, setOrders] = useState();
  const [selectedOrderName, setSelectedOrderName] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [addDopfiles, setAddDopfiles] = useState("");
  const [switchorderinfo, setSwitchorderinfo] = useState(true);
  const [message, setMessage] = useState("");
  const [stateSendMessage, setStateSendMessage] = useState(1);

  function selectedOrderInfo(ordertheme) {
    setSelectedOrder(orders.find((item) => item.theme == ordertheme));
  }

  function outputOrderStatus(status) {
    switch (status) {
      case "forEvaluation":
        if (lang === "ru") return "Ожидает оценки";
        else return "Чекає на оцінку";
      case "atWork":
        if (lang === "ru") return "В работе";
        else return "В роботі";
      case "done":
        if (lang === "ru") return "Выполнено";
        else return "Виконано";
    }
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

  function showCustomerFiles() {
    let updateselectedOrder = "";
    if (selectedOrderName !== "") {
      updateselectedOrder = orders.find((item) => item.theme == selectedOrderName);
    }
    if (updateselectedOrder.customerFiles) {
      let customerFilesObject = JSON.parse(updateselectedOrder.customerFiles);
      return Object.entries(customerFilesObject).map(([filename, fileData]) => {
        return (
          <li className="list-interval" key={filename}>
            <a
              className="order__link"
              href={`http://okstudentam.ua/users/${fileData.path}`}
              download
              target="_blank"
            >
              {filename}
            </a>
            <p className="p-0 m-0">{fileData.dataTime}</p>
          </li>
        );
      });
    } else return <p>Нет приложенных файлов</p>;
  }

  function showAuthorFiles() {
    let updateselectedOrder = "";
    if (selectedOrderName !== "") {
      updateselectedOrder = orders.find((item) => item.theme == selectedOrderName);
    }

    if (updateselectedOrder.authorFiles) {
      let authorFilesObject = JSON.parse(updateselectedOrder.authorFiles);
      return Object.entries(authorFilesObject).map(([filename, fileData]) => {
        return (
          <li className="list-interval" key={filename}>
            <a
              className="order__link"
              href={`http://okstudentam.ua/users/${fileData.path}`}
              download
              target="_blank"
            >
              {filename}
            </a>
            <p className="p-0 m-0">{fileData.dataTime}</p>
          </li>
        );
      });
    } else return <p>Нет приложенных файлов</p>;
  }

  function showCorrespondence() {
    let updateselectedOrder = "";
    if (selectedOrderName !== "") {
      updateselectedOrder = orders.find((item) => item.theme == selectedOrderName);
    }
    if (updateselectedOrder.correspondence) {
      let correspondenceObject = JSON.parse(updateselectedOrder.correspondence);
      console.log(correspondenceObject);

      return correspondenceObject.map((item) => {
        return (
          <li className={item.status === "customer" ? "message__customer" : "message__author"}>
            {" "}
            {item.text}
            <p className="message__datatime">{item.date}</p>
          </li>
        );
      });
    } else return "";
  }

  function sendmessage(e) {
    let dataform = new FormData(formForMessage.current);
    e.preventDefault();
    if (message === "" && addDopfiles === "") {
      return false;
    } else {
      dataform.append("orderNumber", selectedOrder.numorder);
      for (let key of dataform.keys()) {
        console.log(`${key}: ${dataform.get(key)}`);
      }
      disableBodyScroll(main.current);
      fetch("http://okstudentam.ua/users/sendMessageOnAutor.php", {
        method: "POST",
        body: dataform,
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          setMessage("");
          setAddDopfiles("");
          setStateSendMessage((x) => x++);
        });
    }
  }

  function statusChange(e) {
    fetch("http://okstudentam.ua/users/changeStatusOrder.php", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "&status=" + e.target.value + "&orderNumber=" + orders.numorder,
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error(`Network response was not ok, status: ${data.status}`);
        }
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setStateSendMessage((x) => x++);
      });
  }

  useEffect(() => {
    setSelectedOrderName("");
  }, [dispetcher_list]);

  useEffect(() => {
    // setOrders("");
    fetch("http://okstudentam.ua/users/getAllOrders.php", {
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
        console.log(data, selectedOrderName);
        if (data) {
          setOrders(data);
          showAuthorFiles();
        }
      });
  }, [dispetcher_list, stateSendMessage]);

  return (
    <main className="persarea" ref={main}>
      <h6 className="mt-3 mb-3 text-end">
        {lang === "ru" ? "Кабинет диспетчера - " : "Кабінет диспетчера - "}
        {username}
      </h6>
      <div className={selectedOrderName === "" ? "d-block" : "d-none"}>
        {orders ? (
          <ul className={`orders__list`}>
            {orders.map((item) => (
              <li className="orders__item">
                <div
                  className="orders__box"
                  onClick={() => {
                    setSelectedOrderName(item.theme);
                    selectedOrderInfo(item.theme);
                  }}
                >
                  {item.theme}
                </div>
                <ul className="orders__list-secondlvl">
                  <li>
                    {lang === "ru" ? "Статус заказа: " : "Статус заказу: "}
                    {outputOrderStatus(item.status)}
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 ps-3">Загрузка данных...</p>
        )}
      </div>

      {/* ------------Выбранный заказ------------ */}

      <div className={selectedOrderName === "" ? "d-none" : "d-block"}>
        <div className="orders__list">
          <h4 className="mb-3 selectedOrder" onClick={() => setSelectedOrderName("")}>
            {selectedOrderName}
          </h4>

          <div className="order__switches">
            <div className="order__switch switch1" onClick={() => setSwitchorderinfo(1)}>
              Инфо
            </div>
            <div className="order__switch switch2" onClick={() => setSwitchorderinfo(2)}>
              Мои файлы
            </div>
            <div className="order__switch switch3" onClick={() => setSwitchorderinfo(3)}>
              Файлы автора
            </div>
          </div>
          <div
            className={`order__box ${
              switchorderinfo == 1 ? "switch1" : switchorderinfo == 2 ? "switch2" : "switch3"
            }`}
          >
            <ul className={`orders__list-secondlvl ${switchorderinfo == 1 ? "d-block" : "d-none"}`}>
              <li>
                {lang === "ru" ? "Тип работы:" : "Тип роботы:"}{" "}
                {selectedOrder === "" ? "" : outputTypeWork(selectedOrder.typework)}
              </li>
              <li>
                {lang === "ru" ? "Дата подачи заявки:" : "Дата подання заявки:"}{" "}
                {selectedOrder === "" ? "" : selectedOrder.applicationDate}
              </li>
              <li>
                {lang === "ru" ? "Срок выполнения заказа:" : "Термін виконання замовлення:"}{" "}
                {selectedOrder === "" ? "" : selectedOrder.completionDate}
              </li>
              <li>
                {lang === "ru" ? "Уникальность:" : "Уникальність:"}{" "}
                {selectedOrder === "" ? "" : selectedOrder.unikalnost}%
              </li>
              <li>
                {lang === "ru" ? "Число страниц:" : "Кількість сторінок:"}{" "}
                {selectedOrder === "" ? "" : selectedOrder.numstr}
              </li>
              <li>
                {lang === "ru" ? "Коментарии:" : "Коментарі:"}{" "}
                {selectedOrder === "" ? "" : selectedOrder.koments}
              </li>
              <li>
                {lang === "ru" ? "Статус заказа: " : "Статус заказу: "}
                {/* {outputOrderStatus(selectedOrder.status)} */}
                <select onChange={statusChange} value={selectedOrder.status}>
                  <option value="forEvaluation">Ожидает оценки</option>
                  <option value="atWork">В работе</option>
                  <option value="done">Выполнено</option>
                </select>
              </li>
            </ul>
            <ul className={`orders__list-secondlvl ${switchorderinfo == 2 ? "d-block" : "d-none"}`}>
              {showCustomerFiles()}
            </ul>
            <ul className={`orders__list-secondlvl ${switchorderinfo == 3 ? "d-block" : "d-none"}`}>
              {showAuthorFiles()}
            </ul>
          </div>
        </div>
        <ul className="order__correspondencebox">{showCorrespondence()}</ul>
        <form ref={formForMessage}>
          <div className="blockform">
            <label>
              <div className="labelsecondform"></div>
            </label>
            <textarea
              type="text"
              name="message"
              className="inpsecondform"
              rows="1"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
          </div>
          <div className="order__chatbut">
            <label htmlFor="getdopfiles" className="getdopfiles">
              <input
                id="getdopfiles"
                type="file"
                name="addDopfiles[]"
                className="uploadfile"
                multiple
                onChange={(e) => setAddDopfiles(Array.from(e.target.files))}
              />
              <div className="but_gray">Добавить файлы</div>
            </label>
          </div>

          <div className="order__chatbut">
            <input
              type="submit"
              name="but"
              value="Отправить"
              className="but order__but"
              onClick={sendmessage}
            />
          </div>
          <ul className="orders__files-list">
            {addDopfiles ? addDopfiles.map((file, index) => <li key={index}>{file.name}</li>) : ""}
          </ul>
        </form>
      </div>

      {/* --------------------------------------- */}
    </main>
  );
}

export default Dicpetcher_area;
