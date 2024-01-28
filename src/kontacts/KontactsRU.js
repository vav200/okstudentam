import "./kontacts.css";
import map from "./img/map.gif";
import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Slide, Fade, Zoom } from "react-awesome-reveal";

function Kontacts() {
  let nav = useNavigate();
  let main = React.createRef();
  let dispatch = useDispatch();
  let statenow = useSelector((dat) => dat);
  const [apanelstate, setApanelstate] = useState(false);

  function closeadm(e) {
    e.preventDefault();
    setApanelstate((x) => !x);
    enableBodyScroll(main.current);
    dispatch({ type: "INPLOGIN", data: "" });
    dispatch({ type: "INPPASSWORD", data: "" });
  }
  function enteradm(e) {
    e.preventDefault();
    statenow.changeuserright();
    if (statenow.adminpanel) {
      setApanelstate((x) => !x);
      enableBodyScroll(main.current);
      dispatch({ type: "INPLOGIN", data: "" });
      dispatch({ type: "INPPASSWORD", data: "" });
      nav("/adminpanel");
    } else return false;
  }

  return (
    <main className="position-relative" ref={main}>
      <Helmet>
        <meta name="keywords" content="контакты" />
        <meta name="description" content="наши контактные данные" />
      </Helmet>

      <h4 className="mt-5 mb-5">Контакты администрации OKstudentam:</h4>
      <Fade cascade damping={0.2} duration={1000} direction="right" triggerOnce={true}>
        <p className="mts"> +380 66 993 30 01 (Viber, Telegram) </p>
        <p className="life">+380 93 004 55 02 </p>
        <p className="kievstar"> +380 97 649 01 07</p>
        <p className="mail"> ok.studentam@gmail.com</p>
        <p className="facebook">
          <a href="https://www.facebook.com/Okstudentam">Наша страничка в Facebook</a>
        </p>
      </Fade>

      <div className={`admpanel__backfon ${apanelstate ? "admpanel__backfon_active" : ""}`}></div>
      <div className={`admpanel ${apanelstate ? "admpanel_active" : ""}`}>
        <form>
          <div className="admpanel__inpblock">
            <label>
              <span className="admpanel__param">Логин:</span>
              <input
                type="text"
                className="admpanel__inp"
                onChange={(e) => dispatch({ type: "INPLOGIN", data: e.target.value })}
                value={statenow.inplogin}
              />
            </label>
          </div>
          <div className="admpanel__inpblock">
            <label>
              <span className="admpanel__param">Пароль:</span>
              <input
                type="text"
                className="admpanel__inp"
                onChange={(e) => dispatch({ type: "INPPASSWORD", data: e.target.value })}
                value={statenow.inppassword}
              />
            </label>
          </div>
          <div className="admpanel__inpblockbut">
            <input type="submit" value="Войти" className="admpanel__but" onClick={enteradm} />
            <input type="submit" value="Закрыть" className="admpanel__but" onClick={closeadm} />
          </div>
        </form>
      </div>

      <h4 className="mt-5 mb-3">Наше расположение:</h4>
      <p>
        Украина, Николаевская обл., г.
        <span
          onClick={() => {
            setApanelstate((x) => !x);
            disableBodyScroll(main.current);
          }}
        >
          Николаев
        </span>
      </p>
      <Zoom triggerOnce={true}>
        <img src={map} className="img-fluid" alt="расположение на карте" />
      </Zoom>
    </main>
  );
}

export default Kontacts;
