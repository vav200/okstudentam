import { finishedworks } from "./../baseworks";
import { Helmet } from "react-helmet";
import "./../finishedworks.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Work225() {
  let lang = useSelector((dat) => dat.language);
  let numelmas = "";
  finishedworks.forEach((item, ind) => {
    if (item.key === "225") numelmas = ind;
  });

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    scrollToTop();
  }, []);

  return (
    <main>
      <Helmet>
        <meta name="keywords" content={finishedworks[numelmas].keywords} />
        <meta name="description" content={finishedworks[numelmas].description} />
      </Helmet>

      <h1 className="fs-4 text-center mb-4 namefinwork">{finishedworks[numelmas].name}</h1>

      <div className="soderg">
        {finishedworks[numelmas].cont}
        <h5
          className={`text-center mt-4 mb-2 ${
            finishedworks[numelmas].hasOwnProperty("intro") ? "" : "d-none"
          }`}
        >
          Вступ
        </h5>
        {finishedworks[numelmas].hasOwnProperty("intro") ? finishedworks[numelmas].intro : ""}
        <h5
          className={`text-center mt-4 mb-2 ${
            finishedworks[numelmas].hasOwnProperty("conclus") ? "" : "d-none"
          }`}
        >
          Висновки
        </h5>
        {finishedworks[numelmas].hasOwnProperty("conclus") ? finishedworks[numelmas].conclus : ""}
      </div>

      <div className="downloadblock">
        <a className="downloadbut text-center"
          href={`https://okstudentam.com.ua/freeworks/${finishedworks[numelmas].key}.rar`}
          download
        >
          {lang === "ru" ? "Скачать работу полностью" : "Завантажити роботу повністю"}
        </a>
      </div>
    </main>
  );
}
