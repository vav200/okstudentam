import "./finishedworks.css";
import Searchpanel from "./Searchpanel";
import { Outlet } from "react-router-dom";

export default function Finishedworks() {
  return (
    <main>
      <Searchpanel />
      <Outlet />
    </main>
  );
}
