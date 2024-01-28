import "./footer.css";
import React from "react";
import { useSelector } from "react-redux";

function FooterDispetcher() {
  let lang = useSelector((dat) => dat.language);

  return (
    <footer>
      {/* <div className="footer-wrap">
        <div className="footer__left">
          <h3 className="footer__logo">OKstudentam</h3>
        </div>
        <div className="footer__right"></div>
      </div> */}
    </footer>
  );
}

export default FooterDispetcher;
