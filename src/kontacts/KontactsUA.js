import "./kontacts.css";
import map from "./img/map.gif";
import { Helmet } from "react-helmet";
import { Fade, Zoom } from "react-awesome-reveal";

function Kontacts() {
  return (
    <>
      <Helmet>
        <meta name="keywords" content="контакти" />
        <meta name="description" content="наші контактні дані" />
      </Helmet>
      <h4 className="mt-5 mb-5">Контакти адміністрації OKstudentam:</h4>

      <Fade cascade damping={0.2} duration={1000} direction="right" triggerOnce={true}>
        <p className="mts"> +380 66 993 30 01 (Viber, Telegram) </p>
        <p className="life">+380 93 004 55 02 </p>
        <p className="kievstar"> +380 97 649 01 07</p>
        <p className="mail"> ok.studentam@gmail.com</p>
        <p className="facebook">
          <a href="https://www.facebook.com/Okstudentam">Наша сторінка в Facebook</a>
        </p>
      </Fade>

      <h4 className="mt-5 mb-3">Наше розташування:</h4>

      <Zoom triggerOnce={true}>
        <p>Україна, Миколаївська обл., м. Миколаїв</p>
        <img src={map} className="img-fluid" alt="положення на мапі" />
      </Zoom>
    </>
  );
}

export default Kontacts;
