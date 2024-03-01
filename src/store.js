import { createStore } from "redux";

let defaultstate = {
  // domen: "http://okstudentam.ua",
  domen: "https://okstudentam.com.ua",
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
  finishedWorks: "off",
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
    case "SETMESABOUTNEWORDER":
      return { ...state, mesAboutNewOrder: action.data };
    case "SETMESABOUTNEWMES":
      return { ...state, mesAboutNewMessageInChat: action.data };
    case "SETFINISHEDWORKSLIST":
      return { ...state, finishedWorksList: action.data };
    // case "SETLANGUAGESETTINGS":
    //   return { ...state, userLanguage: action.data };
    case "INPLOGIN":
      return { ...state, inplogin: action.data };
    case "INPPASSWORD":
      return { ...state, inppassword: action.data };
    case "KEYFREEWORK":
      return { ...state, keySelectedWork: action.data[0], elmasfreework: action.data[1] };
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
    case "USERSETTINGS":
      return {
        ...state,
        language: action.data.userLanguage,
        mesAboutNewMessageInChat: action.data.mesAboutNewMessageInChat,
        mesAboutNewOrder: action.data.mesAboutNewOrder,
      };
    case "SETDISPETCHERLIST":
      return { ...state, dispetcher_list: action.data };
    case "SELECTEDORDERNUM":
      return { ...state, selectedOrderNum: action.data };
    case "FINISHEDWORKS":
      return { ...state, finishedWorks: action.data };
    default:
      return state;
  }
}

export { store };
