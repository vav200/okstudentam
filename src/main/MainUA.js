import React, { useEffect } from "react";
import "./main.css";
import { useState } from "react";
import CalculatCost from "./state";
import { Helmet } from "react-helmet";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useSelector } from "react-redux";
import { Fade, Zoom } from "react-awesome-reveal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk"; // Импорт украинской локализации

registerLocale("uk", uk); // Регистрация украинской локализации

function MainUA() {
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
        // "theme=" +
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
            setErrormes("Ваше замовлення успішно відправлено в опрацювання");
            setExecstate((x) => !x);
          } else {
            setErrormes("Помилка надсилання! Зверніться до адміністрації сервісу");
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
          content="студентські роботи, замовлення, реферат, курсова робота, ок, окстудентам, студент, допомога, есе, звіт, презентація, зробити, копирайтинг, доповідь"
        />
        <meta
          name="description"
          content="Замовити унікальну, або купити: курсову, дипломну, реферат, есе, презентацію, звіт з практики та інше"
        />
      </Helmet>

      <div className={`messok__backfon ${execstate ? "messok__backfon_active" : ""}`}></div>
      <div className={`messok text-center ${execstate ? "messok_active" : ""} `}>
        {errormes}
        <input
          type="submit"
          value="Ок"
          className={`messok__but ${
            errormes === "Ваше замовлення успішно відправлено в опрацювання"
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
        Компанія "OKstudentam" займається написанням студентських робіт. Ми виконали вже понад 50000
        робіт різного типу та складності. Виконуємо майже весь спектр типів робіт. Пишемо з усіх
        дисциплін де немає об'ємних вузькоспеціалізованих розрахунків.
      </h6> */}
      <h2 className="text-center mt-5 mb-4">Визначте орієнтовну вартість замовлення</h2>

      <Fade duration={1500} triggerOnce={true}>
        <form className="form mb-4">
          <div className="blockform">
            <label>
              <div className="labelfirstform">Предмет Вашої роботи:</div>
              <select
                name="themeR"
                className="inpfirstform"
                onChange={(e) => setThemeR(e.target.value)}
              >
                <option value="aterskmaster">Акторська майстерність</option>
                <option value="antikrupr">Антикризове управління</option>
                <option value="astronom">Астрономія</option>
                <option value="banki">Банківська справа</option>
                <option value="bozopgizni">Безпека життєдіяльності</option>
                <option value="bibliotech">Бібліотечно-інформаційна діяльність</option>
                <option value="biologi">Біологія</option>
                <option value="veterinar">Ветеринарія</option>
                <option value="vnesneekonom">Зовнішньоекономічна діяльність</option>
                <option value="vodniresursi">Водні біоресурси та аквакультура</option>
                <option value="geografi">Географія</option>
                <option value="gostbizness">Готельна справа</option>
                <option value="gosmunuprav">Державне та муніципальне управління</option>
                <option value="money">Гроші</option>
                <option value="docsarxiv">Документознавство та архівознавство</option>
                <option value="estestvoznan">Природознавство</option>
                <option value="invest">Інвестиції</option>
                <option value="innovacmenedg">Інноваційний менеджмент</option>
                <option value="iskustvo">Мистецтво</option>
                <option value="history">Історія</option>
                <option value="konfliktilogi">Конфліктологія</option>
                <option value="kraeved">Краєзнавство</option>
                <option value="kulinar">Кулінарія</option>
                <option value="literat">Література</option>
                <option value="logika">Логіка</option>
                <option value="logistic">Логістика</option>
                <option value="marketing">Маркетинг</option>
                <option value="medicina">Медицина</option>
                <option value="megdunarotn">Міжнародні відносини</option>
                <option value="menedgment">Менеджмент</option>
                <option value="menedgmentorg">Менеджмент організації</option>
                <option value="makroekonom">Мікро-, макроекономіка</option>
                <option value="music">Музика</option>
                <option value="nalogi">Податки</option>
                <option value="orgrazv">Організаційний розвиток</option>
                <option value="parikmaher">Перукарське мистецтво</option>
                <option value="pedagogika">Педагогіка</option>
                <option value="politologi">Політологія</option>
                <option value="pravo">Право та юриспруденція</option>
                <option value="proizvmarketing">Виробничий маркетинг та менеджмент</option>
                <option value="psihologi">Психологія</option>
                <option value="reklama">Реклама и PR</option>
                <option value="religia">Релігія</option>
                <option value="cenniebumagi">Ринок цінних паперів</option>
                <option value="sviazsobshestv">Зв'язки з громадськістю</option>
                <option value="socialwork">Соціальна робота</option>
                <option value="sociologi">Соціологія</option>
                <option value="standartiz">Стандартизація</option>
                <option value="strahovanie">Страхування</option>
                <option value="tamognia">Митна справа</option>
                <option value="teoriaupravl">Теорія управління</option>
                <option value="texnproduktitovari">
                  Технологія продовольчих продуктів та товарів
                </option>
                <option value="tovaroved">Товарознавство</option>
                <option value="torgovlia">Торгова справа</option>
                <option value="turism">Туризм</option>
                <option value="upravlkach">Управління якістю</option>
                <option value="upravlpers">Управління персоналом</option>
                <option value="fizkultura">Фізична культура</option>
                <option value="filosifia">Філософія</option>
                <option value="finmenedgment">Фінансовий менеджмент</option>
                <option value="finkredit">Фінанси та Кредит</option>
                <option value="cenoobr">Ціноутворення та оцінка бізнесу</option>
                <option value="ekologi">Екологія</option>
                <option value="ekonomika">Економіка</option>
                <option value="etika">Етика</option>
              </select>
            </label>
          </div>

          <div className="blockform">
            <label>
              <div className="labelfirstform">Тип Вашої роботи:</div>
              <select
                name="typeR"
                className="inpfirstform"
                onChange={(e) => setTypeofWorkR(e.target.value)}
              >
                <option value="buzinessplan">Бізнес план</option>
                <option value="diplomna">Дипломна робота</option>
                <option value="doklad">Доповідь</option>
                <option value="kontrolnai">Контрольна робота</option>
                <option value="kopirait">Копирайтінг</option>
                <option value="kursova">Курсова робота</option>
                <option value="magisterska">Магістерська дисертація</option>
                <option value="monografia">Монографія</option>
                <option value="otveti">Відповіді на запитання</option>
                <option value="otchet">Звіт з практики</option>
                <option value="prezentacia">Презентація</option>
                <option value="referat">Реферат</option>
                <option value="recenz">Рецензія</option>
                <option value="sochinen">Твори</option>
                <option value="statia">Стаття</option>
                <option value="statiavak">Стаття ВАК</option>
                <option value="tvorchwork">Творча робота</option>
                <option value="esse">Есе</option>
              </select>
            </label>
          </div>

          <div className="blockform">
            <label>
              <div className="labelfirstform">Кількість аркушів:</div>
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
              <div className="labelfirstform">Потрібна унікальність:</div>
              <select
                name="unikalnostR"
                className="inpfirstform"
                onChange={(e) => setUnikalnostR(e.target.value)}
              >
                <option value="none">без унікальності</option>
                <option value="morethen25">не менш 25%</option>
                <option value="morethen50">не менш 50%</option>
                <option value="morethen75">не менш 75%</option>
              </select>
            </label>
          </div>
          <div className="blockform">
            <label>
              <div className="labelfirstform">Терміновість:</div>
              <select
                name="themeR"
                className="inpfirstform"
                onChange={(e) => setTimeLimitR(e.target.value)}
              >
                <option value="1">1 день</option>
                <option value="2_3">2-3 дні</option>
                <option value="4_5">4-5 днів</option>
                <option value="6">більше 6 днів</option>
              </select>
            </label>
          </div>

          <div className="blockbut text-center">
            <input type="submit" name="but" value="Розрахувати" className="but" onClick={calc} />
          </div>
          <div className="rezult text-center">
            Орієнтовна вартість Вашого замовлення: {rezultR} грн
          </div>
        </form>
      </Fade>

      <h2 className="text-center mt-5 mb-4  position-relative">
        Заповніть форму для розміщення замовлення <div className="metka" ref={titleform}></div>
      </h2>

      <Fade duration={1200} direction="up" triggerOnce={true}>
        <p className="text-center mb-4">
          Прохання при замовленні роботи вказувати повний обсяг Ваших (або ВНЗ) вимог. Інакше ми
          будемо змушені дотримуватися лише загальноприйнятих стандартів. Якщо буде виявлено помилки
          (з нашої вини), вони негайно будуть виправлені.
        </p>
      </Fade>

      <form className="form pb-2" ref={formmail}>
        <div className="blockform">
          <label htmlFor="fulltheme">
            <div className={`labelsecondform ${theme === "err" ? "labelerrorUA" : ""}`}>
              * Тема роботи:
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
            <div className={`labelsecondform ${subject === "err" ? "labelerrorUA" : ""}`}>
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
            placeholder="педагогіка, психологія, менеджмент, економіка тощо"
          />
        </div>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${typework === "err" ? "labelerrorUA" : ""}`}>
              * Тип роботи:
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
            placeholder="диплом, курсова, реферат, есе, доповідь, презентація тощо"
          />
        </div>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${dateTime === "err" ? "labelerrorUA" : ""}`}>
              * Термін здачі:
            </div>
          </label>
          {/* <textarea
            type="text"
            name="dateTime"
            className={`inpsecondform ${dateTime === "err" ? "inpsecondform_error" : ""}`}
            rows="1"
            onChange={(e) => {
              setDateTime(e.target.value);
              setErrormes("");
            }}
            value={dateTime === "err" ? "" : dateTime}
            placeholder="04 вересня 2023 22:50 по Києву"
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
              locale="uk" // Установка локализации
              className={`inpsecondform ${dateTime === "err" ? "inpsecondform_error" : ""}`}
              dateFormat="dd/MM/yyyy"
              // timeInputLabel="Time:"
              // showTimeInput
              // timeInput={customTimeInput}
              // dateFormat="dd/MM/yyyy HH:mm"
              value={dateTime === "err" ? "" : dateTime}
              placeholderText="дата/місяць/рік"
            />
          </div>
        </div>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${unikalnost === "err" ? "labelerrorUA" : ""}`}>
              * Унікальність:
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
            placeholder="система перевірки унікальності (повна назва) та %"
          />
        </div>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${numstr === "err" ? "labelerror" : ""}`}>
              * Кількість сторінок:
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
            placeholder="за промовчанням шрифт Times New Roman, розмір 14 інтервал, 1.5"
          />
        </div>
        <div className="blockform">
          <label>
            <div className="labelsecondform">Коментар до замовлення:</div>
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
            placeholder="тут Ви можете прописати все, чого немає у формі замовлення: іншу систему перевірки, потрібний вам шрифт та інтервали, вказати особисті побажання або особливі вимоги"
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
            <div className="but_gray">Файли до замовлення</div>
          </label>
          <ul className="orders__files-list">
            {addfiles ? addfiles.map((file, index) => <li key={index}>{file.name}</li>) : ""}
          </ul>
        </div>

        <h5 className="mb-3 mt-4">Дані для зв'язку з Вами:</h5>
        <div className="blockform">
          <label>
            <div className={`labelsecondform ${telephone === "err" ? "labelerrorUA" : ""}`}>
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
            <div className={`labelsecondform ${email === "err" ? "labelerrorUA" : ""}`}>
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

        <label className="primechanie">* - поля обов'язкові для заповнення</label>

        <div className="blockbut text-center">
          <input type="submit" name="but" value="Відправити" className="but" onClick={sendorder} />
        </div>
      </form>

      <Zoom duration={1200} triggerOnce={true}>
        <p className="text-center mt-4 fs-5">
          <em>
            Попереднє опрацювання Вашого замовлення - 1 година. <br />
            Остаточна вартість замовлення може дещо відрізнятись від розрахункової.
          </em>
        </p>
      </Zoom>
    </main>
  );
}

export default MainUA;
