import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function HeaderDispetcher() {
  let nav = useNavigate();
  let dispatch = useDispatch();
  // let statenow = useSelector((dat) => dat);
  let domen = useSelector((dat) => dat.domen);
  let lang = useSelector((dat) => dat.language);
  let usermail = useSelector((dat) => dat.usermail);
  let mesAboutNewMessageInChat = useSelector((dat) => dat.mesAboutNewMessageInChat);
  let mesAboutNewOrder = useSelector((dat) => dat.mesAboutNewOrder);
  let dispetcher_list = useSelector((dat) => dat.dispetcher_list);
  // console.log("HeaderDispetcher", statenow);

  const [burgstate, setBurgstate] = useState(false);
  const [visibleSettings, setVisibleSettings] = useState(false);
  const [dataRegUsers, setDataRegUsers] = useState("");
  let main = React.createRef();
  let formForSettings = useRef();
  let settingsBlock = useRef();
  let settingsBut = useRef();

  function sendSettings() {
    let dataform = new FormData();
    dataform.append("email", usermail);
    dataform.append("mesAboutNewOrder", mesAboutNewOrder);
    dataform.append("mesAboutNewMessageInChat", mesAboutNewMessageInChat);
    dataform.append("userLanguage", lang);
    let url = domen + "/users/sendSettings.php";
    fetch(url, {
      method: "POST",
      body: dataform,
    });
  }

  function userOut() {
    document.title = "OKstudentam";
    dispatch({
      type: "USERDATA",
      data: { username: "", userstate: "", usermail: "" },
    });
    dispatch({
      type: "SELECTEDORDERNUM",
      data: "",
    });
    dispatch({ type: "SETDISPETCHERLIST", data: "" });
    // Удаление куки для каждого параметра входа
    Cookies.remove("usermail");
    Cookies.remove("username");
    Cookies.remove("userstate");
    Cookies.remove("dispetcher_list");

    let url = domen + "/users/userOut.php";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "&usermail=" + usermail,
    });
  }

  function getNumberRegisteredUsers() {
    let url = domen + "/users/getNumberRegisteredUsers.php";
    fetch(url, {
      method: "GET",
    })
      .then((dat) => dat.json())
      .then((dat) => {
        // console.log("число пользователей", dat.numRegUsers);
        setDataRegUsers(dat);
      });
  }

  function hideSettingsBlock(e) {
    if (
      settingsBlock.current &&
      !settingsBlock.current.contains(e.target) &&
      !settingsBut.current.contains(e.target)
    ) {
      // Клик вне окна, закрыть его
      setVisibleSettings(false);
    }
  }

  useEffect(() => {
    enableBodyScroll(main.current);
    getNumberRegisteredUsers();
    // Добавить обработчик события при монтировании компонента
    document.addEventListener("mousedown", hideSettingsBlock);

    // Удалить обработчик события при размонтировании компонента
    return () => {
      document.removeEventListener("mousedown", hideSettingsBlock);
    };
  }, []);

  return (
    <header className="headerDipetcher position-relative" ref={main}>
      <div className={`burg__backfon ${burgstate ? "burg__backfon_active" : ""}`}></div>
      <nav className="header__nav">
        <div className="header__nav-wrap">
          {/* <div className="header__nav-firstlvl">
            <div className="header__nav-firstlvl-block1">
              <div
                className={`burg ${burgstate ? "burg_active" : ""}`}
                onClick={() => {
                  setBurgstate((x) => !x);
                  disableBodyScroll(main.current);
                }}
              >
                <div className="burg__line burg__line_first"></div>
                <div className="burg__line burg__line_second"></div>
                <div className="burg__line burg__line_third"></div>
                <div className="burg__line burg__line_fourth"></div>
              </div>
             
            </div>
          </div> */}

          <div className={`header__navDispetcher`}>
            <div
              className={`burg ${burgstate ? "burg_active" : ""}`}
              onClick={() => {
                setBurgstate((x) => !x);
                disableBodyScroll(main.current);
              }}
            >
              <div className="burg__line burg__line_first"></div>
              <div className="burg__line burg__line_second"></div>
              <div className="burg__line burg__line_third"></div>
              <div className="burg__line burg__line_fourth"></div>
            </div>
            <ul className="header__menu">
              <li
                className={`menu__item menu__link_dispetcher ${
                  dispetcher_list === "forEvaluation" ? "menu__link_active" : ""
                }`}
                onClick={() => {
                  dispatch({ type: "SELECTEDORDERNUM", data: "" });
                  dispatch({ type: "SETDISPETCHERLIST", data: "forEvaluation" });
                  nav("/personalarea");
                }}
              >
                {lang === "ru" ? "Аукцион" : "Аукціон"}
              </li>
              <li
                className={`menu__item menu__link_dispetcher ${
                  dispetcher_list === "waitingPayment" ? "menu__link_active" : ""
                }`}
                onClick={() => {
                  dispatch({ type: "SELECTEDORDERNUM", data: "" });
                  dispatch({ type: "SETDISPETCHERLIST", data: "waitingPayment" });
                  nav("/personalarea");
                }}
              >
                {lang === "ru" ? "Ожидают оплаты" : "Чекають на оплату"}
              </li>
              <li
                className={`menu__item menu__link_dispetcher ${
                  dispetcher_list === "atWork" ? "menu__link_active" : ""
                }`}
                onClick={() => {
                  dispatch({ type: "SELECTEDORDERNUM", data: "" });
                  dispatch({ type: "SETDISPETCHERLIST", data: "atWork" });
                  nav("/personalarea");
                }}
              >
                {lang === "ru" ? "В работе" : "В роботі"}
              </li>
              <li
                className={`menu__item menu__link_dispetcher ${
                  dispetcher_list === "onGuarantee" ? "menu__link_active" : ""
                }`}
                onClick={() => {
                  dispatch({ type: "SELECTEDORDERNUM", data: "" });
                  dispatch({ type: "SETDISPETCHERLIST", data: "onGuarantee" });
                  nav("/personalarea");
                }}
              >
                {lang === "ru" ? "На гарантии" : "На гарантії"}
              </li>
              <li
                className={`menu__item menu__link_dispetcher ${
                  dispetcher_list === "done" ? "menu__link_active" : ""
                }`}
                onClick={() => {
                  dispatch({ type: "SELECTEDORDERNUM", data: "" });
                  dispatch({ type: "SETDISPETCHERLIST", data: "done" });
                  nav("/personalarea");
                }}
              >
                {lang === "ru" ? "Выполненные" : "Виконані"}
              </li>
            </ul>
            <div className="langpanel">
              <div
                className={`finishedWorks ${
                  dispetcher_list === "finishedWorks" ? "finishedWorks_active" : ""
                }`}
                onClick={() => {
                  // dispatch({ type: "FINISHEDWORKS", data: "on" });
                  dispatch({ type: "SETDISPETCHERLIST", data: "finishedWorks" });
                  nav("/personalarea/finishedWorks");
                }}
              ></div>

              <div
                ref={settingsBut}
                className={`settings ${visibleSettings ? "settings_active" : ""}`}
                onClick={() => {
                  setVisibleSettings((x) => !x);
                  sendSettings();
                }}
              ></div>

              <div
                className="userexit"
                onClick={() => {
                  nav("/");
                  userOut();
                }}
              ></div>
            </div>
          </div>

          {/* --------------settings------------------ */}
          <div
            className={visibleSettings ? "settingsPanel" : "settingsPanelHide"}
            ref={settingsBlock}
          >
            <form ref={formForSettings}>
              <ul className="settingsPanel__list">
                <li className="settingsPanel__list-item">
                  <label>
                    <input
                      type="checkbox"
                      name="mesAboutNewOrder"
                      onChange={() => {
                        mesAboutNewOrder === "off"
                          ? dispatch({ type: "SETMESABOUTNEWORDER", data: "on" })
                          : dispatch({ type: "SETMESABOUTNEWORDER", data: "off" });
                      }}
                      checked={mesAboutNewOrder === "on"}
                    />
                    <span className="settingsPanel__item-name">
                      {lang === "ru"
                        ? "- получать на почту сообщения о новых заказах"
                        : "- отримувати на пошту повідомлення про нові замовлення"}
                    </span>
                  </label>
                </li>
                <li className="settingsPanel__list-item">
                  <label>
                    <input
                      type="checkbox"
                      name="mesAboutNewMessageInChat"
                      onChange={() => {
                        mesAboutNewMessageInChat === "off"
                          ? dispatch({ type: "SETMESABOUTNEWMES", data: "on" })
                          : dispatch({ type: "SETMESABOUTNEWMES", data: "off" });
                      }}
                      checked={mesAboutNewMessageInChat === "on"}
                    />
                    <span className="settingsPanel__item-name">
                      {lang === "ru"
                        ? "- получать на почту сообщения о новых сообщениях в чате"
                        : "- отримувати на пошту повідомлення про нові повідомлення в чаті"}
                    </span>
                  </label>
                </li>
                <li className="settingsPanel__list-item">
                  <div className="settingsPanel__switchlanguge">
                    <input
                      name="userLanguage"
                      type="checkbox"
                      className="switch__box"
                      onChange={() => {
                        lang === "ru"
                          ? dispatch({ type: "SETLANGUAGE", data: "ua" })
                          : dispatch({ type: "SETLANGUAGE", data: "ru" });
                      }}
                      checked={lang === "ru" ? false : true}
                    />
                    <span className="settingsPanel__item-name">
                      {lang === "ru" ? "- язык интерфейса" : "- мова інтерфейсу"}
                    </span>
                  </div>
                </li>
                <li className="settingsPanel__list-item">
                  <hr />
                  всего зарегестрированных пользователей - {dataRegUsers.numRegUsers}
                  <br />
                  зарегестрированных пользователей online - {dataRegUsers.numRegUsersOnline}
                </li>
              </ul>
            </form>
          </div>
          {/* ---------------------------------------- */}
        </div>
      </nav>

      {/* ----------------Дроп-меню------------------ */}
      <div className={`header__drop-menu ${burgstate ? "header__drop-menu_active" : ""}`}>
        <h3 className="dropmenu__logo_dispetcher"> Заказы:</h3>
        <ul className="header__drop-list">
          <li
            className={`menu__item menu__link ${
              dispetcher_list === "forEvaluation" ? "menu__link_active" : ""
            }`}
            onClick={() => {
              dispatch({ type: "SELECTEDORDERNUM", data: "" });
              dispatch({ type: "SETDISPETCHERLIST", data: "forEvaluation" });
              setBurgstate((x) => !x);
              enableBodyScroll(main.current);
              dispatch({ type: "orderperehodnull", data: "" });
            }}
          >
            {lang === "ru" ? "Аукцион" : "Аукціон"}
          </li>
          <li
            className={`menu__item menu__link ${
              dispetcher_list === "waitingPayment" ? "menu__link_active" : ""
            }`}
            onClick={() => {
              dispatch({ type: "SELECTEDORDERNUM", data: "" });
              dispatch({ type: "SETDISPETCHERLIST", data: "waitingPayment" });
              setBurgstate((x) => !x);
              enableBodyScroll(main.current);
              dispatch({ type: "orderperehodnull", data: "" });
            }}
          >
            {lang === "ru" ? "Ожидают оплаты" : "Чекають на оплату"}
          </li>
          <li
            className={`menu__item menu__link ${
              dispetcher_list === "atWork" ? "menu__link_active" : ""
            }`}
            onClick={() => {
              dispatch({ type: "SELECTEDORDERNUM", data: "" });
              dispatch({ type: "SETDISPETCHERLIST", data: "atWork" });
              setBurgstate((x) => !x);
              enableBodyScroll(main.current);
              dispatch({ type: "orderperehodnull", data: "" });
            }}
          >
            {lang === "ru" ? "В работе" : "В роботі"}
          </li>
          <li
            className={`menu__item menu__link ${
              dispetcher_list === "onGuarantee" ? "menu__link_active" : ""
            }`}
            onClick={() => {
              dispatch({ type: "SELECTEDORDERNUM", data: "" });
              dispatch({ type: "SETDISPETCHERLIST", data: "onGuarantee" });
              setBurgstate((x) => !x);
              enableBodyScroll(main.current);
              dispatch({ type: "orderperehodnull", data: "" });
            }}
          >
            {lang === "ru" ? "На гарантии" : "На гарантії"}
          </li>
          <li
            className={`menu__item menu__link ${
              dispetcher_list === "done" ? "menu__link_active" : ""
            }`}
            onClick={() => {
              dispatch({ type: "SELECTEDORDERNUM", data: "" });
              dispatch({ type: "SETDISPETCHERLIST", data: "done" });
              setBurgstate((x) => !x);
              enableBodyScroll(main.current);
              dispatch({ type: "orderperehodnull", data: "" });
            }}
          >
            {lang === "ru" ? "Выполненные" : "Виконані"}
          </li>

          {/* <li className="header__drop-item">
            <div className="langpanel">
              <div className="switch">
                <input
                  type="checkbox"
                  className="switch__box"
                  onChange={() => {
                    lang === "ru"
                      ? dispatch({ type: "SETLANGUAGE", data: "ua" })
                      : dispatch({ type: "SETLANGUAGE", data: "ru" });
                    dispatch({ type: "orderperehodnull", data: "" });
                    enableBodyScroll(main.current);
                  }}
                  checked={lang === "ru" ? false : true}
                />
              </div>
              <div
                className="userexit"
                onClick={() => {
                  nav("/");
                  dispatch({
                    type: "USERDATA",
                    data: { username: "", userstate: "", usermail: "" },
                  });
                  dispatch({
                    type: "SELECTEDORDERNUM",
                    data: "",
                  });
                  setBurgstate(false);
                  // Удаление куки для каждого параметра входа
                  Cookies.remove("usermail");
                  Cookies.remove("username");
                  Cookies.remove("userstate");
                  Cookies.remove("dispetcher_list");
                }}
              ></div>
            </div>
          </li> */}
        </ul>
        {/* <div className="blockdropbut">
          <Link
            to="/"
            className="but dropmenu__but"
            onClick={() => {
              setBurgstate((x) => !x);
              enableBodyScroll(main.current);
              dispatch({ type: "orderperehod", data: "1" });
            }}
          >
            {lang === "ru" ? "Заказать работу" : "Замовити роботу"}
          </Link>
        </div>

        <div className="header__textmin_dropmenu">
          {lang === "ru" ? "Время работы: c 9-00 до 21-00" : "Час роботи: c 9-00 до 21-00"}
          <br />
          {lang === "ru" ? "Работаем без выходных" : "Працюємо без вихідних"}
        </div> */}

        <div
          className="drop-menu-close"
          onClick={() => {
            setBurgstate(false);
            enableBodyScroll(main.current);
          }}
        >
          <span className="drop-close-line"></span>
          <span className="drop-close-line"></span>
        </div>
      </div>
    </header>
  );
}

export default HeaderDispetcher;
