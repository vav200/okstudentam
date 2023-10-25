import "./footer.css";
import FooterRU from "./FooterRU";
import FooterUA from "./FooterUA";
import FooterAdmin from "./FooterAdmin";
import { useSelector } from "react-redux";

function Footer() {
  let lang = useSelector((dat) => dat.language);
  let stateadmin = useSelector((dat) => dat.adminpanel);
  if (stateadmin) return <FooterAdmin />;
  else {
    if (lang === "ru") return <FooterRU />;
    else return <FooterUA />;
  }
}

export default Footer;
