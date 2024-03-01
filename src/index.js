import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import Popper from "popper.js";
// import { hydrate, render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);

const rootElement = document.getElementById("root"); // (или ваш id при олтличии)

const root = createRoot(rootElement);

if (rootElement.hasChildNodes()) {
  // …Если в корневом элементе есть контент, то…
  root.hydrate(
    <Provider store={store}>
      <App />
    </Provider>
  ); // …"цепляем" приложение на существующий DOM.
} else {
  // …Иначе рендерим приложение стандартным образом
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
