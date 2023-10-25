import React from "react";
import "./main.css";
import { useState } from "react";
import CalculatCost from "./state";
import { Helmet } from "react-helmet";

export default function MainUAcopy(props) {
  let formmail = React.createRef();
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
  const [koments, setKoments] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [messangers, setMessangers] = useState("");
  const [addfiles, setAddfiles] = useState();
  const [proof, setProof] = useState("");
  const [errormess, setErrormes] = useState("");

  function validNum(e) {
    const regEx = /[^\d]/g;
    let inp = e.target.value.replace(regEx, "");
    e.target.value = inp;
  }
  function calc(e) {
    e.preventDefault();
    setRezult(CalculatCost(themeR, typeofWorkR, timeLimitR, unikalnostR, numlistsR));
  }

  function sendorder(e) {
    let dataform = new FormData(formmail.current);
    for (let key of dataform.keys()) {
      console.log(`${key}: ${dataform.get(key)}`);
    }
    e.preventDefault();
    setProof("");
    if (
      theme == "" ||
      subject == "" ||
      typework == "" ||
      dateTime == "" ||
      unikalnost == "" ||
      telephone == "" ||
      email == ""
    ) {
      setErrormes("Заповніть усі поля із зірочкою *");
    } else {
      setErrormes("");
      fetch("https://okstudentam.com.ua/mailerphp/send.php", {
        method: "POST",
        body: dataform,
      })
        .then((data) => data.text())
        .then((data) => {
          console.log(data);
          if (data) {
            setProof("Ваш запит успішно надіслано");
          } else setProof("Помилка! Зверніться до адміністрації сервісу.");
          setTheme("");
          setSubject("");
          setTypework("");
          setDateTime("");
          setUnikalnost("");
          setKoments("");
          setTelephone("");
          setEmail("");
          setMessangers("");
          setErrormes("");
          setAddfiles("");
        });
    }
  }

  return (
    <main>
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
      <h6 className="text-center mt-4 mb-3">
        Компанія "OKstudentam" займається написанням студентських робіт. Ми виконали вже понад 50000
        робіт різного типу та складності. Виконуємо майже весь спектр типів робіт. Пишемо з усіх
        дисциплін де немає об'ємних вузькоспеціалізованих розрахунків.
      </h6>
      <h2 className="text-center mt-4 mb-4">Визначте орієнтовну вартість замовлення</h2>
      <form action="" className="form mb-4">
        <div className="blockform">
          <label>
            <div className="labelfirstform">Виберіть предмет Вашої роботи:</div>
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
            <div className="labelfirstform">Виберіть тип Вашої роботи:</div>
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
            <div className="labelfirstform">Введіть кількість аркушів:</div>
            <input
              type="text"
              name="numlistsR"
              className="inpfirstform"
              maxLength="3"
              onInput={validNum}
              onChange={(e) => setNumlistR(e.target.value)}
            />
          </label>
        </div>
        <div className="blockform">
          <label>
            <div className="labelfirstform">Виберіть потрібну унікальність:</div>
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

      <h2 className="text-center mt-4 mb-2">Заповніть форму для розміщення замовлення</h2>
      <p className="text-center">
        Прохання при замовленні роботи вказувати повний обсяг Ваших (або ВНЗ) вимог. Інакше ми
        будемо змушені дотримуватися лише загальноприйнятих стандартів. Якщо буде виявлено помилки
        (з нашої вини), вони негайно будуть виправлені.
      </p>
      <form action="" className="form pb-1" ref={formmail}>
        <div className="blockform">
          <label htmlFor="fulltheme">
            <div className="labelsecondform">* Повна тема роботи:</div>
          </label>
          <textarea
            name="theme"
            id="fulltheme"
            className="inpsecondform"
            rows="3"
            onChange={(e) => {
              setTheme(e.target.value);
              setErrormes("");
            }}
            value={theme}
          />
        </div>
        <div className="blockform">
          <label>
            <div className="labelsecondform">* Предмет:</div>
          </label>
          <textarea
            type="text"
            name="subject"
            className="inpsecondform"
            rows="2"
            onChange={(e) => {
              setSubject(e.target.value);
              setErrormes("");
            }}
            value={subject}
            placeholder="педагогіка, психологія, менеджмент, економіка тощо"
          />
        </div>
        <div className="blockform">
          <label>
            <div className="labelsecondform">* Тип роботи:</div>
          </label>
          <textarea
            type="text"
            name="typework"
            className="inpsecondform"
            rows="2"
            onChange={(e) => {
              setTypework(e.target.value);
              setErrormes("");
            }}
            value={typework}
            placeholder="диплом, курсова, реферат, есе, доповідь, презентація тощо"
          />
        </div>
        <div className="blockform">
          <label>
            <div className="labelsecondform">* Дата та час здачі:</div>
          </label>
          <textarea
            type="text"
            name="dateTime"
            className="inpsecondform"
            rows="1"
            onChange={(e) => {
              setDateTime(e.target.value);
              setErrormes("");
            }}
            value={dateTime}
            placeholder="04 вересня 2023 22:50 по Києву"
          />
        </div>
        <div className="blockform">
          <label>
            <div className="labelsecondform">* Необхідна унікальність:</div>
          </label>
          <textarea
            type="text"
            name="unikalnost"
            className="inpsecondform"
            rows="1"
            onChange={(e) => {
              setUnikalnost(e.target.value);
              setErrormes("");
            }}
            value={unikalnost}
            placeholder="система перевірки унікальності (повна назва) та % "
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
          />
        </div>
        <div className="blockform">
          <label>
            <div className="labelthirdform"> Файли до заказу:</div>
            <input
              type="file"
              name="addfiles[]"
              className="inpsecondform"
              multiple
              onChange={(e) => setAddfiles(e.target.value)}
              value={addfiles}
            />
          </label>
        </div>

        <h5 className="mb-3 mt-4">Дані для зв'язку з вами:</h5>
        <div className="blockform">
          <label>
            <div className="labelthirdform"> * телефон:</div>
            <input
              type="text"
              name="telephone"
              className="inpfirstform"
              onInput={validNum}
              onChange={(e) => {
                setTelephone(e.target.value);
                setErrormes("");
              }}
              value={telephone}
            />
          </label>
        </div>
        <div className="blockform">
          <label>
            <div className="labelthirdform"> * e-mail:</div>
            <input
              type="text"
              name="email"
              className="inpfirstform"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrormes("");
              }}
              value={email}
            />
          </label>
        </div>
        <div className="blockform">
          <label>
            <div className="labelthirdform"> viber, telegram:</div>
            <input
              type="text"
              name="messangers"
              className="inpfirstform"
              onChange={(e) => setMessangers(e.target.value)}
              value={messangers}
            />
          </label>
        </div>
        <label className="primechanie">* - поля обов'язкові для заповнення</label>
        <p className="errormes">{errormess}</p>
        <p className="sendmes">{proof}</p>

        <div className="blockbut text-center">
          <input type="submit" name="but" value="Відправити" className="but" onClick={sendorder} />
        </div>
      </form>
      <p className="text-center mt-2">
        <em>
          Попереднє опрацювання Вашого замовлення - 1 робочий день. <br />
          Остаточна вартість замовлення може дещо відрізнятись від розрахункової.
        </em>
      </p>
    </main>
  );
}
