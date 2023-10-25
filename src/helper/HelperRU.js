import "./helper.css";
import { Helmet } from "react-helmet";

function HelperRU() {
  return (
    <main>
      <Helmet>
        <meta
          name="keywords"
          content="текст, введение, содержание, заключение, уникальность, повышение, презентация"
        />
        <meta
          name="description"
          content="видеоролики с полезной информацией по выполнению и оформлению студенческих работ работ"
        />
      </Helmet>

      <div className="helper__wrap">
        <p className="helper__descr">
          Часто при написании работы, особенно у новичков, много времени тратитcя на приведение
          текста в надлежащий вид. Иногда не совсем понятно где ставить пропуск, где нет, какой
          шрифт применять и т.д. Это уже не говоря в целом про понимание того как должны выглядеть
          работы структурно, какого характера текст добавлять, чего стоит избегать. Для ответов на
          такие вопросы рекомендуем просмотреть видеоролик с нашего канала.
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
          Введение достаточно сложная часть работы ввиду того что часто состоит из ряда
          специфических элементов, без знания особенностей изложения которых можно легко ошибиться.
          Чтобы этого не произошло смотри видеоролик ниже с нашего ютуб канала.
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
          Заключение это иногда едва ли не единственная часть, наравне с введением, которую детально
          просматривает преподаватель при проверке работы. Неудивительно, ведь заключение это Ваша
          работа в миниатюре, и поэтому особенно важно знать как его создавать.
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
          В приведенном ниже ролике мы раскрываем особенности и рекомендации по повышению
          уникальности текста разными способами, как техническими, так и ручными. Описаны методы
          быстрого форсированного повышения оригинальности и методы детальной, качественной
          обработки. На примере показан процесс повышения оригинальности методом синонимизирования.
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
          Презентация это частый спутник дипломов и курсовых во время их защиты, но вот в отличии от
          последних в университетских методичках вы вряд ли найдете советы по созданию презентацию.
          В то же время, несмотря на очевидность предназначения презентации - презентовать работу,
          тут есть что обсудить. В приложенном видео ниже изложены особенности наполнения текстом и
          графическим материалом, связь презентации и основной работы, презентации и речи, базовые
          функции PowerPoint.
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

export default HelperRU;
