import React from "react";
import "./finishedworks.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function AddFinishedWorks() {
  let lang = useSelector((dat) => dat.language);
  let domen = useSelector((dat) => dat.domen);
  const workform = React.createRef();

  const [namework, setNamework] = useState("");
  const [typework, setTypework] = useState("");
  const [numpages, setNumpages] = useState("");
  const [content, setContent] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [conclus, setConclus] = useState("");
  const [addfile, setAddfile] = useState("");

  const [errormes, setErrormes] = useState("");
  const [execstate, setExecstate] = useState(false);

  function setabzac(txt) {
    let paragraphs = "";
    if (txt.includes("''")) paragraphs = txt.split("\n");
    else paragraphs = txt.replace(/’|'/g, "''").split("\n");

    let clearparagraphs = paragraphs.filter((item) => item != "");
    let newparagraphs = clearparagraphs.reduce((prev, item) => {
      prev = prev + "<p>" + item + "</p>\n";
      return prev;
    }, "");
    return newparagraphs;
  }

  function sendWork(e) {
    e.preventDefault();
    let dataform = new FormData(workform.current);

    dataform.delete("content");
    dataform.delete("introduction");
    dataform.delete("conclus");

    dataform.append("content", setabzac(content));
    dataform.append("introduction", setabzac(introduction));
    dataform.append("conclus", setabzac(conclus));

    for (let key of dataform.keys()) {
      console.log(`${key}: ${dataform.get(key)}`);
    }

    if (namework == "" || typework == "" || numpages == "" || content == "" || addfile == "") {
      setErrormes("Заполните все поля со звездочкой *");
      setExecstate((x) => !x);
    } else {
      setErrormes("");
      let url = domen + "/works/sendwork.php";
      fetch(url, {
        method: "POST",
        body: dataform,
      })
        .then((data) => data.text())
        .then((data) => {
          // console.log(data);
          if (data) {
            setErrormes("Успешно записано");
            setExecstate((x) => !x);
          } else {
            setErrormes("Ошибка записи!");
            setExecstate((x) => !x);
          }
          setNamework("");
          setTypework("");
          setNumpages("");
          setContent("");
          setIntroduction("");
          setConclus("");
          setAddfile("");
        });
    }
  }

  function validNum(e) {
    const regEx = /[^\d]/g;
    let inp = e.target.value.replace(regEx, "");
    e.target.value = inp;
  }

  return (
    <main className="position-relative">
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

      <h3 className="mt-3">
        {lang === "ru" ? "Занесение в базу готовых работ" : "Занесення в базу готових робіт"}
      </h3>
      <div className="mt-3">
        <form ref={workform}>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">
                {lang === "ru" ? "*Название работы:" : "*Назва роботи:"}
              </span>
              <textarea
                className="widtharea  namework"
                name="namework"
                onChange={(e) => setNamework(e.target.value)}
                value={namework}
                // onBlur={(e) => setName(changeapostrof(e))}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">
                {lang === "ru" ? "*Тип работы:" : "*Тип роботи:"}
              </span>
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
              <span className="nameparam align-top">
                {lang === "ru" ? "*Количество страниц:" : "*Кількість сторінок:"}
              </span>
              <textarea
                className="widtharea numstr"
                name="numpages"
                onChange={(e) => {
                  validNum(e);
                  setNumpages(e.target.value);
                }}
                value={numpages}
              ></textarea>
            </label>
          </div>

          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">
                {lang === "ru" ? "*Содержание:" : "*Зміст:"}
              </span>
              <textarea
                className="widtharea cont"
                name="content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">{lang === "ru" ? "Введение:" : "Вступ:"}</span>
              <textarea
                className="widtharea intro"
                name="introduction"
                onChange={(e) => setIntroduction(e.target.value)}
                value={introduction}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label className="d-block">
              <span className="nameparam align-top">
                {lang === "ru" ? "Заключение:" : "Висновок:"}
              </span>
              <textarea
                className="widtharea conclus"
                name="conclus"
                onChange={(e) => setConclus(e.target.value)}
                value={conclus}
              ></textarea>
            </label>
          </div>
          <div className="inputblock">
            <label htmlFor="getfiles" className="getfiles">
              <input
                id="getfiles"
                type="file"
                name="addfile"
                className="uploadfile"
                multiple
                onChange={(e) => setAddfile(e.target.files[0])}
              />
              <div className="but_gray">{lang === "ru" ? "* Файл работы" : "* Файл роботи"}</div>
            </label>
            <ul className="orders__files-list">{addfile ? <li>{addfile.name}</li> : ""}</ul>
          </div>

          <div className="buttonsblock">
            <div>
              <input
                type="submit"
                value={lang === "ru" ? "Записать в БД" : "Записати у БД"}
                className="but order__but"
                onClick={sendWork}
              />
            </div>
            <div>
              <input
                type="submit"
                value={lang === "ru" ? "Очистить форму" : "Очистити форму"}
                className="but but_orange"
                onClick={(e) => {
                  e.preventDefault();
                  setNamework("");
                  setTypework("");
                  setNumpages("");
                  setContent("");
                  setIntroduction("");
                  setConclus("");
                  setErrormes("");
                  setAddfile("");
                }}
              />
            </div>
          </div>
          <div className="note mb-2">* - поля обязательные для заполнения</div>
        </form>
      </div>
    </main>
  );
}

export default AddFinishedWorks;
