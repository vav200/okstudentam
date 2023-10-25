import { createStore } from "redux";

let defaultstate = {
  language: "ru",
  login: "admin",
  password: "1977",
  adminpanel: false,
  inplogin: "",
  inppassword: "",
  keyfreework: "1",
  elmasfreework: "",
  orderperehod: "",
  changeuserright: function () {
    if (this.inplogin === this.login && this.inppassword === this.password) this.adminpanel = true;
    else this.adminpanel = false;
  },
};

const store = createStore(reducer);

function reducer(state = defaultstate, action) {
  switch (action.type) {
    case "SETLANGUAGE":
      return { ...state, language: action.data };
    case "INPLOGIN":
      return { ...state, inplogin: action.data };
    case "INPPASSWORD":
      return { ...state, inppassword: action.data };
    case "KEYFREEWORK":
      return { ...state, keyfreework: action.data[0], elmasfreework: action.data[1] };
    case "EXITADMINPANEL":
      return { ...state, adminpanel: false };
    case "orderperehod":
      return { ...state, orderperehod: state.orderperehod + action.data };
    case "orderperehodnull":
      return { ...state, orderperehod: action.data };
    default:
      return state;
  }
}

export { store };
