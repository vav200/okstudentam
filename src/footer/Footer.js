import "./footer.css";
import FooterUser from "./FooterUser";
import FooterAdmin from "./FooterAdmin";
import FooterDispetcher from "./FooterDispetcher";
import { useSelector } from "react-redux";

function Footer() {
  let stateadmin = useSelector((dat) => dat.adminpanel);
  let userstate = useSelector((dat) => dat.userstate);
  if (stateadmin) return <FooterAdmin />;
  else if (userstate === "dispetcher") return <FooterDispetcher />;
  else return <FooterUser />;
}

export default Footer;
