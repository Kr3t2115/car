import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./nav";

export default function LastViewed() {
  const location = useLocation();

  if (!localStorage.getItem("last")) {
    localStorage.setItem("last", JSON.stringify([]));
  }

  const [tab, setTab] = useState([]);

  useEffect(() => {
    const item = localStorage.getItem("last");

    if (item && item != null && item != "undefined" && item != undefined) {
      setTab(JSON.parse(item));
    } else {
      localStorage.setItem("last", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (tab.length > 0) {
      localStorage.setItem("last", JSON.stringify(tab));
    }
  }, [tab]);

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
