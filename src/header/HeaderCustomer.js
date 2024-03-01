import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function HeaderCustomer() {
  let nav = useNavigate();
  let dispatch = useDispatch();
  let statenow = useSelector((dat) => dat);
  let domen = useSelector((dat) => dat.domen);
  let lang = useSelector((dat) => dat.language);
  let usermail = useSelector((dat) => dat.usermail);
  let mesAboutNewMessageInChat = useSelector((dat) => dat.mesAboutNewMessageInChat);
  let mesAboutNewOrder = useSelector((dat) => dat.mesAboutNewOrder);
  const [burgstate, setBurgstate] = useState(false);
  const [visibleSettings, setVisibleSettings] = useState(false);
  let main = React.createRef();
  let secondlvl = React.createRef();
  let formForSettings = useRef();
  const [secondlvlmenustate, setSecondlvlmenustate] = useState(false);
  const [scrollpos, setScrollpos] = useState();
  console.log("HeaderCustomer", statenow);

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
    dispatch({
      type: "USERDATA",
      data: { username: "", userstate: "", usermail: "" },
    });
    dispatch({
      type: "SELECTEDORDERNUM",
      data: "",
    });
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

  useEffect(() => enableBodyScroll(main.current), []);

  // useEffect(() => {
  //   function hidemenu() {
  //     let currposition = window.scrollY;
  //     setScrollpos(currposition);

  //     if (currposition > 60) {
  //       setSecondlvlmenustate(true);
  //     } else setSecondlvlmenustate(false);
  //   }
  //   window.onscroll = hidemenu;
  //   return () => {
  //     window.onscroll = hidemenu;
  //   };
  // }, [scrollpos]);

  return (
    <header className="header position-relative" ref={main}>
      <div className={`burg__backfon ${burgstate ? "burg__backfon_active" : ""}`}></div>
      <nav className="header__nav">
        <div className="header__nav-wrap">
          <div className="header__nav-firstlvl">
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
              <Link to="/" className="header__logo-link">
                <h3 className="header__logo">OKstudentam</h3>
              </Link>
            </div>
            <div className="header__textmin">
              {lang === "ru" ? "Время работы: c 9-00 до 21-00" : "Час роботи: c 9-00 до 21-00"}
              <br />
              {lang === "ru" ? "Работаем без выходных" : "Працюємо без вихідних"}
            </div>
          </div>

          <div
            className={`header__nav-secondlvl ${
              secondlvlmenustate ? "header__nav-secondlvl_disable" : ""
            }`}
            ref={secondlvl}
          >
            <ul className="header__menu">
              <li className="menu__item">
                <NavLink
                  to="/"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                  onClick={() => dispatch({ type: "orderperehodnull", data: "" })}
                >
                  {lang === "ru" ? "Главная" : "Головна"}
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/finishedworks"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  {lang === "ru" ? "Готовые работы" : "Готові роботи"}
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/guarantees"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  {lang === "ru" ? "Гарантии" : "Гарантії"}
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/helper"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  {lang === "ru" ? "Помощь" : "Допомога"}
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/kontacts"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  {lang === "ru" ? "Контакты" : "Контакти"}
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/personalarea"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  {lang === "ru" ? "Кабинет заказчика" : "Кабінет замовника"}
                </NavLink>
              </li>
            </ul>
            <div className="langpanel">
              <div
                className="settings"
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
            className={visibleSettings ? "settingsPanel_customer" : "settingsPanelHide_customer"}
          >
            <form ref={formForSettings}>
              <ul className="settingsPanel__list">
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
              </ul>
            </form>
          </div>
          {/* ---------------------------------------- */}
        </div>
      </nav>

      {/* ----------------Дроп-меню------------------ */}
      <div className={`header__drop-menu ${burgstate ? "header__drop-menu_active" : ""}`}>
        <h3 className="dropmenu__logo">OKstudentam</h3>
        <ul className="header__drop-list">
          <li className="header__drop-item">
            <Link
              to="/"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
                dispatch({ type: "orderperehodnull", data: "" });
              }}
            >
              {lang === "ru" ? "Главная" : "Головна"}
            </Link>
          </li>
          <li className="header__drop-item">
            <Link
              to="/finishedworks"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
              }}
            >
              {lang === "ru" ? "Готовые работы" : "Готові роботи"}
            </Link>
          </li>
          <li className="header__drop-item">
            <Link
              to="/guarantees"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
              }}
            >
              {lang === "ru" ? "Гарантии" : "Гарантії"}
            </Link>
          </li>
          <li className="header__drop-item">
            <Link
              to="/helper"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
              }}
            >
              {lang === "ru" ? "Помощь" : "Допомога"}
            </Link>
          </li>
          <li className="header__drop-item">
            <Link
              to="/kontacts"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
              }}
            >
              {lang === "ru" ? "Контакты" : "Контакти"}
            </Link>
          </li>
          <li className="header__drop-item">
            <Link
              to="/personalarea"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
              }}
            >
              {lang === "ru" ? "Кабинет заказчика" : "Кабінет замовника"}
            </Link>
          </li>
          <li className="header__drop-item">
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
          </li>
        </ul>
        <div className="blockdropbut">
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
        </div>

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

export default HeaderCustomer;
