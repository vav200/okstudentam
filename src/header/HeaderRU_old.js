import React from "react";
import { useState } from "react";
import "./header.css";
import logo from "./img/logoN.png";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

function HeaderRU() {
  let dispatch = useDispatch();
  const [burgstate, setBurgstate] = useState(false);
  let main = React.createRef();

  return (
    <>
      <header className="header position-relative" ref={main}>
        <div className="header__logo">
          <img src={logo} alt="логотип" className="logo-image" />
        </div>
        <div className="header__name text-center">OKstudentam</div>
      </header>
      <div className={`burg__backfon ${burgstate ? "burg__backfon_active" : ""}`}></div>
      <nav className="header__nav">
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
          <li className="menu__item">
            <NavLink
              to="/"
              className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
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
            onClick={() => dispatch({ type: "SETLANGUAGE", data: "ua" })}
          >
            UA
          </span>
        </div>
      </nav>
      <div className={`header__drop-menu ${burgstate ? "header__drop-menu_active" : ""}`}>
        <ul className="header__drop-list">
          <li className="header__drop-item">
            <Link
              to="/"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
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
        </ul>
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
    </>
  );
}

export default HeaderRU;
