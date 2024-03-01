import "./finishedworks.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import Cookies from "js-cookie";

export default function Searchpanel() {
  let works = useSelector((dat) => dat.finishedWorksList);
  const [serchout, setSerchout] = useState([]);
  const [mouseonlink, setMouseonlink] = useState(false);
  const [inpactive, setInpactive] = useState(false);
  let dispatch = useDispatch();
  let inp = React.createRef();
  let lang = useSelector((dat) => dat.language);
  const numstroksearch = 7;
  let countstrok = 0;

  function serchName(e) {
    let searchname = e.target.value.trim().toLowerCase();
    works.forEach((item, ind) => {
      if (searchname != "") {
        if (item.namework.toLowerCase().includes(searchname)) {
          if (!serchout.includes(ind)) {
            setSerchout((d) => [...d, ind]);
          }
        } else {
          setSerchout((d) => d.filter((el) => el != ind));
        }
      } else setSerchout([]);
    });
  }

  function blurinput(e) {
    setInpactive(false);
    e.target.value = "";
    if (!mouseonlink) setSerchout([]);
  }

  return (
    <div className={`search__block ${serchout.length > 0 ? "search__block_active" : ""}`}>
      <input
        type="text"
        className={`search__input ${serchout.length > 0 ? "search__input_hide" : ""}`}
        placeholder={lang === "ru" ? "поиск работы по названию" : "пошук роботи за назвою"}
        onChange={serchName}
        ref={inp}
        // onFocus={() => setInpactive(true)}
        onBlur={blurinput}
      />
      <ul className={`outserchnames ${serchout.length > 0 ? "outserchnames_active" : ""}`}>
        {works &&
          works.map((item, ind) => {
            if (serchout.includes(ind) && countstrok < numstroksearch) {
              countstrok++;
              return (
                <li className="outserchnames__item">
                  <Link
                    className="searchlink"
                    to={`/finishedworks/${item.keywork}`}
                    onClick={() => {
                      dispatch({ type: "KEYFREEWORK", data: [item.keywork, ind] });
                      Cookies.set("keySelectedWork", item.keywork);
                      inp.current.value = "";
                      setSerchout([]);
                    }}
                    onMouseOver={() => setMouseonlink(true)}
                    onMouseLeave={() => setMouseonlink(false)}
                  >
                    {item.namework}
                  </Link>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}
