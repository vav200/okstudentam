import "./../finishedworks.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Navpages(props) {
  let lang = useSelector((dat) => dat.language);
  return (
    <nav className="listpages">
      <ul className="listpages__box text-center">
        <li
          key="prev"
          className={`listpages__item listpages__item_first ${
            props.numpage === 1 ? "listpages__item_disabled" : ""
          }`}
        >
          <NavLink
            to={`/finishedworks/page${String(props.numpage - 1)}`}
            className={`listpages__link`}
          >
            {lang === "ru" ? "предыдущая" : "попередня"}
          </NavLink>
        </li>
        <li className="listpages__item" key="p1">
          <NavLink
            to="/finishedworks/page1"
            className={`${props.numpage === 1 ? "listpages__link_active" : "listpages__link"}`}
          >
            1
          </NavLink>
        </li>
        <li className="listpages__item" key="p2">
          <NavLink
            to="/finishedworks/page2"
            className={`${props.numpage === 2 ? "listpages__link_active" : "listpages__link"}`}
          >
            2
          </NavLink>
        </li>
        <li className="listpages__item" key="p3">
          <NavLink
            to="/finishedworks/page3"
            className={`${props.numpage === 3 ? "listpages__link_active" : "listpages__link"}`}
          >
            3
          </NavLink>
        </li>
        <li className="listpages__item" key="p4">
          <NavLink
            to="/finishedworks/page4"
            className={`${props.numpage === 4 ? "listpages__link_active" : "listpages__link"}`}
          >
            4
          </NavLink>
        </li>
        <li className="listpages__item" key="p5">
          <NavLink
            to="/finishedworks/page5"
            className={`${props.numpage === 5 ? "listpages__link_active" : "listpages__link"}`}
          >
            5
          </NavLink>
        </li>
        <li className="listpages__item" key="p6">
          <NavLink
            to="/finishedworks/page6"
            className={`${props.numpage === 6 ? "listpages__link_active" : "listpages__link"}`}
          >
            6
          </NavLink>
        </li>
        <li className="listpages__item" key="p7">
          <NavLink
            to="/finishedworks/page7"
            className={`${props.numpage === 7 ? "listpages__link_active" : "listpages__link"}`}
          >
            7
          </NavLink>
        </li>
        <li className="listpages__item" key="p8">
          <NavLink
            to="/finishedworks/page8"
            className={`${props.numpage === 8 ? "listpages__link_active" : "listpages__link"}`}
          >
            8
          </NavLink>
        </li>
        <li className="listpages__item" key="p9">
          <NavLink
            to="/finishedworks/page9"
            className={`${props.numpage === 9 ? "listpages__link_active" : "listpages__link"}`}
          >
            9
          </NavLink>
        </li>
        <li className="listpages__item" key="p10">
          <NavLink
            to="/finishedworks/page10"
            className={`${props.numpage === 10 ? "listpages__link_active" : "listpages__link"}`}
          >
            10
          </NavLink>
        </li>
        <li className="listpages__item" key="p11">
          <NavLink
            to="/finishedworks/page11"
            className={`${props.numpage === 11 ? "listpages__link_active" : "listpages__link"}`}
          >
            11
          </NavLink>
        </li>
        <li
          key="next"
          className={`listpages__item listpages__item_last ${
            props.numpage === 11 ? "listpages__item_disabled" : ""
          }`}
        >
          <NavLink
            to={`/finishedworks/page${String(props.numpage + 1)}`}
            className={`listpages__link`}
          >
            {lang === "ru" ? "следующая" : "наступна"}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
