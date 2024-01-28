import { createStore } from "redux";

let defaultstate = {
  domen: "http://okstudentam.ua",
  // domen: "https://okstudentam.com.ua",
  language: "ru",
  login: "admin",
  password: "1977",
  adminpanel: false,
  inplogin: "",
  inppassword: "",
  userstate: "",
  usermail: "",
  username: "",
  keyfreework: "1",
  elmasfreework: "",
  orderperehod: "",
  dispetcher_list: "forEvaluation",
  selectedOrderNum: "",
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
    case "USERDATA":
      return {
        ...state,
        userstate: action.data.userstate,
        usermail: action.data.usermail,
        username: action.data.username,
      };
    case "SETDISPETCHERLIST":
      return { ...state, dispetcher_list: action.data };
    case "SELECTEDORDERNUM":
      return { ...state, selectedOrderNum: action.data };
    default:
      return state;
  }
}

export { store };
