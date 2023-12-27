import "./personalarea.css";
import { Slide, Zoom, Fade } from "react-awesome-reveal";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru"; // Импорт русской локализации
registerLocale("ru", ru); // Регистрация русской локализации
// import uk from "date-fns/locale/uk"; // Импорт украинской локализации
// registerLocale("uk", uk); // Регистрация украинской локализации

function CustomerArea() {
  let username = useSelector((dat) => dat.username);
  let usermail = useSelector((dat) => dat.usermail);
  let userstate = useSelector((dat) => dat.userstate);
  let dispetcher_list = useSelector((dat) => dat.dispetcher_list);

  let dispatch = useDispatch();
  let lang = useSelector((dat) => dat.language);
  let formForOrder = React.createRef();
  let formForMessage = React.createRef();
  let main = React.createRef();
  let titleform = React.createRef();
  let domen = useSelector((dat) => dat.domen);

  const [selectedDate, setSelectedDate] = useState(null);
  const [orderform, setOrderform] = useState(false);
  const [theme, setTheme] = useState("");
  const [subject, setSubject] = useState("");
  const [typework, setTypework] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [unikalnost, setUnikalnost] = useState("");
  const [numstr, setNumstr] = useState("");
  const [koments, setKoments] = useState("");
  const [addfiles, setAddfiles] = useState("");
  const [errormes, setErrormes] = useState("");
  const [execstate, setExecstate] = useState(false);
  const [userorders, setUserorders] = useState();
  const [selectedOrderName, setSelectedOrderName] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [message, setMessage] = useState("");
  const [addDopfiles, setAddDopfiles] = useState([]);
  const [switchorderinfo, setSwitchorderinfo] = useState(true);
  const [stateSendMessage, setStateSendMessage] = useState(1);

  function sendorder(e) {
    let dataform = new FormData(formForOrder.current);
    e.preventDefault();
    if (
      theme === "" ||
      theme === "err" ||
      subject === "" ||
      subject === "err" ||
      typework === "" ||
      typework === "err" ||
      dateTime === "" ||
      dateTime === "err" ||
      unikalnost === "" ||
      unikalnost === "err" ||
      numstr === "" ||
      numstr === "err"
    ) {
      titleform.current.scrollIntoView({ behavior: "smooth" });

      if (theme === "" || theme === "err") setTheme("err");
      if (subject === "" || subject === "err") setSubject("err");
      if (typework === "" || typework === "err") setTypework("err");
      if (dateTime === "" || dateTime === "err") setDateTime("err");
      if (unikalnost === "" || unikalnost === "err") setUnikalnost("err");
      if (numstr === "" || numstr === "err") setNumstr("err");
    } else {
      dataform.append("email", usermail);
      for (let key of dataform.keys()) {
        console.log(`${key}: ${dataform.get(key)}`);
      }
      disableBodyScroll(main.current);
      let url = domen + "/users/sendOrder.php";
      fetch(url, {
        method: "POST",
        body: dataform,
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          if (data) {
            setErrormes("Ваш заказ успешно отправлен в проработку");
            setExecstate((x) => !x);
          } else {
            setErrormes("Ошибка отправки! Обратитесь к администрации сервиса");
            setExecstate((x) => !x);
          }
          setStateSendMessage((x) => x + 1);
          setTheme("");
          setSubject("");
          setTypework("");
          setDateTime("");
          setUnikalnost("");
          setKoments("");
          setAddfiles("");
          setNumstr("");
        });
    }
  }

  function validNum(e) {
    const regEx = /[^\d]/g;
    let inp = e.target.value.replace(regEx, "");
    e.target.value = inp;
  }

  function reloadOrders() {
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
        if (data) {
          setUserorders(data);
        }
      });
  }

  function changStatusIcons(numorder) {
    let url = domen + "/users/changStatusIconsbyCustomer.php";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "&orderNumber=" + numorder,
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error(`Network response was not ok, status: ${data.status}`);
        }
        return data.text();
      })
      .then((data) => {
        if (data) {
          reloadOrders();
        }
      });
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

  function sendmessage(e) {
    let dataform = new FormData();
    e.preventDefault();
    if (message === "" && addDopfiles === "") {
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
      let url = domen + "/users/sendMessageFromCustomer.php";
      fetch(url, {
        method: "POST",
        body: dataform,
      })
        .then((data) => data.text())
        .then((data) => {
          setMessage("");
          setAddDopfiles([]);
          setStateSendMessage((x) => x + 1);
        });
    }
  }

  function showCustomerFiles() {
    let updateselectedOrder = "";
    if (selectedOrderName !== "") {
      updateselectedOrder = userorders.find((item) => item.theme == selectedOrderName);
    }
    if (updateselectedOrder.customerFiles) {
      let customerFilesObject = JSON.parse(updateselectedOrder.customerFiles);
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
    let updateselectedOrder = "";
    if (selectedOrderName !== "") {
      updateselectedOrder = userorders.find((item) => item.theme == selectedOrderName);
    }
    if (updateselectedOrder.authorFiles) {
      let authorFilesObject = JSON.parse(updateselectedOrder.authorFiles);
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
    } else return <p>{lang === "ru" ? "Нет приложенных файлов" : "Немає доданих файлів"}</p>;
  }

  function showCorrespondence() {
    let updateselectedOrder = "";
    if (selectedOrderName !== "") {
      updateselectedOrder = userorders.find((item) => item.theme == selectedOrderName);
    }
    if (updateselectedOrder.correspondence) {
      let correspondenceObject = JSON.parse(updateselectedOrder.correspondence);
      // console.log(correspondenceObject);
      return correspondenceObject.map((item, ind) => {
        return (
          <li
            className={item.status === "customer" ? "message__customer" : "message__author"}
            key={"corr" + ind}
          >
            {item.text}
            <p className="message__datatime">{item.date}</p>
          </li>
        );
      });
    } else return "";
  }

  function selectedOrderInfo(ordertheme) {
    setSelectedOrder(userorders.find((item) => item.theme == ordertheme));
  }

  useEffect(() => {
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
        if (data) {
          setUserorders(data);
          showCustomerFiles();
          // Установка куки для каждого параметра входа
          Cookies.set("usermail", usermail);
          Cookies.set("username", username);
          Cookies.set("userstate", userstate);
          let dispetcherListValue = dispetcher_list ? dispetcher_list : "forEvaluation";
          Cookies.set("dispetcher_list", dispetcherListValue);
          dispatch({ type: "SETDISPETCHERLIST", data: dispetcherListValue });
        }
      });
  }, [stateSendMessage]);

  return (
    <main className="persarea" ref={main}>
      {/* -------------Блок обработки ошибок-------------- */}

      <div className={`messok__backfon ${execstate ? "messok__backfon_active" : ""}`}></div>
      <div
        className={`messok text-center ${execstate ? "messok_active" : ""} ${
          errormes === "Ваш заказ успешно отправлен в проработку"
            ? "messok__color_ok"
            : "messok__color_err"
        }`}
      >
        {errormes}
        <input
          type="submit"
          value="ОK"
          className={`messok__but ${
            errormes === "Ваш заказ успешно отправлен в проработку"
              ? "messok__but_ok"
              : "messok__but_err"
          }`}
          onClick={() => {
            setExecstate((x) => !x);
            enableBodyScroll(main.current);
            setOrderform((x) => !x);
            reloadOrders();
          }}
        />
      </div>

      {/* ------------------------------------------------------- */}

      <h6 className="mt-3 mb-3 text-end" ref={titleform}>
        {lang === "ru" ? "Личный кабинет, заказчик - " : "Особистий кабінет, замовник - "}
        {username}
      </h6>
      <div className={`blocklogobut ${selectedOrderName === "" ? "d-block" : "d-none"}`}>
        <div
          className={` ${orderform ? "but but_orange" : "but order__but"}`}
          onClick={() => {
            setOrderform((x) => !x);
            dispatch({ type: "orderperehod", data: "1" });
            setAddfiles("");
          }}
        >
          {orderform
            ? lang === "ru"
              ? "Отменить заказ"
              : "Скасувати замовлення"
            : lang === "ru"
            ? "Заказать работу"
            : "Замовити роботу"}
        </div>
      </div>

      <div className={selectedOrderName === "" ? "d-block" : "d-none"}>
        {userorders ? (
          userorders === "notdata" ? (
            <p className="mt-4 ps-3 fs-2">
              {lang === "ru" ? "Нет данных для отображения" : "Немає даних для відображення"}
            </p>
          ) : (
            <ul className={`orders__list ${orderform ? "d-none" : "d-block"}`}>
              {userorders.map((item) => (
                <li className="orders__item" key={item.numorder}>
                  <div
                    className="orders__box"
                    onClick={() => {
                      setSelectedOrderName(item.theme);
                      selectedOrderInfo(item.theme);
                      changStatusIcons(item.numorder);
                    }}
                  >
                    <span className="orders__box_num">{"№" + item.numorder + " "}</span>
                    {item.theme}
                    <span
                      className={`selectedOrder_newmess ${
                        item.newMessAutor === "false" ? "d-none" : ""
                      }`}
                    ></span>
                    <span
                      className={`selectedOrder_newfile ${
                        item.newFileAutor === "false" ? "d-none" : ""
                      }`}
                    ></span>
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
          )
        ) : (
          <p className="mt-4 ps-3">{lang === "ru" ? "Загрузка данных" : "Завантаження даних"}...</p>
        )}
      </div>

      {/* ---------- форма заказа-------------- */}

      <div className={`orderform ${orderform ? "d-block" : "d-none"}`}>
        <form ref={formForOrder}>
          <div className="blockform">
            <label htmlFor="fulltheme">
              <div className={`labelsecondform ${theme === "err" ? "labelerror" : ""}`}>
                * {lang === "ru" ? "Тема работы:" : "Тема роботи:"}
              </div>
            </label>
            <textarea
              name="theme"
              className={`inpsecondform ${theme === "err" ? "inpsecondform_error" : ""}`}
              rows="3"
              onChange={(e) => {
                setTheme(e.target.value);
                setErrormes("");
              }}
              value={theme === "err" ? "" : theme}
            />
          </div>
          <div className="blockform">
            <label>
              <div className={`labelsecondform ${subject === "err" ? "labelerror" : ""}`}>
                * Предмет:
              </div>
            </label>
            <textarea
              type="text"
              name="subject"
              className={`inpsecondform ${subject === "err" ? "inpsecondform_error" : ""}`}
              rows="2"
              onChange={(e) => {
                setSubject(e.target.value);
                setErrormes("");
              }}
              value={subject === "err" ? "" : subject}
              placeholder={
                lang === "ru"
                  ? "педагогика, психология, менеджмент, экономика и т.д."
                  : "педагогіка, психологія, менеджмент, економіка і т.д."
              }
            />
          </div>
          <div className="blockform">
            <label>
              <div className={`labelsecondform ${typework === "err" ? "labelerror" : ""}`}>
                * {lang === "ru" ? "Тип работы:" : "Тип роботи:"}
              </div>
            </label>
            <select
              name="typework"
              className={`inpsecondform212 ${typework === "err" ? "inpsecondform_error" : ""}`}
              onChange={(e) => {
                setTypework(e.target.value);
                setErrormes("");
              }}
              value={typework === "err" ? "" : typework}
            >
              <option value=""> </option>
              <option value="diplomnaia">
                {lang === "ru" ? "Дипломная работа" : "Дипломна робота"}
              </option>
              <option value="doklad">{lang === "ru" ? "Доклад" : "Доповідь"}</option>
              <option value="kontrolnaia">
                {lang === "ru" ? "Контрольная работа" : "Контрольна робота"}
              </option>
              <option value="kursovaia">
                {lang === "ru" ? "Курсовая работа" : "Курсова робота"}
              </option>
              <option value="magisterskaia">
                {lang === "ru" ? "Магистерская диссертация" : "Магістерська дисертація"}
              </option>
              <option value="otchet">{lang === "ru" ? "Отчет" : "Звіт"}</option>
              <option value="referat">{lang === "ru" ? "Реферат" : "Реферат"}</option>
              <option value="statia">{lang === "ru" ? "Статья" : "Стаття"}</option>
              <option value="esse">{lang === "ru" ? "Эссе" : "Есе"}</option>
              <option value="drugoe">{lang === "ru" ? "Другое" : "Інше"}</option>
            </select>
            {/* <textarea
              type="text"
              name="typework"
              className={`inpsecondform ${typework === "err" ? "inpsecondform_error" : ""}`}
              rows="2"
              onChange={(e) => {
                setTypework(e.target.value);
                setErrormes("");
              }}
              value={typework === "err" ? "" : typework}
              placeholder="диплом, курсовая, реферат, эссе, доклад, презентация и т.д."
            /> */}
          </div>
          <div className="blockform">
            <label>
              <div className={`labelsecondform ${dateTime === "err" ? "labelerror" : ""}`}>
                * {lang === "ru" ? "Срок сдачи:" : "Строк здачі:"}
              </div>
            </label>
            <div>
              <DatePicker
                name="dateTime"
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setDateTime(date);
                  setErrormes("");
                }}
                locale="ru" // Установка локализации
                className={`inpsecondform ${dateTime === "err" ? "inpsecondform_error" : ""}`}
                dateFormat="dd/MM/yyyy"
                // timeInputLabel="Time:"
                // showTimeInput
                // timeInput={customTimeInput}
                // dateFormat="dd/MM/yyyy HH:mm"
                value={dateTime === "err" ? "" : dateTime}
                placeholderText={lang === "ru" ? "дата/месяц/год" : "дата/місяць/рік"}
              />
            </div>
          </div>
          <div className="blockform">
            <label>
              <div className={`labelsecondform ${unikalnost === "err" ? "labelerror" : ""}`}>
                * {lang === "ru" ? "Уникальность" : "Уникальність"}, %:
              </div>
            </label>
            <textarea
              type="text"
              name="unikalnost"
              className={`inpsecondform ${unikalnost === "err" ? "inpsecondform_error" : ""}  `}
              rows="1"
              onChange={(e) => {
                validNum(e);
                setUnikalnost(e.target.value);
                setErrormes("");
              }}
              value={unikalnost === "err" ? "" : unikalnost}
              placeholder={
                lang === "ru"
                  ? "по умолчанию AntiPlagiarism.NET"
                  : "за промовчанням AntiPlagiarism.NET"
              }
            />
          </div>
          <div className="blockform">
            <label>
              <div className={`labelsecondform ${numstr === "err" ? "labelerror" : ""}`}>
                * {lang === "ru" ? "Количество страниц:" : "Кількість сторінок:"}
              </div>
            </label>
            <textarea
              type="text"
              name="numstr"
              className={`inpsecondform ${numstr === "err" ? "inpsecondform_error" : ""}  `}
              rows="1"
              onChange={(e) => {
                validNum(e);
                setNumstr(e.target.value);
                setErrormes("");
              }}
              value={numstr === "err" ? "" : numstr}
              placeholder={
                lang === "ru"
                  ? "по умолчанию шрифт Times New Roman, размер 14 интервал, 1.5"
                  : "за промовчанням шрифт Times New Roman, розмір 14 інтервал, 1.5"
              }
            />
          </div>
          <div className="blockform">
            <label>
              <div className="labelsecondform">
                {lang === "ru" ? "Комментарии к заказу:" : "Коментарі до замовлення:"}
              </div>
            </label>
            <textarea
              type="text"
              name="koments"
              className="inpsecondform"
              rows="5"
              onChange={(e) => {
                setKoments(e.target.value);
              }}
              value={koments}
            />
          </div>
          <div className="blockform">
            <label htmlFor="getfiles" className="getfiles">
              <input
                id="getfiles"
                type="file"
                name="addfiles[]"
                className="uploadfile"
                multiple
                onChange={(e) => setAddfiles(Array.from(e.target.files))}
              />
              <div className="but_gray">
                {lang === "ru" ? "Файлы к заказу" : "Файли до замовлення"}
              </div>
            </label>
            <ul className="orders__files-list">
              {addfiles ? addfiles.map((file, index) => <li key={index}>{file.name}</li>) : ""}
            </ul>
          </div>

          <label className="primechanie">
            * -
            {lang === "ru" ? "поля обязательные для заполнения" : "поля обов'язкові для заповнення"}
          </label>

          <div className="blockbut">
            <input
              type="submit"
              name="but"
              value={lang === "ru" ? "Заказать" : "Замовити"}
              className="but order__but"
              onClick={sendorder}
            />
          </div>
        </form>
      </div>

      {/* -------------------------------------- */}

      {/* ------------Выбранный заказ------------ */}

      <div className={selectedOrderName === "" ? "d-none" : "d-block"}>
        <div className="orders__list">
          <h4
            className="mb-3 selectedOrder"
            onClick={() => {
              setSelectedOrderName("");
            }}
          >
            <span className="selectedOrder_num">{"№" + selectedOrder.numorder + " "}</span>
            {selectedOrderName}
          </h4>

          <div className="order__switches">
            <div className="order__switch switch1" onClick={() => setSwitchorderinfo(1)}>
              {lang === "ru" ? "Инфо" : "Інфо"}
            </div>
            <div className="order__switch switch2" onClick={() => setSwitchorderinfo(2)}>
              {lang === "ru" ? "Мои файлы" : "Мої файли"}
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
            <ul className={`orders__list-secondlvl ${switchorderinfo == 1 ? "d-block" : "d-none"}`}>
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
              <li>
                {lang === "ru" ? "Уникальность: " : "Уникальність: "}
                {selectedOrder === "" ? "" : selectedOrder.unikalnost}%
              </li>
              <li>
                {lang === "ru" ? "Число страниц: " : "Кількість сторінок: "}
                {selectedOrder === "" ? "" : selectedOrder.numstr}
              </li>
              <li>
                {lang === "ru" ? "Коментарии: " : "Коментарі: "}
                {selectedOrder === "" ? "" : selectedOrder.koments}
              </li>
              <li>
                {lang === "ru" ? "Статус заказа: " : "Статус заказу: "}
                {outputOrderStatus(selectedOrder.status)}
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
              <div className="but_gray">{lang === "ru" ? "Добавить файлы" : "Додати файли"}</div>
            </label>
          </div>

          <div className="order__chatbut">
            <input
              type="submit"
              name="but"
              value={lang === "ru" ? "Отправить" : "Відправити"}
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

export default CustomerArea;
