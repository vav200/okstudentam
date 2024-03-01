import "./personalarea.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Cookies from "js-cookie";
import CustomerSelect from "./CustomerSelect";
import CustomerList from "./CustomerList";
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
  let main = React.createRef();
  let titleform = React.createRef();
  let domen = useSelector((dat) => dat.domen);
  let selectedOrderNum = useSelector((dat) => dat.selectedOrderNum);

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
      if (!addfiles) {
        // Устанавливаем значение для ключа "addfiles[]" в пустой массив
        dataform.set("addfiles[]", []);
      }

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
            // reloadOrders();
          }}
        />
      </div>

      {/* ------------------------------------------------------- */}

      <h6 className="mt-3 mb-3 text-end" ref={titleform}>
        {lang === "ru" ? "Личный кабинет, заказчик - " : "Особистий кабінет, замовник - "}
        {username}
      </h6>

      <div className={`blocklogobut ${selectedOrderNum === "" ? "d-block" : "d-none"}`}>
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

      {/* ---------- Список заказов -------------- */}

      {selectedOrderNum === "" && !orderform && <CustomerList />}

      {/* -------------------------------------- */}

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
              placeholder={lang === "ru" ? "краткое название темы" : "коротка назва теми"}
              maxLength={125}
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
              maxLength={50}
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
              placeholder={
                lang === "ru"
                  ? "здесь Вы можете прописать все чего нет в форме заказа: иную систему проверки, нужный вам шрифт и интервалы, указать личные пожелания или особые требования"
                  : "тут Ви можете прописати все, чого немає у формі замовлення: іншу систему перевірки, потрібний вам шрифт та інтервали, вказати особисті побажання або особливі вимоги"
              }
              maxLength={400}
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

      {selectedOrderNum !== "" && <CustomerSelect />}

      {/* --------------------------------------- */}
    </main>
  );
}

export default CustomerArea;
