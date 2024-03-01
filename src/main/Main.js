import React, { useRef, useState } from "react";
import "./main.css";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import CalculatCost from "./state";
import { Fade, Zoom } from "react-awesome-reveal";

function Main() {
  let lang = useSelector((dat) => dat.language);
  const [themeR, setThemeR] = useState("history");
  const [typeofWorkR, setTypeofWorkR] = useState("referat");
  const [timeLimitR, setTimeLimitR] = useState("1");
  const [unikalnostR, setUnikalnostR] = useState("none");
  const [numlistsR, setNumlistR] = useState(0);
  const [rezultR, setRezult] = useState(0);
  let main = useRef();

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

  return (
    <main className="position-relative" ref={main}>
      <Helmet>
        <meta
          name="keywords"
          content="студенческие работы, заказ, реферат, курсовая работа, ок, окстудентам, студент, помощь, эссе, отчет, презентация, сделать, копирайтинг, доклад, студентські роботи, замовлення, реферат, курсова робота, ок, окстудентам, студент, допомога, есе, звіт, презентація, зробити, копирайтинг, доповідь"
        />
        <meta
          name="description"
          content={
            lang === "ru"
              ? "Заказать уникальную, или купить: курсовую, дипломную, реферат, эссе, презентацию, отчёт по практике и т.д."
              : "Замовити унікальну, або купити: курсову, дипломну, реферат, есе, презентацію, звіт з практики та інше"
          }
        />
      </Helmet>

      <div className="about">
        <h1 className="about__title">OKstudentam</h1>
        <p className="about__paragraf">{lang === "ru" ? "это..." : "це..."}</p>
        <ul className="about__list">
          <li className="about__list-item">
            {lang === "ru"
              ? "индивидуальный подход к каждой теме"
              : "індивідуальний підхід до кожної теми"}
          </li>
          <li className="about__list-item">
            {lang === "ru"
              ? "соблюдение академических стандартов"
              : "дотримання академічних стандартів"}
          </li>
          <li className="about__list-item">
            {lang === "ru" ? "профессиональное изложение темы" : "професійний виклад теми"}
          </li>
          <li className="about__list-item">
            {lang === "ru" ? "обязательное соблюдение сроков" : "обов'язкове дотримання термінів"}
          </li>
          <li className="about__list-item">
            {lang === "ru"
              ? "поддержка и обратная связь на всех этапах"
              : "підтримка та зворотний зв'язок на всіх етапах"}
          </li>
          <li className="about__list-item">
            {lang === "ru"
              ? "простота в создании заказа и оплате"
              : "простота у створенні замовлення та оплаті"}
          </li>
          <li className="about__list-item">
            {lang === "ru" ? "прозрачное сотрудничество" : "прозора співпраця"}
          </li>
        </ul>
        <h3 className="about__message">
          {lang === "ru" ? (
            <p>
              Определите <br /> ориентировочную <br /> стоимость своего заказа
            </p>
          ) : (
            <p>
              Визначте <br /> орієнтовну вартість <br /> свого замовлення
            </p>
          )}
        </h3>
        <div className="round1">
          <div className="about__add">
            {lang === "ru"
              ? '"Мы не идеальны, но стремимся к лучшему"'
              : '"Ми не ідеальні, але прагнемо кращого"'}
          </div>
        </div>
        <div className="round2"></div>
        <div className="round3"></div>
        <div className="round4"></div>
        <div className="round5"></div>
        <div className="round6"></div>
        <div className="round7"></div>
        <div className="round8"></div>
        <div className="round9"></div>
        <div className="round10"></div>
        <div className="roundleft1"></div>
        <div className="roundleft2"></div>
        <div className="roundleft3"></div>
        <div className="roundleft4"></div>
        <div className="roundleft5"></div>
        <div className="roundleft6"></div>
      </div>

      {/* <h2 className="text-center mt-5 mb-4">Определите ориентировочную стоимость своего заказа</h2> */}

      <Fade duration={1200} triggerOnce={true}>
        <form className="form mb-4">
          <div className="blockform">
            <label>
              <div className="labelfirstform">
                {lang === "ru" ? "Предмет Вашей работы:" : "Предмет Вашої роботи:"}
              </div>
              <select
                name="themeR"
                className="inpfirstform"
                onChange={(e) => setThemeR(e.target.value)}
              >
                <option value="aterskmaster">
                  {lang === "ru" ? "Актерское мастерство" : "Акторська майстерність"}
                </option>
                <option value="antikrupr">
                  {lang === "ru" ? "Антикризисное управление" : "Антикризове управління"}
                </option>
                <option value="astronom">{lang === "ru" ? "Астрономия" : "Астрономія"}</option>
                <option value="banki">
                  {lang === "ru" ? "Банковское дело" : "Банківська справа"}
                </option>
                <option value="bozopgizni">
                  {lang === "ru" ? "Безопасность жизнедеятельности" : "Безпека життєдіяльності"}
                </option>
                <option value="bibliotech">
                  {lang === "ru"
                    ? "Библиотечно-информационная деятельность"
                    : "Бібліотечно-інформаційна діяльність"}
                </option>
                <option value="biologi">{lang === "ru" ? "Биология" : "Біологія"}</option>
                <option value="veterinar">{lang === "ru" ? "Ветеринария" : "Ветеринарія"}</option>
                <option value="vnesneekonom">
                  {lang === "ru"
                    ? "Внешнеэкономическая деятельность"
                    : "Зовнішньоекономічна діяльність"}
                </option>
                <option value="vodniresursi">
                  {lang === "ru"
                    ? "Водные биоресурсы и аквакультура"
                    : "Водні біоресурси та аквакультура"}
                </option>
                <option value="geografi">{lang === "ru" ? "География" : "Географія"}</option>
                <option value="gostbizness">
                  {lang === "ru" ? "Гостиничное дело" : "Готельна справа"}
                </option>
                <option value="gosmunuprav">
                  {lang === "ru"
                    ? "Государственное и муниципальное управление"
                    : "Державне та муніципальне управління"}
                </option>
                <option value="money">{lang === "ru" ? "Деньги" : "Гроші"}</option>
                <option value="docsarxiv">
                  {lang === "ru"
                    ? "Документоведение и архивоведение"
                    : "Документознавство та архівознавство"}
                </option>
                <option value="estestvoznan">
                  {lang === "ru" ? "Естествознание" : "Природознавство"}
                </option>
                <option value="invest">{lang === "ru" ? "Инвестиции" : "Інвестиції"}</option>
                <option value="innovacmenedg">
                  {lang === "ru" ? "Инновационный менеджмент" : "Інноваційний менеджмент"}
                </option>
                <option value="iskustvo">
                  {lang === "ru" ? "Искусство" : "Мистецтво"}Искусство
                </option>
                <option value="history">{lang === "ru" ? "История" : "Історія"}</option>
                <option value="konfliktilogi">
                  {lang === "ru" ? "Конфликтология" : "Конфліктологія"}
                </option>
                <option value="kraeved">{lang === "ru" ? "Краеведение" : "Краєзнавство"}</option>
                <option value="kulinar">{lang === "ru" ? "Кулинария" : "Кулінарія"}</option>
                <option value="literat">{lang === "ru" ? "Литература" : "Література"}</option>
                <option value="logika">{lang === "ru" ? "Логика" : "Логіка"}Логика</option>
                <option value="logistic">{lang === "ru" ? "Логистика" : "Логістика"}</option>
                <option value="marketing">{lang === "ru" ? "Маркетинг" : "Маркетинг"}</option>
                <option value="medicina">{lang === "ru" ? "Медицина" : "Медицина"}</option>
                <option value="megdunarotn">
                  {lang === "ru" ? "Международные отношения" : "Міжнародні відносини"}
                </option>
                <option value="menedgment">{lang === "ru" ? "Менеджмент" : "Менеджмент"}</option>
                <option value="menedgmentorg">
                  {lang === "ru" ? "Менеджмент организации" : "Менеджмент організації"}
                </option>
                <option value="makroekonom">
                  {lang === "ru" ? "Микро-, макроэкономика" : "Мікро-, макроекономіка"}
                </option>
                <option value="music">{lang === "ru" ? "Музыка" : "Музика"}</option>
                <option value="nalogi">{lang === "ru" ? "Налоги" : "Податки"}</option>
                <option value="orgrazv">
                  {lang === "ru" ? "Организационное развитие" : "Організаційний розвиток"}
                </option>
                <option value="parikmaher">
                  {lang === "ru" ? "Парикмахерское искусство" : "Перукарське мистецтво"}
                </option>
                <option value="pedagogika">{lang === "ru" ? "Педагогика" : "Педагогіка"}</option>
                <option value="politologi">{lang === "ru" ? "Политология" : "Політологія"}</option>
                <option value="pravo">
                  {lang === "ru" ? "Право и юриспруденция" : "Право та юриспруденція"}
                </option>
                <option value="proizvmarketing">
                  {lang === "ru"
                    ? "Производственный маркетинг и менеджмент"
                    : "Виробничий маркетинг та менеджмент"}
                </option>
                <option value="psihologi">{lang === "ru" ? "Психология" : "Психологія"}</option>
                <option value="reklama">{lang === "ru" ? "Реклама и PR" : "Реклама и PR"}</option>
                <option value="religia">{lang === "ru" ? "Религия" : "Релігія"}</option>
                <option value="cenniebumagi">
                  {lang === "ru" ? "Рынок ценных бумаг" : "Ринок цінних паперів"}
                </option>
                <option value="sviazsobshestv">
                  {lang === "ru" ? "Связи с общественностью" : "Зв'язки з громадськістю"}
                </option>
                <option value="socialwork">
                  {lang === "ru" ? "Социальная работа" : "Соціальна робота"}
                </option>
                <option value="sociologi">{lang === "ru" ? "Социология" : "Соціологія"}</option>
                <option value="standartiz">
                  {lang === "ru" ? "Стандартизация" : "Стандартизація"}
                </option>
                <option value="strahovanie">{lang === "ru" ? "Страхование" : "Страхування"}</option>
                <option value="tamognia">
                  {lang === "ru" ? "Таможенное дело" : "Митна справа"}
                </option>
                <option value="teoriaupravl">
                  {lang === "ru" ? "Теория управления" : "Теорія управління"}
                </option>
                <option value="texnproduktitovari">
                  {lang === "ru"
                    ? "Технология продовольственных продуктов и товаров"
                    : "Технологія продовольчих продуктів та товарів"}
                </option>
                <option value="tovaroved">
                  {lang === "ru" ? "Товароведение" : "Товарознавство"}
                </option>
                <option value="torgovlia">
                  {lang === "ru" ? "Торговое дело" : "Торгова справа"}
                </option>
                <option value="turism">{lang === "ru" ? "Туризм" : "Туризм"}</option>
                <option value="upravlkach">
                  {lang === "ru" ? "Управление качеством" : "Управління якістю"}
                </option>
                <option value="upravlpers">
                  {lang === "ru" ? "Управление персоналом" : "Управління персоналом"}
                </option>
                <option value="fizkultura">
                  {lang === "ru" ? "Физическая культура" : "Фізична культура"}
                </option>
                <option value="filosifia">{lang === "ru" ? "Философия" : "Філософія"}</option>
                <option value="finmenedgment">
                  {lang === "ru" ? "Финансовый менеджмент" : "Фінансовий менеджмент"}
                </option>
                <option value="finkredit">
                  {lang === "ru" ? "Финансы и кредит" : "Фінанси та Кредит"}
                </option>
                <option value="cenoobr">
                  {lang === "ru"
                    ? "Ценообразование и оценка бизнеса"
                    : "Ціноутворення та оцінка бізнесу"}
                </option>
                <option value="ekologi">{lang === "ru" ? "Экология" : "Екологія"}</option>
                <option value="ekonomika">{lang === "ru" ? "Экономика" : "Економіка"}</option>
                <option value="etika">{lang === "ru" ? "Этика" : "Етика"}</option>
              </select>
            </label>
          </div>

          <div className="blockform">
            <label>
              <div className="labelfirstform">
                {lang === "ru" ? "Тип Вашей работы:" : "Тип Вашої роботи:"}
              </div>
              <select
                name="typeR"
                className="inpfirstform"
                onChange={(e) => setTypeofWorkR(e.target.value)}
              >
                <option value="buzinessplan">
                  {lang === "ru" ? "Бизнес-план" : "Бізнес-план"}
                </option>
                <option value="diplomna">
                  {lang === "ru" ? "Дипломная работа" : "Дипломна робота"}
                </option>
                <option value="doklad">{lang === "ru" ? "Доклад" : "Доповідь"}</option>
                <option value="kontrolnai">
                  {lang === "ru" ? "Контрольная работа" : "Контрольна робота"}
                </option>
                <option value="kopirait">{lang === "ru" ? "Копирайтинг" : "Копирайтінг"}</option>
                <option value="kursova">
                  {lang === "ru" ? "Курсовая работа" : "Курсова робота"}
                </option>
                <option value="magisterska">
                  {lang === "ru" ? "Магистерская диссертация" : "Магістерська дисертація"}
                </option>
                <option value="monografia">{lang === "ru" ? "Монография" : "Монографія"}</option>
                <option value="otveti">
                  {lang === "ru" ? "Ответы на вопросы" : "Відповіді на запитання"}
                </option>
                <option value="otchet">
                  {lang === "ru" ? "Отчёт по практике" : "Звіт з практики"}
                </option>
                <option value="prezentacia">{lang === "ru" ? "Презентация" : "Презентація"}</option>
                <option value="referat">{lang === "ru" ? "Реферат" : "Реферат"}</option>
                <option value="recenz">{lang === "ru" ? "Рецензия" : "Рецензія"}</option>
                <option value="sochinen">{lang === "ru" ? "Сочинения" : "Твори"}</option>
                <option value="statia">{lang === "ru" ? "Статья" : "Стаття"}</option>
                <option value="statiavak">{lang === "ru" ? "Статья ВАК" : "Стаття ВАК"}</option>
                <option value="tvorchwork">
                  {lang === "ru" ? "Творческая работа" : "Творча робота"}
                </option>
                <option value="esse">{lang === "ru" ? "Эссе" : "Есе"}</option>
              </select>
            </label>
          </div>

          <div className="blockform">
            <label>
              <div className="labelfirstform">
                {lang === "ru" ? "Количество листов:" : "Кількість аркушів:"}
              </div>
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
              <div className="labelfirstform">
                {lang === "ru" ? "Требуемая уникальность:" : "Потрібна унікальність:"}
              </div>
              <select
                name="unikalnostR"
                className="inpfirstform"
                onChange={(e) => setUnikalnostR(e.target.value)}
              >
                <option value="none">
                  {lang === "ru" ? "без уникальности" : "без унікальності"}
                </option>
                <option value="morethen25">{lang === "ru" ? "не менее 25%" : "не менш 25%"}</option>
                <option value="morethen50">{lang === "ru" ? "не менее 50%" : "не менш 50%"}</option>
                <option value="morethen75">{lang === "ru" ? "не менее 75%" : "не менш 75%"}</option>
              </select>
            </label>
          </div>
          <div className="blockform">
            <label>
              <div className="labelfirstform">
                {lang === "ru" ? "Срок исполнения:" : "Терміновість:"}
              </div>
              <select
                name="themeR"
                className="inpfirstform"
                onChange={(e) => setTimeLimitR(e.target.value)}
              >
                <option value="1">{lang === "ru" ? "1 день" : "1 день"}</option>
                <option value="2_3">{lang === "ru" ? "2-3 дня" : "2-3 дні"}</option>
                <option value="4_5">{lang === "ru" ? "4-5 дней" : "4-5 днів"}</option>
                <option value="6">{lang === "ru" ? "более 6 дней" : "більше 6 днів"}</option>
              </select>
            </label>
          </div>

          <div className="blockbut text-center">
            <input type="submit" name="but" value="Рассчитать" className="but" onClick={calc} />
          </div>
          <div className="rezult text-center">
            {lang === "ru"
              ? "Ориентировочная стоимость Вашего заказа: "
              : "Орієнтовна вартість Вашого замовлення: "}
            {rezultR} грн
          </div>
        </form>
      </Fade>
      <Zoom duration={1200} triggerOnce={true}>
        <p className="text-center mt-4 fs-5">
          <em>
            {lang === "ru"
              ? "Окончательная стоимость оформленного Вами заказа может несколько отличаться от расчетной"
              : "Остаточна вартість оформленого Вами замовлення може дещо відрізнятись від розрахункової"}
          </em>
        </p>
      </Zoom>
    </main>
  );
}

export default Main;
