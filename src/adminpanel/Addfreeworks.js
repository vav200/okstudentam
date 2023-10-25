import React from "react";
import "./adminpanel.css";
import { useState } from "react";

export default function Addfreeworks() {
  const workform = React.createRef();
  const [name, setName] = useState("");
  const [typework, setTypework] = useState("");
  const [numstr, setNumstr] = useState("");
  const [annotac, setAnnotac] = useState("");
  const [keyword, setKeyword] = useState("");
  const [cont, setCont] = useState("");
  const [intro, setIntro] = useState("");
  const [conclus, setConclus] = useState("");
  const [nameParagraf, setNameParagraf] = useState("");
  const [contParagraf, setContParagraf] = useState("");
  const [errormes, setErrormes] = useState("");
  const [execstate, setExecstate] = useState(false);

  function setabzac(e) {
    let paragraphs = "";
    if (e.target.value.includes("''")) paragraphs = e.target.value.split("\n");
    else paragraphs = e.target.value.replace(/’|'/g, "''").split("\n");

    let clearparagraphs = paragraphs.filter((item) => item != "");
    let newparagraphs = clearparagraphs.reduce((prev, item) => {
      if (!item.includes("<p>")) prev = prev + "<p>" + item + "</p>\n";
      else prev = prev + item;
      return prev;
    }, "");
    return newparagraphs;
  }

  function changeapostrof(e) {
    let str = "";
    if (e.target.value.includes("''")) str = e.target.value;
    else str = e.target.value.replace(/’|'/g, "''");
    return str;
  }

  function sendWork(e) {
    e.preventDefault();
    let dataform = new FormData(workform.current);
    dataform.delete("intro");
    dataform.delete("nameParagraf");
    dataform.delete("contParagraf");
    dataform.append("intro", intro + nameParagraf + contParagraf);

    // for (let key of dataform.keys()) {
    //   console.log(`${key}: ${dataform.get(key)}`);
    // }

    if (
      name == "" ||
      annotac == "" ||
      keyword == "" ||
      typework == "" ||
      numstr == "" ||
      cont == ""
    ) {
      setErrormes("Заполните все поля со звездочкой *");
      setExecstate((x) => !x);
    } else {
      setErrormes("");
      fetch("https://okstudentam.com.ua/adpanel/savefreeworks.php", {
        method: "POST",
        body: dataform,
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          if (data) {
            setErrormes("Успешно записано");
            setExecstate((x) => !x);
          } else {
            setErrormes("Ошибка записи!");
            setExecstate((x) => !x);
          }
          // setName("");
          // setTypework("");
          // setNumstr("");
          // setAnnotac("");
          // setKeyword("");
          // setCont("");
          // setIntro("");
          // setConclus("");
          // setNameParagraf("");
          // setContParagraf("");
          // setErrormes("");
        });
    }
  }

  function createFiles(e) {
    e.preventDefault();
    fetch("https://okstudentam.com.ua/adpanel/createfiles.php")
      .then((data) => data.text())
      .then((data) => {
        console.log(data);
        if (data) {
          setErrormes("Файлы созданы");
          setExecstate((x) => !x);
        } else {
          setErrormes("Ошибка создания файлов!");
          setExecstate((x) => !x);
        }
      });
  }

  return (
    <main className="position-relative px-3">
      <h5 className="mt-4 mb-3 px-2 text-center"></h5>
      <div className="funcblock">
        <div className={`mess__backfon ${execstate ? "mess__backfon_active" : ""}`}></div>
        <div className={`messbox ${execstate ? "messbox_active" : ""}`}>
          {errormes}
          <input
            type="submit"
            value="Закрыть"
            className="messbox__but"
            onClick={() => setExecstate((x) => !x)}
          />
        </div>

        <form ref={workform}>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">*Название:</span>
              <textarea
                className="widtharea  namework"
                name="namework"
                onChange={(e) => setName(e.target.value)}
                value={name}
                onBlur={(e) => setName(changeapostrof(e))}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">*Тип работы:</span>
              <br />
              <select
                name="typework"
                className="widtharea typework"
                onChange={(e) => setTypework(e.target.value)}
                value={typework}
              >
                <option value=""> </option>
                <option value="дипломна робота">Дипломна робота</option>
                <option value="доповідь">Доповідь</option>
                <option value="контрольна робота">Контрольна робота</option>
                <option value="курсова робота">Курсова робота</option>
                <option value="магістерська дисертація">Магістерська дисертація</option>
                <option value="звіт">Звіт</option>
                <option value="реферат">Реферат</option>
                <option value="стаття">Стаття</option>
                <option value="есе">Есе</option>
              </select>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">*Количество страниц:</span>
              <textarea
                className="widtharea numstr"
                name="numstr"
                onChange={(e) => setNumstr(e.target.value)}
                value={numstr}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">*Краткое описание:</span>
              <textarea
                className="widtharea annotac"
                name="annotac"
                onChange={(e) => setAnnotac(e.target.value)}
                value={annotac}
                onBlur={(e) => setAnnotac(changeapostrof(e))}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">*Ключевые слова:</span>
              <textarea
                className="widtharea keywords"
                name="keywords"
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                onBlur={(e) => setKeyword(changeapostrof(e))}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">Содержание/контент*:</span>
              <textarea
                className="widtharea cont"
                name="cont"
                onChange={(e) => setCont(e.target.value)}
                value={cont}
                onBlur={(e) => setCont(setabzac(e))}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">Введение:</span>
              <textarea
                className="widtharea intro"
                name="intro"
                onChange={(e) => setIntro(e.target.value)}
                value={intro}
                onBlur={(e) => setIntro(setabzac(e))}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">Название раздела:</span>
              <textarea
                className="widtharea  namework"
                name="nameParagraf"
                onChange={(e) => setNameParagraf(e.target.value)}
                value={nameParagraf}
                onBlur={() =>
                  setNameParagraf((n) =>
                    !n.includes("</h5>") && n != ""
                      ? "<h5 className=''text-center mt-4 mb-2''>" + n + "</h5>"
                      : n
                  )
                }
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">Текст раздела:</span>
              <textarea
                className="widtharea cont"
                name="contParagraf"
                onChange={(e) => setContParagraf(e.target.value)}
                value={contParagraf}
                onBlur={(e) => setContParagraf(setabzac(e))}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">Заключение:</span>
              <textarea
                className="widtharea conclus"
                name="conclus"
                onChange={(e) => setConclus(e.target.value)}
                onBlur={(e) => setConclus(setabzac(e))}
                value={conclus}
              ></textarea>
            </label>
          </div>
          <div className="note">* - поля обязательные для заполнения</div>
          <div className="butblock">
            <input
              type="submit"
              value="Записать в базу данных"
              className="but_gray service__but"
              onClick={sendWork}
            />
            <input
              type="submit"
              value="Очистить форму"
              className="but_gray service__but"
              onClick={(e) => {
                e.preventDefault();
                setName("");
                setTypework("");
                setNumstr("");
                setAnnotac("");
                setKeyword("");
                setCont("");
                setIntro("");
                setConclus("");
                setNameParagraf("");
                setContParagraf("");
                setErrormes("");
              }}
            />
            <input
              type="submit"
              value="Создать файлы"
              // className="but panelbut"
              className="but_gray service__but"
              onClick={createFiles}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
