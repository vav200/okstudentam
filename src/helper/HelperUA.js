import "./helper.css";
import { Helmet } from "react-helmet";

function HelperUA() {
  return (
    <main>
      <Helmet>
        <meta
          name="keywords"
          content="текст, вступ, зміст, висновок, унікальність, підвищення, презентація"
        />
        <meta
          name="description"
          content="відеоролики з корисною інформацією щодо виконання та оформлення студетських робіт"
        />
      </Helmet>
      <div className="helper__wrap">
        <p className="helper__descr">
          Часто при написанні роботи, особливо у новачків, багато часу витрачається на приведення
          тексту в правильний вигляд. Іноді не зовсім зрозуміло де ставити перепустку, де ні, який
          шрифт застосовувати та інше. Це вже не кажучи загалом про розуміння того, як повинні
          виглядати роботи структурно, якого характеру додавати текст, чого варто уникати. Для
          відповідей на такі питання рекомендуємо переглянути відео з нашого каналу.
        </p>
        <div className="utubeBlock">
          <iframe
            className="iframe"
            src="https://www.youtube.com/embed/FSDKtwOamZc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <p className="helper__descr">
          Вступ досить складна частина роботи через те, що часто складається з ряду специфічних
          елементів, без знання особливостей викладу яких можна помилитися. Щоб цього не сталося,
          дивись відеоролик нижче з нашого ютуб каналу.
        </p>
        <div className="utubeBlock">
          <iframe
            className="iframe"
            src="https://www.youtube.com/embed/oMLGDpaZ3m4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <p className="helper__descr">
          Висновок це іноді чи не єдина частина, нарівні із запровадженням, яку детально переглядає
          викладач під час перевірки роботи. Не дивно, адже висновок це Ваша робота в мініатюрі, і
          тому особливо важливо знати, як його створювати.
        </p>
        <div className="utubeBlock">
          <iframe
            className="iframe"
            src="https://www.youtube.com/embed/A76KpyyIIZw"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <p className="helper__descr">
          У наведеному нижче ролику ми розкриваємо особливості та рекомендації щодо підвищення
          унікальності тексту у різний спосіб, як технічним, так і ручним. Описано методи швидкого
          форсування підвищення оригінальності та методи детальної, якісної обробки. На прикладі
          показано процес підвищення оригінальності методом синонімізації.
        </p>
        <div className="utubeBlock">
          <iframe
            className="iframe"
            src="https://www.youtube.com/embed/3xzj7Y470ZA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <p className="helper__descr">
          Презентація це частий супутник дипломів та курсових під час їхнього захисту, але ось на
          відміну від останніх в університетських методичках ви навряд чи знайдете поради щодо
          створення презентації. У той же час, незважаючи на очевидність призначення презентації –
          презентувати роботу, Тут є що обговорити. У доданому відео нижче викладено особливості
          наповнення текстом та графічним матеріалом, зв'язок презентації та основної роботи,
          презентації та мовлення, базові функції PowerPoint.
        </p>
        <div className="utubeBlock">
          <iframe
            className="iframe"
            src="https://www.youtube.com/embed/Wrnp_R31c3A"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </main>
  );
}

export default HelperUA;
