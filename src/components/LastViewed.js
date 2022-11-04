import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./nav";
import MenuIcon from "@mui/icons-material/Menu";

export default function LastViewed() {
  const location = useLocation();

  const [tab, setTab] = useState([]);
  const [width, setWidth] = useState("0px");

  const style = {
    width: width,
  };

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
    <div
      onClick={(e) => {
        const bar = document.getElementById("mySidenav");
        if (width == "200px" && e.target != bar) {
          setWidth("0px");
        }
      }}
    >
      <div id="mySidenav" style={style} className="sidenav">
        <a
          className="closebtn"
          onClick={() => {
            setWidth("0px");
          }}
        >
          &times;
        </a>
        <Link to="/">Home</Link>
        <Link to={"/cars/" + location.state.q}>Cars {location.state.q}</Link>
        <Link
          to="/fav"
          state={{
            q: location.state.q,
          }}
        >
          Fav
        </Link>
        <Link
          to="/last"
          state={{
            q: location.state.q,
          }}
        >
          Last
        </Link>
      </div>

      <nav className="navigation">
        <div className="layerDetail">
          <MenuIcon
            sx={{ fontSize: 40 }}
            onClick={() => {
              if (width == "0px") {
                setWidth("200px");
              } else {
                setWidth("0px");
              }
            }}
          ></MenuIcon>
        </div>
      </nav>

      <h1>Last</h1>
      <div className="list">
        {tab.map((element) => {
          const tags = element.tags;

          const newTags = tags.split(",").join(" | ");
          return (
            <div className="container">
              <div className="listContainer">
                <Link
                  to={"/details/" + element.id}
                  state={{ q: location.state.q }}
                >
                  <img src={element.url} alt={element.tags}></img>
                </Link>
              </div>
              <h2>Auto fajne</h2>
              <h4>{newTags}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
