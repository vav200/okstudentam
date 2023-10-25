import React, { useEffect } from "react";
import { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

function HeaderRU() {
  let dispatch = useDispatch();
  const [burgstate, setBurgstate] = useState(false);
  let main = React.createRef();
  let secondlvl = React.createRef();
  const [secondlvlmenustate, setSecondlvlmenustate] = useState(false);
  const [scrollpos, setScrollpos] = useState();

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
              <Link to="/" className="header__logo-link">
                <h3 className="header__logo">OKstudentam</h3>
              </Link>
            </div>
            <div className="header__textmin">
              Время работы: c 9-00 до 21-00 <br />
              Работаем без выходных
            </div>

            <div className="blocklogobut">
              <Link
                to="/"
                className="but logo__but"
                onClick={() => dispatch({ type: "orderperehod", data: "1" })}
              >
                Заказать работу
              </Link>
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
                  Главная
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/finishedworks"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  Готовые работы
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/guarantees"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  Гарантии
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/helper"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  Помощь
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/kontacts"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  Контакты
                </NavLink>
              </li>
            </ul>
            <div className="langpanel">
              <span className="langpanel__link langpanel__link_active">RU</span>
              <span className="langpanel__razdel">|</span>
              <span
                className="langpanel__link"
                onClick={() => {
                  dispatch({ type: "SETLANGUAGE", data: "ua" });
                  dispatch({ type: "orderperehodnull", data: "" });
                }}
              >
                UA
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="header__add-wrap position-relative">
        <div className="header__add">
          <div className="header__add-name"></div>
        </div>
      </div>

      {/* дроп-меню */}
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
              Главная
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
              Готовые работы
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
              Гарантии
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
              Помощь
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
              Контакты
            </Link>
          </li>
          <li className="header__drop-item">
            <div className="langpanel">
              <span className="langpanel__link langpanel__link_active">RU</span>
              <span className="langpanel__razdel">|</span>
              <span
                className="langpanel__link"
                onClick={() => {
                  dispatch({ type: "SETLANGUAGE", data: "ua" });
                  dispatch({ type: "orderperehodnull", data: "" });
                  enableBodyScroll(main.current);
                }}
              >
                UA
              </span>
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
            Заказать работу
          </Link>
        </div>

        <div className="header__textmin_dropmenu">
          Время работы: c 10-00 до 18-00 <br />
          Выходной: суббота, воскресенье
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

export default HeaderRU;
