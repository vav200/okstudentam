import "./finishedworks.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { useParams } from "react-router-dom";

function SelectedWork() {
  let lang = useSelector((dat) => dat.language);
  let domen = useSelector((dat) => dat.domen);
  let p = useParams();

  const [work, setWork] = useState([]);

  function getWork() {
    let url = domen + "/works/getWork.php";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: "&keySelectedWork=" + p.keywork,
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error(`Network response was not ok, status: ${data.status}`);
        }
        return data.json();
      })
      .then((data) => {
        setWork(data);
      });
  }

  useEffect(() => {
    setWork([]);
    getWork();
  }, [p.keywork]);

  return (
    <main>
      {work ? (
        <>
          <Helmet>
            <meta name="keywords" content={work.keywords} />
            <meta name="description" content={work.description} />
          </Helmet>
          <h1 className="fs-4 text-center mb-4 namefinwork">{work.namework}</h1>

          <div className="soderg">
            <div dangerouslySetInnerHTML={{ __html: work.content }} />

            {work.introduction && (
              <>
                <h5 className="text-center mt-4 mb-2">{lang === "ru" ? "Введение" : "Вступ"}</h5>{" "}
                <div dangerouslySetInnerHTML={{ __html: work.introduction }} />
              </>
            )}

            {work.conclus && (
              <>
                <h5 className="text-center mt-4 mb-2">{lang === "ru" ? "Выводы" : "Висновки"}</h5>
                <div dangerouslySetInnerHTML={{ __html: work.conclus }} />
              </>
            )}
          </div>
          <div className="downloadblock">
            <a
              className="downloadbut"
              href={`${domen}/works/finishedWorks/${work.keywork}.rar`}
              download
            >
              {lang === "ru" ? "Скачать работу полностью" : "Завантажити роботу повністю"}
            </a>
          </div>
        </>
      ) : (
        <p className="mt-4 ps-3 orders__zagruzka"></p>
      )}
    </main>
  );
}

export default SelectedWork;
