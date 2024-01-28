import "./footer.css";
import React from "react";
import { useSelector } from "react-redux";

function FooterUser() {
  let lang = useSelector((dat) => dat.language);

  return (
    <footer className="footer">
      <div className="footer-wrap">
        <div className="footer__left">
          <h3 className="footer__logo">OKstudentam</h3>
          <p className="footer__add ">
            {lang === "ru"
              ? "Более 20-ти лет на интеллектуальных рынках Европы и Азии"
              : "Понад 20 років на інтелектуальних ринках Європи та Азії"}
          </p>
          <div className="staticinfooter">
            {/* LiveInternet logo */}
            <a href="https://www.liveinternet.ru/click" target="_blank">
              <img
                src="https://counter.yadro.ru/logo?26.3"
                title="LiveInternet: показано число посетителей за сегодня"
                alt=""
                width="88"
                height="15"
              />
            </a>
            {/* /LiveInternet */}
          </div>
        </div>
        <div className="footer__right">
          <p className="telbox">+380 66 993 30 01 (Viber, Telegram) </p>
          <p className="telbox">+380 93 004 55 02 </p>
          <p className="telbox">+380 97 649 01 07</p>
          <p className="mailbox pb-0 mb-0"> ok.studentam@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterUser;
