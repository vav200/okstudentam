import "./app.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import PersonalArea from "./users/PersonalArea";
import NotFoundPage from "./NotFoundPage";
import AddFinishedWorks from "./finishedworks/AddFinishedWorks";
import ListOfFinishedWorks from "./finishedworks/ListOfFinishedWorks";
import SelectedWork from "./finishedworks/SelectedWork";
import Finishedworks from "./finishedworks/Finishedworks";
import Helper from "./helper/Helper";
import Guarantees from "./guarantees/Guarantees";
import Kontacts from "./kontacts/Kontacts";
import Addfreeworks from "./adminpanel/Addfreeworks";
import SelectedOrder from "./users/SelectedOrder";

function App() {
  let userstate = useSelector((dat) => dat.userstate);
  let stateadmin = useSelector((dat) => dat.adminpanel);

  return (
    <div className="container-fluid p-0 mainconteiner">
      <div className={stateadmin ? "wrap_admin" : "wrap"}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/kontacts" element={<Kontacts />} />
            <Route path="/helper" element={<Helper />} />
            <Route path="/guarantees" element={<Guarantees />} />
            <Route path="/finishedworks" element={<Finishedworks />}>
              <Route index element={<ListOfFinishedWorks />} />
              <Route path="/finishedworks/:keywork" element={<SelectedWork />} />
            </Route>

            <Route
              path="/personalarea"
              element={userstate !== "" ? <PersonalArea /> : <Navigate to="/personalarea" />}
            />
            <Route path="/personalarea/finishedWorks" element={<AddFinishedWorks />} />

            {/* <Route
              path="/personalarea/orders/:selectedOrderNum"
              element={userstate === "dispetcher" ? <SelectedOrder /> : <Navigate to="/" />}
            /> */}

            <Route path="/personalarea/orders/:selectedOrderNum" element={<SelectedOrder />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
