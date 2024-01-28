import React, { useEffect } from "react";
import { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function HeaderDispetcher() {
  let nav = useNavigate();
  let lang = useSelector((dat) => dat.language);
  let dispetcher_list = useSelector((dat) => dat.dispetcher_list);
  let dispatch = useDispatch();
  const [burgstate, setBurgstate] = useState(false);
  let main = React.createRef();
  let secondlvl = React.createRef();
  const [secondlvlmenustate, setSecondlvlmenustate] = useState(false);
  const [scrollpos, setScrollpos] = useState();

  useEffect(() => enableBodyScroll(main.current));

  useEffect(() => {
    function hidemenu() {
      let currposition = window.scrollY;
      setScrollpos(currposition);

      if (currposition > 60) {
        setSecondlvlmenustate(true);
      } else setSecondlvlmenustate(false);
    }
    window.onscroll = hidemenu;
    return () => {
      window.onscroll = hidemenu;
    };
  }, [scrollpos]);

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
              {/* <Link to="/" className="header__logo-link">
                <h3 className="header__logo">OKstudentam</h3>
              </Link> */}
            </div>
          </div>

          <div
            className={`header__nav-secondlvl ${
              secondlvlmenustate ? "header__nav-secondlvl_disable" : ""
            }`}
            ref={secondlvl}
          >
            <ul className="header__menu">
              <li
                className={`menu__item menu__link ${
                  dispetcher_list === "forEvaluation" ? "menu__link_active" : ""
                }`}
                onClick={() => {
                  dispatch({ type: "SELECTEDORDERNUM", data: "" });
                  dispatch({ type: "SETDISPETCHERLIST", data: "forEvaluation" });
                }}
              >
                {lang === "ru" ? "Ожидают оценки" : "Чекають на оцінку"}
              </li>
              <li
                className={`menu__item menu__link ${
                  dispetcher_list === "waitingPayment" ? "menu__link_active" : ""
                }`}
                onClick={() => {
                  dispatch({ type: "SELECTEDORDERNUM", data: "" });
                  dispatch({ type: "SETDISPETCHERLIST", data: "waitingPayment" });
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
                }}
              >
                {lang === "ru" ? "Выполненные" : "Виконані"}
              </li>
            </ul>
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
                  dispatch({ type: "SETDISPETCHERLIST", data: "" });
                  // Удаление куки для каждого параметра входа
                  Cookies.remove("usermail");
                  Cookies.remove("username");
                  Cookies.remove("userstate");
                  Cookies.remove("dispetcher_list");
                }}
              ></div>
            </div>
          </div>
        </div>
      </nav>

      {/* ----------------Дроп-меню------------------ */}
      <div className={`header__drop-menu ${burgstate ? "header__drop-menu_active" : ""}`}>
        <h3 className="dropmenu__logo">OKstudentam</h3>
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
            {lang === "ru" ? "Ожидают оценки" : "Чекають на оцінку"}
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

export default HeaderDispetcher;
