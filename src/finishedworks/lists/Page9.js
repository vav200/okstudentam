import "./../finishedworks.css";
import { finishedworks } from "./../baseworks";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navpages from "./Navpages";
import { useEffect } from "react";

export default function Page9() {
  let dispatch = useDispatch();
  let lang = useSelector((dat) => dat.language);
  let listpart = finishedworks.sort(alfporiadok).slice(240, 270);
  let numpage = 9;

  function alfporiadok(x, y) {
    return x.name.localeCompare(y.name, "uk-UA");
  }

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    };
    scrollToTop();
  }, []);

  return (
    <main>
      <Helmet>
        <meta name="keywords" content={lang === "ru" ? "готовые работы" : "готові роботи"} />
        <meta
          name="description"
          content={
            lang === "ru"
              ? "поиск готовой работы с возможностью скачивания"
              : "пошук готової роботи з можливістю скачування"
          }
        />
      </Helmet>

      <ul className="listworks">
        {listpart.map((item, ind) => (
          <li className="listworks__item" key={item.key}>
            <Link
              to={`/finishedworks/${item.key}`}
              onClick={() => {
                dispatch({ type: "KEYFREEWORK", data: [item.key, ind] });
              }}
            >
              {item.name}
            </Link>
            <p className="workinfo">
              {item.typework} | {item.numpages} стр.
            </p>
          </li>
        ))}
      </ul>
      <Navpages numpage={numpage} />
    </main>
  );
}
