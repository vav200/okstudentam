import "./finishedworks.css";
import { finishedworks } from "./baseworks";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Searchpanel from "./Searchpanel";

export default function Outworks() {
  let elmasfreework = useSelector((dat) => dat.elmasfreework);
  return (
    <main>
      <Helmet>
        <meta name="keywords" content={finishedworks[elmasfreework].keywords} />
        <meta name="description" content={finishedworks[elmasfreework].description} />
      </Helmet>
      <Searchpanel />
      <h1 className="fs-4 text-center mb-4 namefinwork">{finishedworks[elmasfreework].name}</h1>
      <div className="soderg">
        {/* <h5 className="text-center mt-4 mb-2">ЗМІСТ</h5> */}
        {finishedworks[elmasfreework].cont}
        <h5 className="text-center mt-4 mb-2">Вступ</h5>
        {finishedworks[elmasfreework].intro}
        <h5 className="text-center mt-4 mb-2">Висновки</h5>
        {finishedworks[elmasfreework].conclus}
      </div>
      <div className="downloadblock">
        <a
          className="downloadbut text-center"
          href={`https://okstudentam.com.ua/freeworks/${finishedworks[elmasfreework].key}.docx`}
          download
        >
          Скачать работу полностью
        </a>
      </div>
    </main>
  );
}
