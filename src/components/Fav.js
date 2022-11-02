import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FavList from "./FavList";
import Nav from "./nav";
import Navigation from "./Navigation";
import "../styles/Navigation.css";
import MenuIcon from "@mui/icons-material/Menu";

export default function Fav() {
  const [width, setWidth] = useState("0px");

  const style = {
    width: width,
  };
  const location = useLocation();

  return (
    <div>
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
      <h1>Fav</h1>

      <FavList query={location.state.q}></FavList>
    </div>
  );
}
