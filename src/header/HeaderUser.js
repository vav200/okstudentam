import React from "react";
import { useState } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";

function HeaderUser(props) {
  let nav = useNavigate();
  let lang = useSelector((dat) => dat.language);
  // let statenow = useSelector((dat) => dat);
  let dispatch = useDispatch();
  const [burgstate, setBurgstate] = useState(false);
  let main = React.createRef();
  let secondlvl = React.createRef();
  let formreg = React.createRef();
  let formenter = React.createRef();
  let formrecall = React.createRef();
  let domen = useSelector((dat) => dat.domen);

  // const password = "333";

  // // Генерация соли и хеширование пароля
  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(password, salt, (err, hash) => {
  //     if (err) throw err;
  //     // Теперь 'hash' содержит хеш пароля
  //     console.log(hash);
  //     // Отправка хеша на сервер
  //     // fetch('/api/register', { method: 'POST', body: { hash } });
  //   });
  // });

  const [secondlvlmenustate, setSecondlvlmenustate] = useState(false);
  const [loginpanel, setLoginpanel] = useState(false);
  const [errormes, setErrormes] = useState("");
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  // const [usersurname, setUsersurname] = useState("");
  const [userphone, setUserphone] = useState("");
  const [usermail, setUsermail] = useState("");
  const [userpass, setUserpass] = useState("");
  const [recallmail, setRecallmail] = useState("");
  const [recallmailstate, setRecallmailstate] = useState("");
  const [confirmmail, setConfirmmail] = useState("");
  const [dataregistration, setDataregistration] = useState();
  const [howEnter, setHowEnter] = useState("");

  function closeadm(e) {
    e.preventDefault();
    setLoginpanel((x) => !x);
    enableBodyScroll(main.current);
    setLogin("");
    setPass("");
    setUsername("");
    // setUsersurname("");
    setUserphone("");
    setUsermail("");
    setRecallmail("");
    setRecallmailstate("");
  }

  function enter(e) {
    let dataform = new FormData(formenter.current);
    e.preventDefault();
    if (lang === "ru") setErrormes("заполните поле");
    else setErrormes("заповніть поле");
    if (login === "" || login === "err" || pass === "" || pass === "err") {
      if (login === "" || login === "err") setLogin("err");
      if (pass === "" || pass === "err") setPass("err");
    } else {
      let url = domen + "/users/getUser.php";
      fetch(url, {
        method: "POST",
        body: dataform,
      })
        .then((data) => {
          if (!data.ok) {
            throw new Error(`Network response was not ok, status: ${data.status}`);
          }
          return data.json();
        })
        .then((data) => {
          // console.log(data);
          if (data) {
            setLoginpanel((x) => !x);
            enableBodyScroll(main.current);
            setLogin("");
            setPass("");
            dispatch({ type: "USERDATA", data: data });
            nav("/personalarea");
          } else {
            if ((lang = "ru")) setErrormes("неверный логин или пароль");
            else setErrormes("невірний логін або пароль");
            setLogin("err");
            setPass("err");
          }
        })
        .catch((error) => {
          // Обработка ошибок
          console.error("Ошибка fetch:", error);
          setLoginpanel("error_servise");
        });
    }
  }

  function getpass(e) {
    let dataform = new FormData(formrecall.current);
    e.preventDefault();
    if (lang === "ru") setErrormes("заполните поле");
    else setErrormes("заповніть поле");
    if (recallmail === "" || recallmail === "err") {
      if (recallmail === "" || recallmail === "err") setRecallmail("err");
    } else {
      let url = domen + "/users/getPassword.php";
      fetch(url, {
        method: "POST",
        body: dataform,
      })
        .then((data) => {
          if (!data.ok) {
            throw new Error(`Network response was not ok, status: ${data.status}`);
          }
          return data.text();
        })
        .then((data) => {
          // console.log(data);
          if (data && data !== "none mail") {
            setRecallmailstate("ok");
          } else if (data && data === "none mail") {
            setRecallmailstate("");
            if (lang === "ru") setErrormes("на эту почту не зарегистрирован аккаунт");
            else setErrormes("на цю пошту не зареєстрований акаунт");
            setUsermail("err");
          } else {
            setRecallmailstate("");
            setLoginpanel("error_servise");
          }
        })
        .catch((error) => {
          // Обработка ошибок
          console.error("Ошибка fetch:", error);
          setLoginpanel("error_servise");
        });
    }
  }

  function registration(e) {
    let dataform = new FormData(formreg.current);
    e.preventDefault();
    if (lang === "ru") setErrormes("заполнять обязательно");
    else setErrormes("заповнювати обов'язково");
    if (
      username === "" ||
      username === "err" ||
      // usersurname === "" ||
      // usersurname === "err" ||
      userphone === "" ||
      userphone === "err" ||
      usermail === "" ||
      usermail === "err"
    ) {
      if (username === "" || username === "err") setUsername("err");
      // if (usersurname === "" || usersurname === "err") setUsersurname("err");
      if (userphone === "" || userphone === "err") setUserphone("err");
      if (usermail === "" || usermail === "err") setUsermail("err");
    } else {
      let generpass = Number(Math.round(Math.random() * 1000000));
      setUserpass(generpass);
      // console.log(generpass);
      dataform.append("userpass", generpass);
      dataform.append("userstate", "customer");
      setDataregistration(dataform);

      let url = domen + "/users/confirmMail.php";
      fetch(url, {
        method: "POST",
        body: dataform,
      })
        .then((data) => {
          if (!data.ok) {
            throw new Error(`Network response was not ok, status: ${data.status}`);
          }
          return data.text();
        })
        .then((data) => {
          // console.log(data);
          if (data && data !== "repeat mail") {
            setLoginpanel("confirmmail");
          } else if (data && data === "repeat mail") {
            if (lang === "ru") setErrormes("на эту почту уже зарегистрирован аккаунт");
            else setErrormes("на цю пошту вже зареєстрований акаунт");
            setUsermail("err");
          } else {
            setLoginpanel("error_servise");
          }
        })
        .catch((error) => {
          // Обработка ошибок
          console.error("Ошибка fetch:", error);
          setLoginpanel("error_servise");
        });
    }
  }

  function confirm(e) {
    e.preventDefault();
    if (lang === "ru") setErrormes("заполните поле");
    else setErrormes("заповніть поле");
    if (confirmmail === "" || confirmmail === "err") {
      if (confirmmail === "" || confirmmail === "err") setConfirmmail("err");
    } else {
      if (userpass == confirmmail) {
        setConfirmmail("");

        let url = domen + "/users/createUser.php";
        fetch(url, {
          method: "POST",
          body: dataregistration,
        })
          .then((data) => {
            if (!data.ok) {
              throw new Error(`Network response was not ok, status: ${data.status}`);
            }
            return data.text();
          })
          .then((data) => {
            // console.log(data);
            if (data) {
              setLoginpanel((x) => !x);
              enableBodyScroll(main.current);
              setLogin("");
              setPass("");
              setUsername("");
              // setUsersurname("");
              setUserphone("");
              setUsermail("");
              setRecallmail("");
              dispatch({
                type: "USERDATA",
                data: {
                  userstate: dataregistration.get("userstate"),
                  usermail: dataregistration.get("usermail"),
                  username: dataregistration.get("username"),
                },
              });
              nav("/personalarea");
            } else {
              setLoginpanel("error_servise");
            }
          })
          .catch((error) => {
            // Обработка ошибок
            console.error("Ошибка fetch:", error);
            setLoginpanel("error_servise");
          });
      } else {
        if ((lang = "ru")) setErrormes("неверный пароль");
        else setErrormes("невірний пароль");
        setConfirmmail("err");
      }
    }
  }

  // useEffect(() => {
  //   function hidemenu() {
  //     let currposition = window.scrollY;
  //     setScrollpos(currposition);

  //     if (currposition > 60) {
  //       setSecondlvlmenustate(true);
  //     } else setSecondlvlmenustate(false);
  //   }
  //   window.onscroll = hidemenu;
  //   return () => {
  //     window.onscroll = hidemenu;
  //   };
  // }, [scrollpos]);

  return (
    <header className="header position-relative" ref={main}>
      <div className={`burg__backfon ${burgstate ? "burg__backfon_active" : ""}`}></div>
      <nav className="header__nav">
        <div className="header__nav-wrap">
          <div className="header__nav-firstlvl">
            <div className="header__nav-firstlvl-block1">
              <div
                className={`burg ${burgstate ? "burg_active" : ""}`}
                onClick={() => {
                  setBurgstate((x) => !x);
                  disableBodyScroll(main.current);
                }}
              >
                <div className="burg__line burg__line_first"></div>
                <div className="burg__line burg__line_second"></div>
                <div className="burg__line burg__line_third"></div>
                <div className="burg__line burg__line_fourth"></div>
              </div>
              <Link to="/" className="header__logo-link">
                <h3 className="header__logo">OKstudentam</h3>
              </Link>
            </div>
            <div className="header__textmin">
              {lang === "ru" ? "Время работы: c 9-00 до 21-00" : "Час роботи: c 9-00 до 21-00"}
              <br />
              {lang === "ru" ? "Работаем без выходных" : "Працюємо без вихідних"}
            </div>

            <div className="blocklogobut">
              <div
                className="but logo__but"
                onClick={() => {
                  disableBodyScroll(main.current);
                  setHowEnter("order");
                  setLoginpanel("enter");
                }}
              >
                {lang === "ru" ? "Заказать работу" : "Замовити роботу"}
              </div>
            </div>
          </div>

          <div
            className={`header__nav-secondlvl ${
              secondlvlmenustate ? "header__nav-secondlvl_disable" : ""
            }`}
            ref={secondlvl}
          >
            <ul className="header__menu">
              <li className="menu__item">
                <NavLink
                  to="/"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                  onClick={() => dispatch({ type: "orderperehodnull", data: "" })}
                >
                  {lang === "ru" ? "Главная" : "Головна"}
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/finishedworks"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  {lang === "ru" ? "Готовые работы" : "Готові роботи"}
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/guarantees"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  {lang === "ru" ? "Гарантии" : "Гарантії"}
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/helper"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  {lang === "ru" ? "Помощь" : "Допомога"}
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink
                  to="/kontacts"
                  className={({ isActive }) => `${isActive ? "menu__link_active" : "menu__link"}`}
                >
                  {lang === "ru" ? "Контакты" : "Контакти"}
                </NavLink>
              </li>
            </ul>
            <div className="langpanel">
              <div className="switch">
                <input
                  type="checkbox"
                  className="switch__box"
                  onChange={() => {
                    lang === "ru"
                      ? dispatch({ type: "SETLANGUAGE", data: "ua" })
                      : dispatch({ type: "SETLANGUAGE", data: "ru" });
                    dispatch({ type: "orderperehodnull", data: "" });
                  }}
                  checked={lang === "ru" ? false : true}
                />
              </div>

              <div
                className="user"
                onClick={() => {
                  disableBodyScroll(main.current);
                  setLoginpanel("enter");
                  setHowEnter("");
                }}
              ></div>
            </div>
          </div>
        </div>
      </nav>

      <div className={`header__add-wrap position-relative ${props.path === "/" ? "d-none" : ""}`}>
        <div className="header__add">
          <div className={lang === "ru" ? "header__add-name" : "header__add-name_ukr"}></div>
        </div>
      </div>

      {/* -------------Панель входа ------------------- */}

      <div className={`userpanel__backfon ${loginpanel ? "userpanel__backfon_active" : ""}`}></div>
      <div className={`userpanel ${loginpanel === "enter" ? "userpanel_active" : ""}`}>
        <h5 className={howEnter === "order" ? "d-none" : ""}>
          {lang === "ru" ? "Вход в кабинет" : "Вхід до кабінету"}
        </h5>
        <p className={`userpanel__inform ${howEnter !== "order" ? "d-none" : ""}`}>
          {lang === "ru"
            ? "Для оформления заказа войдите в учетную запись или зарегистрируйтесь"
            : "Для оформлення замовлення увійдіть до облікового запису або зареєструйтесь"}
        </p>
        <hr />
        <form ref={formenter}>
          <div className="userpanel__inpblock">
            <label>
              <span className="userpanel__param">e-mail:</span>
              <input
                name="usermail"
                type="text"
                className={`userpanel__inp ${login === "err" ? "userpanel__inp_error" : ""}`}
                onChange={(e) => setLogin(e.target.value)}
                value={login === "err" ? "" : login}
              />
            </label>
            <div
              className={`userpanel__errormess ${
                login === "err" ? "userpanel__errormess_active" : ""
              }`}
            >
              {errormes}
            </div>
          </div>
          <div className="userpanel__inpblock last">
            <label>
              <span className="userpanel__param">Пароль:</span>
              <input
                name="userpass"
                type="password"
                className={`userpanel__inp ${pass === "err" ? "userpanel__inp_error" : ""}`}
                onChange={(e) => setPass(e.target.value)}
                value={pass === "err" ? "" : pass}
              />
            </label>
            <div
              className={`userpanel__errormess ${
                pass === "err" ? "userpanel__errormess_active" : ""
              }`}
            >
              {errormes}
            </div>
          </div>
          <div
            className="d-block userpanel__link"
            onClick={() => {
              setLoginpanel("recallpass");
              setLogin("");
              setPass("");
            }}
          >
            {lang === "ru" ? "Напомнить пароль" : "Нагадати пароль"}
          </div>
          <div className="userpanel__inpblockbut mt-4">
            <input type="submit" value="Войти" className="but userpanel__but" onClick={enter} />
          </div>
          <div
            className="text-center d-block mt-3 userpanel__link"
            onClick={() => {
              setLoginpanel("registration");
              setLogin("");
              setPass("");
            }}
          >
            {lang === "ru" ? "Зарегистрироваться" : "Зареєструватись"}
          </div>
        </form>
        <div className="drop-menu-close" onClick={closeadm}>
          <span className="drop-close-line"></span>
          <span className="drop-close-line"></span>
        </div>
      </div>

      {/* -------------Панель регистрации ------------------- */}

      <div className={`userpanel ${loginpanel === "registration" ? "userpanel_active" : ""}`}>
        <h5 className="">{lang === "ru" ? "Регистрация" : "Реєстрація"}</h5>
        <hr />
        <form ref={formreg}>
          <div className="userpanel__inpblock">
            <label>
              <span className="userpanel__param">{lang === "ru" ? "Имя:" : "Ім'я:"}</span>
              <input
                name="username"
                type="text"
                className={`userpanel__inp ${username === "err" ? "userpanel__inp_error" : ""}`}
                onChange={(e) => setUsername(e.target.value)}
                value={username === "err" ? "" : username}
              />
            </label>
            <div
              className={`userpanel__errormess ${
                username === "err" ? "userpanel__errormess_active" : ""
              }`}
            >
              {errormes}
            </div>
          </div>
          {/* <div className="userpanel__inpblock">
            <label>
              <span className="userpanel__param">{lang === "ru" ? "Фамилия:" : "Прізвище:"}</span>
              <input
                name="usersurname"
                type="text"
                className={`userpanel__inp ${usersurname === "err" ? "userpanel__inp_error" : ""}`}
                onChange={(e) => setUsersurname(e.target.value)}
                value={usersurname === "err" ? "" : usersurname}
              />
            </label>
            <div
              className={`userpanel__errormess ${
                usersurname === "err" ? "userpanel__errormess_active" : ""
              }`}
            >
              {errormes}
            </div>
          </div> */}
          <div className="userpanel__inpblock">
            <label>
              <span className="userpanel__param">Телефон:</span>
              <input
                name="userphone"
                type="tel"
                className={`userpanel__inp ${userphone === "err" ? "userpanel__inp_error" : ""}`}
                onChange={(e) => setUserphone(e.target.value)}
                value={userphone === "err" ? "" : userphone}
              />
            </label>
            <div
              className={`userpanel__errormess ${
                userphone === "err" ? "userpanel__errormess_active" : ""
              }`}
            >
              {errormes}
            </div>
          </div>
          <div className="userpanel__inpblock">
            <label>
              <span className="userpanel__param">e-mail:</span>
              <input
                name="usermail"
                type="text"
                className={`userpanel__inp ${usermail === "err" ? "userpanel__inp_error" : ""}`}
                onChange={(e) => setUsermail(e.target.value)}
                value={usermail === "err" ? "" : usermail}
              />
            </label>
            <div
              className={`userpanel__errormess ${
                usermail === "err" ? "userpanel__errormess_active" : ""
              }`}
            >
              {errormes}
            </div>
          </div>

          <div className="userpanel__inpblock">
            <p className="userpanel__smalltext">
              {lang === "ru"
                ? "Регистрируясь, вы соглашаетесь с условиями положения об обработке и защите персональных данных и пользовательским соглашением пользователя"
                : "Реєструючись, ви погоджуєтесь з умовами положення про обробку та захист персональних даних та користувальницькою угодою користувача"}
            </p>
          </div>

          <div className="userpanel__inpblockbut mt-4">
            <input
              type="submit"
              value={lang === "ru" ? "Зарегистрироваться" : "Зареєструватись"}
              className="but userpanel__but"
              onClick={registration}
            />
          </div>
          <div
            className="text-center d-block mt-3 userpanel__link"
            onClick={() => {
              setLoginpanel("enter");
              setUsername("");
              // setUsersurname("");
              setUserphone("");
              setUsermail("");
            }}
          >
            {lang === "ru" ? "Я уже зарегестрирован" : "Я вже зареєстрований"}
          </div>
        </form>
        <div className="drop-menu-close" onClick={closeadm}>
          <span className="drop-close-line"></span>
          <span className="drop-close-line"></span>
        </div>
      </div>

      {/* -------------Восстановление пароля ------------------- */}

      <div className={`userpanel ${loginpanel === "recallpass" ? "userpanel_active" : ""}`}>
        <h5 className="">{lang === "ru" ? "Восстановление пароля" : "Відновлення паролю"}</h5>
        <hr />
        <form ref={formrecall} className={`${recallmailstate ? "d-none" : "d-block"}`}>
          <div className="userpanel__inpblock">
            <label>
              <span className="userpanel__param">e-mail:</span>
              <input
                name="usermail"
                type="text"
                className={`userpanel__inp ${recallmail === "err" ? "userpanel__inp_error" : ""}`}
                onChange={(e) => setRecallmail(e.target.value)}
                value={recallmail === "err" ? "" : recallmail}
              />
            </label>
            <div
              className={`userpanel__errormess ${
                recallmail === "err" ? "userpanel__errormess_active" : ""
              }`}
            >
              {errormes}
            </div>
          </div>

          <div className="userpanel__inpblockbut mt-4">
            <input
              type="submit"
              value={lang === "ru" ? "Выслать пароль" : "Надіслати пароль"}
              className="but userpanel__but"
              onClick={getpass}
            />
          </div>
          <div
            className="text-center d-block mt-3 userpanel__link"
            onClick={() => {
              setLoginpanel("enter");
              setRecallmail("");
            }}
          >
            {lang === "ru" ? "Вспомнил пароль" : "Згадав пароль"}
          </div>
        </form>
        <span className={`userpanel__text ${recallmailstate ? "d-block" : "d-none"}`}>
          {lang === "ru"
            ? "Ваш пароль успешно отправлен на указанную почту"
            : "Ваш пароль успішно надіслано на вказану пошту"}
        </span>
        <div className="drop-menu-close" onClick={closeadm}>
          <span className="drop-close-line"></span>
          <span className="drop-close-line"></span>
        </div>
      </div>

      {/* -------------Подтверждение почты ------------------- */}

      <div className={`userpanel ${loginpanel === "confirmmail" ? "userpanel_active" : ""}`}>
        <h5 className="">{lang === "ru" ? "Ввод пароля" : "Введення пароля"}</h5>
        <hr />
        <div className="userpanel__inpblock">
          <p className="userpanel__smalltext">
            {lang === "ru"
              ? 'Введите пароль из сообщения отправленного на почту указанную при регистрации. Письмо с паролем может находиться в папке "спам" в Вашей почте'
              : 'Введіть пароль із повідомлення надісланого на пошту, вказану під час реєстрації. Лист із паролем може перебувати у папці "спам" у Вашій пошті'}
          </p>
        </div>
        <div className="userpanel__inpblock">
          <label>
            <span className="userpanel__param">пароль:</span>
            <input
              type="text"
              className={`userpanel__inp ${confirmmail === "err" ? "userpanel__inp_error" : ""}`}
              onChange={(e) => setConfirmmail(e.target.value)}
              value={confirmmail === "err" ? "" : confirmmail}
            />
          </label>
          <div
            className={`userpanel__errormess ${
              confirmmail === "err" ? "userpanel__errormess_active" : ""
            }`}
          >
            {errormes}
          </div>
        </div>
        <div className="userpanel__inpblockbut mt-4">
          <input
            type="submit"
            value={lang === "ru" ? "Подтвердить" : "Підтвердити"}
            className="but userpanel__but"
            onClick={confirm}
          />
        </div>
        <div className="drop-menu-close" onClick={closeadm}>
          <span className="drop-close-line"></span>
          <span className="drop-close-line"></span>
        </div>
      </div>

      <div className={`userpanel ${loginpanel === "error_servise" ? "userpanel_active" : ""}`}>
        <h5 className="">{lang === "ru" ? "Ошибка" : "Помилка"}</h5>
        <hr />
        <div className="userpanel__inpblock">
          <p className="userpanel__smalltext">
            {lang === "ru"
              ? "Возникла непредвиденная ошибка. Обратитесь к администрации сервиса"
              : "Виникла непередбачена помилка. Зверніться до адміністрації сервісу"}
          </p>
        </div>

        <div className="drop-menu-close" onClick={closeadm}>
          <span className="drop-close-line"></span>
          <span className="drop-close-line"></span>
        </div>
      </div>

      {/* ----------------Дроп-меню------------------ */}
      <div className={`header__drop-menu ${burgstate ? "header__drop-menu_active" : ""}`}>
        <h3 className="dropmenu__logo">OKstudentam</h3>
        <ul className="header__drop-list">
          <li className="header__drop-item">
            <Link
              to="/"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
                dispatch({ type: "orderperehodnull", data: "" });
              }}
            >
              {lang === "ru" ? "Главная" : "Головна"}
            </Link>
          </li>
          <li className="header__drop-item">
            <Link
              to="/finishedworks"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
              }}
            >
              {lang === "ru" ? "Готовые работы" : "Готові роботи"}
            </Link>
          </li>
          <li className="header__drop-item">
            <Link
              to="/guarantees"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
              }}
            >
              {lang === "ru" ? "Гарантии" : "Гарантії"}
            </Link>
          </li>
          <li className="header__drop-item">
            <Link
              to="/helper"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
              }}
            >
              {lang === "ru" ? "Помощь" : "Допомога"}
            </Link>
          </li>
          <li className="header__drop-item">
            <Link
              to="/kontacts"
              className="header__drop-link"
              onClick={() => {
                setBurgstate((x) => !x);
                enableBodyScroll(main.current);
              }}
            >
              {lang === "ru" ? "Контакты" : "Контакти"}
            </Link>
          </li>
          <li className="header__drop-item">
            <div className="langpanel">
              <div className="switch">
                <input
                  type="checkbox"
                  className="switch__box"
                  onChange={() => {
                    lang === "ru"
                      ? dispatch({ type: "SETLANGUAGE", data: "ua" })
                      : dispatch({ type: "SETLANGUAGE", data: "ru" });
                    dispatch({ type: "orderperehodnull", data: "" });
                    enableBodyScroll(main.current);
                  }}
                  checked={lang === "ru" ? false : true}
                />
              </div>
              <div
                className="user"
                onClick={() => {
                  disableBodyScroll(main.current);
                  setLoginpanel("enter");
                  setBurgstate(false);
                }}
              ></div>
            </div>
          </li>
        </ul>
        <div className="blockdropbut">
          <div
            className="but dropmenu__but"
            onClick={() => {
              setBurgstate((x) => !x);
              enableBodyScroll(main.current);
              dispatch({ type: "orderperehod", data: "1" });
              setHowEnter("order");
              setLoginpanel("enter");
            }}
          >
            {lang === "ru" ? "Заказать работу" : "Замовити роботу"}
          </div>
        </div>

        <div className="header__textmin_dropmenu">
          {lang === "ru" ? "Время работы: c 9-00 до 21-00" : "Час роботи: c 9-00 до 21-00"}
          <br />
          {lang === "ru" ? "Работаем без выходных" : "Працюємо без вихідних"}
        </div>

        <div
          className="drop-menu-close"
          onClick={() => {
            setBurgstate(false);
            enableBodyScroll(main.current);
          }}
        >
          <span className="drop-close-line"></span>
          <span className="drop-close-line"></span>
        </div>
      </div>
    </header>
  );
}

export default HeaderUser;
