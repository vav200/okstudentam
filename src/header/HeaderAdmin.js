import React, { useEffect } from "react";
import { useState } from "react";
import "./header.css";
// import "./../main/main.css";
import { Link, NavLink } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useDispatch } from "react-redux";

function HeaderAdmin() {
  const [burgstate, setBurgstate] = useState(false);
  let main = React.createRef();
  const [secondlvlmenustate, setSecondlvlmenustate] = useState(false);
  const [scrollpos, setScrollpos] = useState();
  let dispatch = useDispatch();

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
        <div className="header__nav-wrap-admin">
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
              <h3 className="header__logo">OKstudentam - панель администратора</h3>
            </div>
            <div className="blocklogobut">
              <Link
                to="/"
                // className="but logo__but"
                className="but_gray exitadmin__but"
                onClick={() => dispatch({ type: "EXITADMINPANEL" })}
              >
                Выйти
              </Link>
            </div>
          </div>

          <div
            className={`header__nav-secondlvl ${
              secondlvlmenustate ? "header__nav-secondlvl_disable" : ""
            }`}
          >
            <ul className="header__menu">
              <li className="menu__item">
                <NavLink
                  to="/adminpanel"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  Готовые работы
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* дроп-меню */}
      <div className={`header__drop-menu ${burgstate ? "header__drop-menu_active" : ""}`}>
        <h3 className="dropmenu__logo">OKstudentam</h3>
        <ul className="header__drop-list">
          <li className="header__drop-item">
            <Link
              to="/adminpanel"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
              }}
            >
              Готовые работы
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
    </header>
  );
}

export default HeaderAdmin;
