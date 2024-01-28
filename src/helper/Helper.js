import "./helper.css";
import HelperRU from "./HelperRU";
import HelperUA from "./HelperUA";
import { useSelector } from "react-redux";

function Helper() {
  let lang = useSelector((dat) => dat.language);
  if (lang === "ru") return <HelperRU />;
  else return <HelperUA />;
}

export default Helper;
