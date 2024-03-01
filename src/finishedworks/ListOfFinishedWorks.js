import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ListOfFinishedWorks() {
  let lang = useSelector((dat) => dat.language);
  let dispatch = useDispatch();
  let domen = useSelector((dat) => dat.domen);
  let works = useSelector((dat) => dat.finishedWorksList);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [secondclick, setSecondclick] = useState(false);

  const itemsPerPage = 30;
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  function alfporiadok(x, y) {
    return x.namework.localeCompare(y.namework, "uk-UA");
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          className={currentPage === i ? "paginat_liactive" : ""}
          key={i}
          onClick={() => {
            setCurrentPage(i);
            setSecondclick(true);
          }}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  function getListOfWorks() {
    let url = domen + "/works/getListOfWorks.php";
    fetch(url, {
      method: "GET",
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error(`Network response was not ok, status: ${data.status}`);
        }
        return data.json();
      })
      .then((data) => {
        // console.log("data", data);
        data = data.sort(alfporiadok);
        dispatch({ type: "SETFINISHEDWORKSLIST", data: data });
        setTotalPages(Math.ceil(data.length / itemsPerPage));
        setCurrentItems(data.slice(indexOfFirstItem, indexOfLastItem));
      });
  }
  useEffect(() => {
    if (!secondclick) {
      getListOfWorks();
    } else {
      setTotalPages(Math.ceil(works.length / itemsPerPage));
      setCurrentItems(works.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [currentPage]);
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    scrollToTop();
  }, [currentPage]);

  return (
    <>
      <ul className="listworks">
        {works ? (
          currentItems.map((item, ind) => (
            <li className="listworks__item" key={item.keywork}>
              <Link
                to={`/finishedworks/${item.keywork}`}
                onClick={() => {
                  dispatch({ type: "KEYFREEWORK", data: [item.keywork, ind] });
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: item.namework }} />
              </Link>
              <p className="workinfo">
                {item.typework} | {item.numpages} стр.
              </p>
            </li>
          ))
        ) : (
          <p className="mt-4 ps-3 orders__zagruzka"></p>
        )}
      </ul>
      <ul className="paginat">{renderPageNumbers()}</ul>
    </>
  );
}

export default ListOfFinishedWorks;
