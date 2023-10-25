import React from "react";
import { useState } from "react";
import "./header.css";
import logo from "./img/logoN.png";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

function Header() {
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
              Головна
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/finishedworks"
              className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
            >
              Готові роботи
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/guarantees"
              className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
            >
              Гарантії
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/helper"
              className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
            >
              Допомога
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/kontacts"
              className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
            >
              Контакти
            </NavLink>
          </li>
        </ul>
        <div className="langpanel">
          <span
            className="langpanel__link"
            onClick={() => dispatch({ type: "SETLANGUAGE", data: "ru" })}
          >
            RU
          </span>
          <span className="langpanel__razdel">|</span>
          <span className="langpanel__link langpanel__link_active">UA</span>
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
              Головна
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
              Готові роботи
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
              Гарантії
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
              Допомога
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
              Контакти
            </Link>
          </li>
        </ul>
        <div
          class="drop-menu-close"
          onClick={() => {
            setBurgstate(false);
            enableBodyScroll(main.current);
          }}
        >
          <span class="drop-close-line"></span>
          <span class="drop-close-line"></span>
        </div>
      </div>
    </>
  );
}

export default Header;
