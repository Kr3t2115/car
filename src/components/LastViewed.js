import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Nav from "./nav";

export default function LastViewed() {
  const location = useLocation();

  if (!localStorage.getItem("last")) {
    localStorage.setItem("last", JSON.stringify([]));
  }

  const [tab, setTab] = useState(JSON.parse(localStorage.getItem("last")));

  return (
    <div>
      <Nav></Nav>

      <h1>Last</h1>
      <div className="list">
        {tab.map((element) => {
          return (
            <div className="listContainer">
              <Link
                to={"/details/" + element.id}
                state={{ q: location.state.q }}
              >
                <img src={element.url} alt={element.tags}></img>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
