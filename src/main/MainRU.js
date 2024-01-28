import React, { useEffect } from "react";
import "./main.css";
import { useState } from "react";
import CalculatCost from "./state";
import { Helmet } from "react-helmet";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useSelector } from "react-redux";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru"; // Импорт русской локализации

registerLocale("ru", ru); // Регистрация русской локализации

function MainRU() {
  const [selectedDate, setSelectedDate] = useState(null);

  let perehod = useSelector((dat) => dat.orderperehod);
  let domen = useSelector((dat) => dat.domen);
  let formmail = React.createRef();
  let main = React.createRef();
  let titleform = React.createRef();

  const [themeR, setThemeR] = useState("history");
  const [typeofWorkR, setTypeofWorkR] = useState("referat");
  const [timeLimitR, setTimeLimitR] = useState("1");
  const [unikalnostR, setUnikalnostR] = useState("none");
  const [numlistsR, setNumlistR] = useState(0);
  const [rezultR, setRezult] = useState(0);
  // --------------------------------------------
  const [theme, setTheme] = useState("");
  const [subject, setSubject] = useState("");
  const [typework, setTypework] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [unikalnost, setUnikalnost] = useState("");
  const [numstr, setNumstr] = useState("");
  const [koments, setKoments] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [messangers, setMessangers] = useState("");
  const [addfiles, setAddfiles] = useState();
  const [errormes, setErrormes] = useState("");
  const [execstate, setExecstate] = useState(false);

  useEffect(() => {
    if (perehod !== "") {
      titleform.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [perehod]);

  function validNum(e) {
    const regEx = /[^\d]/g;
    let inp = e.target.value.replace(regEx, "");
    e.target.value = inp;
  }
  function calc(e) {
    e.preventDefault();
    if (numlistsR === 0 || numlistsR === "err" || numlistsR === "") {
      setNumlistR("err");
      setRezult(0);
    } else {
      setRezult(CalculatCost(themeR, typeofWorkR, timeLimitR, unikalnostR, numlistsR));
    }
  }

  function sendorder(e) {
    let dataform = new FormData(formmail.current);
    for (let key of dataform.keys()) {
      console.log(`${key}: ${dataform.get(key)}`);
    }

    e.preventDefault();
    if (
      theme === "" ||
      theme === "err" ||
      subject === "" ||
      subject === "err" ||
      typework === "" ||
      typework === "err" ||
      dateTime === "" ||
      dateTime === "err" ||
      unikalnost === "" ||
      unikalnost === "err" ||
      numstr === "" ||
      numstr === "err" ||
      telephone === "" ||
      telephone === "err" ||
      email === "" ||
      email === "err"
    ) {
      titleform.current.scrollIntoView({ behavior: "smooth" });

      if (theme === "" || theme === "err") setTheme("err");
      if (subject === "" || subject === "err") setSubject("err");
      if (typework === "" || typework === "err") setTypework("err");
      if (dateTime === "" || dateTime === "err") setDateTime("err");
      if (unikalnost === "" || unikalnost === "err") setUnikalnost("err");
      if (numstr === "" || numstr === "err") setNumstr("err");
      if (telephone === "" || telephone === "err") setTelephone("err");
      if (email === "" || email === "err") setEmail("err");
    } else {
      disableBodyScroll(main.current);
      let url = domen + "/mailerphp/send.php";
      fetch(url, {
        method: "POST",
        // headers: {
        //   "content-type": "application/x-www-form-urlencoded",
        // },
        body: dataform,
        // "&theme=" +
        // theme +
        // "&subject=" +
        // subject +
        // "&typework=" +
        // typework +
        // "&dateTime=" +
        // dateTime +
        // "&unikalnost=" +
        // unikalnost +
        // "&koments=" +
        // koments +
        // "&telephone=" +
        // telephone +
        // "&email=" +
        // email +
        // "&messangers=" +
        // messangers,
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          if (data) {
            setErrormes("Ваш заказ успешно отправлен в проработку");
            setExecstate((x) => !x);
          } else {
            setErrormes("Ошибка отправки! Обратитесь к администрации сервиса");
            setExecstate((x) => !x);
          }
          setTheme("");
          setSubject("");
          setTypework("");
          setDateTime("");
          setUnikalnost("");
          setNumstr("");
          setKoments("");
          setTelephone("");
          setEmail("");
          setMessangers("");
          setAddfiles("");
        });
    }
  }

  return (
    <main className="position-relative" ref={main}>
      <Helmet>
        <meta
          name="keywords"
          content="студенческие работы, заказ, реферат, курсовая работа, ок, окстудентам, студент, помощь, эссе, отчет, презентация, сделать, копирайтинг, доклад"
        />
        <meta
          name="description"
          content="Заказать уникальную, или купить: курсовую, дипломную, реферат, эссе, презентацию, отчёт по практике и т.д."
        />
      </Helmet>

      <div className={`messok__backfon ${execstate ? "messok__backfon_active" : ""}`}></div>
      <div
        className={`messok text-center ${execstate ? "messok_active" : ""} ${
          errormes === "Ваш заказ успешно отправлен в проработку"
            ? "messok__color_ok"
            : "messok__color_err"
        }`}
      >
        {errormes}
        <input
          type="submit"
          value="ОK"
          className={`messok__but ${
            errormes === "Ваш заказ успешно отправлен в проработку"
              ? "messok__but_ok"
              : "messok__but_err"
          }`}
          onClick={() => {
            setExecstate((x) => !x);
            enableBodyScroll(main.current);
          }}
        />
      </div>

      {/* <h6 className="text-center mt-4 mb-3 text-secondary">
        Компания "OKstudentam" занимается написанием студенческих работ. Мы выполнили уже более
        50000 работ различного типа и сложности. Выполняем практически весь спектр типов работ.
        Пишем по всем дисциплинам где нет объемных узкоспециализированных расчетов.
      </h6> */}

      <h2 className="text-center mt-5 mb-4">Определите ориентировочную стоимость своего заказа</h2>

      <Fade duration={1200} triggerOnce={true}>
        <form className="form mb-4">
          <div className="blockform">
            <label>
              <div className="labelfirstform">Предмет Вашей работы:</div>
              <select
                name="themeR"
                className="inpfirstform"
                onChange={(e) => setThemeR(e.target.value)}
              >
                <option value="aterskmaster">Актерское мастерство</option>
                <option value="antikrupr">Антикризисное управление</option>
                <option value="astronom">Астрономия</option>
                <option value="banki">Банковское дело</option>
                <option value="bozopgizni">Безопасность жизнедеятельности</option>
                <option value="bibliotech">Библиотечно-информационная деятельность</option>
                <option value="biologi">Биология</option>
                <option value="veterinar">Ветеринария</option>
                <option value="vnesneekonom">Внешнеэкономическая деятельность</option>
                <option value="vodniresursi">Водные биоресурсы и аквакультура</option>
                <option value="geografi">География</option>
                <option value="gostbizness">Гостиничное дело</option>
                <option value="gosmunuprav">Государственное и муниципальное управление</option>
                <option value="money">Деньги</option>
                <option value="docsarxiv">Документоведение и архивоведение</option>
                <option value="estestvoznan">Естествознание</option>
                <option value="invest">Инвестиции</option>
                <option value="innovacmenedg">Инновационный менеджмент</option>
                <option value="iskustvo">Искусство</option>
                <option value="history">История</option>
                <option value="konfliktilogi">Конфликтология</option>
                <option value="kraeved">Краеведение</option>
                <option value="kulinar">Кулинария</option>
                <option value="literat">Литература</option>
                <option value="logika">Логика</option>
                <option value="logistic">Логистика</option>
                <option value="marketing">Маркетинг</option>
                <option value="medicina">Медицина</option>
                <option value="megdunarotn">Международные отношения</option>
                <option value="menedgment">Менеджмент</option>
                <option value="menedgmentorg">Менеджмент организации</option>
                <option value="makroekonom">Микро-, макроэкономика</option>
                <option value="music">Музыка</option>
                <option value="nalogi">Налоги</option>
                <option value="orgrazv">Организационное развитие</option>
                <option value="parikmaher">Парикмахерское искусство</option>
                <option value="pedagogika">Педагогика</option>
                <option value="politologi">Политология</option>
                <option value="pravo">Право и юриспруденция</option>
                <option value="proizvmarketing">Производственный маркетинг и менеджмент</option>
                <option value="psihologi">Психология</option>
                <option value="reklama">Реклама и PR</option>
                <option value="religia">Религия</option>
                <option value="cenniebumagi">Рынок ценных бумаг</option>
                <option value="sviazsobshestv">Связи с общественностью</option>
                <option value="socialwork">Социальная работа</option>
                <option value="sociologi">Социология</option>
                <option value="standartiz">Стандартизация</option>
                <option value="strahovanie">Страхование</option>
                <option value="tamognia">Таможенное дело</option>
                <option value="teoriaupravl">Теория управления</option>
                <option value="texnproduktitovari">
                  Технология продовольственных продуктов и товаров
                </option>
                <option value="tovaroved">Товароведение</option>
                <option value="torgovlia">Торговое дело</option>
                <option value="turism">Туризм</option>
                <option value="upravlkach">Управление качеством</option>
                <option value="upravlpers">Управление персоналом</option>
                <option value="fizkultura">Физическая культура</option>
                <option value="filosifia">Философия</option>
                <option value="finmenedgment">Финансовый менеджмент</option>
                <option value="finkredit">Финансы и кредит</option>
                <option value="cenoobr">Ценообразование и оценка бизнеса</option>
                <option value="ekologi">Экология</option>
                <option value="ekonomika">Экономика</option>
                <option value="etika">Этика</option>
              </select>
            </label>
          </div>

          <div className="blockform">
            <label>
              <div className="labelfirstform">Тип Вашей работы:</div>
              <select
                name="typeR"
                className="inpfirstform"
                onChange={(e) => setTypeofWorkR(e.target.value)}
              >
                <option value="buzinessplan">Бизнес-план</option>
                <option value="diplomna">Дипломная работа</option>
                <option value="doklad">Доклад</option>
                <option value="kontrolnai">Контрольная работа</option>
                <option value="kopirait">Копирайтинг</option>
                <option value="kursova">Курсовая работа</option>
                <option value="magisterska">Магистерская диссертация</option>
                <option value="monografia">Монография</option>
                <option value="otveti">Ответы на вопросы</option>
                <option value="otchet">Отчёт по практике</option>
                <option value="prezentacia">Презентация</option>
                <option value="referat">Реферат</option>
                <option value="recenz">Рецензия</option>
                <option value="sochinen">Сочинения</option>
                <option value="statia">Статья</option>
                <option value="statiavak">Статья ВАК</option>
                <option value="tvorchwork">Творческая работа</option>
                <option value="esse">Эссе</option>
              </select>
            </label>
          </div>

          <div className="blockform">
            <label>
              <div className="labelfirstform">Количество листов:</div>
              <input
                type="text"
                name="numlistsR"
                className={`inpfirstform ${numlistsR === "err" ? "inpfirstform_error" : ""}`}
                maxLength="3"
                onInput={validNum}
                onChange={(e) => setNumlistR(e.target.value)}
              />
            </label>
          </div>
          <div className="blockform">
            <label>
              <div className="labelfirstform">Требуемая уникальность:</div>
              <select
                name="unikalnostR"
                className="inpfirstform"
                onChange={(e) => setUnikalnostR(e.target.value)}
              >
                <option value="none">без уникальности</option>
                <option value="morethen25">не менее 25%</option>
                <option value="morethen50">не менее 50%</option>
                <option value="morethen75">не менее 75%</option>
              </select>
            </label>
          </div>
          <div className="blockform">
            <label>
              <div className="labelfirstform">Срок исполнения:</div>
              <select
                name="themeR"
                className="inpfirstform"
                onChange={(e) => setTimeLimitR(e.target.value)}
              >
                <option value="1">1 день</option>
                <option value="2_3">2-3 дня</option>
                <option value="4_5">4-5 дней</option>
                <option value="6">более 6 дней</option>
              </select>
            </label>
          </div>

          <div className="blockbut text-center">
            <input type="submit" name="but" value="Рассчитать" className="but" onClick={calc} />
          </div>
          <div className="rezult text-center">
            Ориентировочная стоимость Вашего заказа: {rezultR} грн
          </div>
        </form>
      </Fade>

      <h2 className="text-center mt-5 mb-4 position-relative">
        Заполните форму для размещения заказа <div className="metka" ref={titleform}></div>
      </h2>

      <Fade duration={1200} direction="up" triggerOnce={true}>
        <p className="text-center mb-4">
          Просьба, при заказе работы указывать полный объём Ваших (или ВУЗа) требований. В противном
          случае мы будем вынуждены соблюдать только общепринятые стандарты. Если будут обнаружены
          ошибки (по нашей вине), они незамедлительно будут исправлены.
        </p>
      </Fade>

      <form className="form pb-2" ref={formmail}>
        <div className="blockform">
          <label htmlFor="fulltheme">
            <div className={`labelsecondform ${theme === "err" ? "labelerror" : ""}`}>
              * Тема работы:
            </div>
          </label>
          <textarea
            name="theme"
            id="fulltheme"
            className={`inpsecondform ${theme === "err" ? "inpsecondform_error" : ""}`}
            rows="3"
            onChange={(e) => {
              setTheme(e.target.value);
              setErrormes("");
            }}
            value={theme === "err" ? "" : theme}
          />
        </div>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${subject === "err" ? "labelerror" : ""}`}>
              * Предмет:
            </div>
          </label>
          <textarea
            type="text"
            name="subject"
            className={`inpsecondform ${subject === "err" ? "inpsecondform_error" : ""}`}
            rows="2"
            onChange={(e) => {
              setSubject(e.target.value);
              setErrormes("");
            }}
            value={subject === "err" ? "" : subject}
            placeholder="педагогика, психология, менеджмент, экономика и т.д."
          />
        </div>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${typework === "err" ? "labelerror" : ""}`}>
              * Тип работы:
            </div>
          </label>
          <textarea
            type="text"
            name="typework"
            className={`inpsecondform ${typework === "err" ? "inpsecondform_error" : ""}`}
            rows="2"
            onChange={(e) => {
              setTypework(e.target.value);
              setErrormes("");
            }}
            value={typework === "err" ? "" : typework}
            placeholder="диплом, курсовая, реферат, эссе, доклад, презентация и т.д."
          />
        </div>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${dateTime === "err" ? "labelerror" : ""}`}>
              * Срок сдачи:
            </div>
          </label>

          {/* <input
            type="date"
            name="dateTime"
            className={`inpsecondform ${dateTime === "err" ? "inpsecondform_error" : ""}`}
            rows="1"
            onChange={(e) => {
              setDateTime(e.target.value);
              setErrormes("");
            }}
            value={dateTime === "err" ? "" : dateTime}
            placeholder="04 cентября 2023 22:50 по Киеву"
          /> */}

          <div>
            <DatePicker
              name="dateTime"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setDateTime(date);
                setErrormes("");
              }}
              // dateFormat="dd/MM/yyyy"
              locale="ru" // Установка локализации
              className={`inpsecondform ${dateTime === "err" ? "inpsecondform_error" : ""}`}
              dateFormat="dd/MM/yyyy"
              // timeInputLabel="Time:"
              // showTimeInput
              // timeInput={customTimeInput}
              // dateFormat="dd/MM/yyyy HH:mm"
              value={dateTime === "err" ? "" : dateTime}
              placeholderText="дата/месяц/год"
            />
          </div>
        </div>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${unikalnost === "err" ? "labelerror" : ""}`}>
              * Уникальность:
            </div>
          </label>
          <textarea
            type="text"
            name="unikalnost"
            className={`inpsecondform ${unikalnost === "err" ? "inpsecondform_error" : ""}  `}
            rows="1"
            onChange={(e) => {
              validNum(e);
              setUnikalnost(e.target.value);
              setErrormes("");
            }}
            value={unikalnost === "err" ? "" : unikalnost}
            placeholder="система проверки уникальности (полное название) и % "
          />
        </div>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${numstr === "err" ? "labelerror" : ""}`}>
              * Количество страниц:
            </div>
          </label>
          <textarea
            type="text"
            name="numstr"
            className={`inpsecondform ${numstr === "err" ? "inpsecondform_error" : ""}  `}
            rows="1"
            onChange={(e) => {
              validNum(e);
              setNumstr(e.target.value);
              setErrormes("");
            }}
            value={numstr === "err" ? "" : numstr}
            placeholder="по умолчанию шрифт Times New Roman, размер 14 интервал, 1.5"
          />
        </div>
        <div className="blockform">
          <label>
            <div className="labelsecondform">Комментарии к заказу:</div>
          </label>
          <textarea
            type="text"
            name="koments"
            className="inpsecondform"
            rows="5"
            onChange={(e) => {
              setKoments(e.target.value);
            }}
            value={koments}
            placeholder="здесь Вы можете прописать все чего нет в форме заказа: иную систему проверки, нужный вам шрифт и интервалы, указать личные пожелания или особые требования"
          />
        </div>
        <div className="blockform">
          <label htmlFor="getfiles" className="getfiles">
            <input
              id="getfiles"
              type="file"
              name="addfiles[]"
              className="uploadfile"
              multiple
              onChange={(e) => setAddfiles(Array.from(e.target.files))}
            />
            <div className="but_gray">Файлы к заказу</div>
          </label>
          <ul className="orders__files-list">
            {addfiles ? addfiles.map((file, index) => <li key={index}>{file.name}</li>) : ""}
          </ul>
        </div>

        <h5 className="mb-3 mt-4">Данные для связи с Вами:</h5>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${telephone === "err" ? "labelerror" : ""}`}>
              * телефон:
            </div>
            <br />
            <input
              type="text"
              name="telephone"
              className={`inpsecondform inpsecondform_contacts ${
                telephone === "err" ? "inpsecondform_error" : ""
              }`}
              // onInput={validNum}
              onChange={(e) => {
                validNum(e);
                setTelephone(e.target.value);
                setErrormes("");
              }}
              value={telephone === "err" ? "" : telephone}
            />
          </label>
        </div>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${email === "err" ? "labelerror" : ""}`}>
              * e-mail:
            </div>
            <br />
            <input
              type="text"
              name="email"
              className={`inpsecondform inpsecondform_contacts ${
                email === "err" ? "inpsecondform_error" : ""
              }`}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrormes("");
              }}
              value={email === "err" ? "" : email}
            />
          </label>
        </div>
        <div className="blockform">
          <label>
            <div className="labelsecondform"> viber, telegram:</div>
            <br />
            <input
              type="text"
              name="messangers"
              className="inpsecondform inpsecondform_contacts"
              onChange={(e) => setMessangers(e.target.value)}
              value={messangers}
            />
          </label>
        </div>

        <label className="primechanie">* - поля обязательные для заполнения</label>

        <div className="blockbut text-center">
          <input type="submit" name="but" value="Отправить" className="but" onClick={sendorder} />
        </div>
      </form>

      <Zoom duration={1200} triggerOnce={true}>
        <p className="text-center mt-4 fs-5">
          <em>
            Предварительная проработка Вашего заказа - 1 час. <br />
            Окончательная стоимость заказа может несколько отличаться от расчетной.
          </em>
        </p>
      </Zoom>
    </main>
  );
}

export default MainRU;
