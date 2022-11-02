import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FavList from "./FavList";
import Nav from "./nav";
import Navigation from "./Navigation";
import "../styles/Navigation.css";

export default function Fav() {
  const [width, setWidth] = useState("0px");

  const style = {
    width: width,
  };
  const location = useLocation();

  return (
    <div>
      {() => {
        if (width != "0px") {
          return (
            <div id="mySidenav" style={style} className="sidenav">
              <button
                className="closebtn"
                onClick={() => {
                  setWidth("0px");
                  console.log("clicked");
                  setShow(false);
                }}
              >
                &times;
              </button>
              <Link to="/">Home</Link>
              <Link to={"/cars/" + location.state.q}>
                Cars {location.state.q}
              </Link>
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
          );
        }
      }}
      <Nav></Nav>
      <h1>Fav</h1>
      <button
        onClick={() => {
          setWidth("200px");
        }}
      >
        Open
      </button>
      <FavList query={location.state.q}></FavList>
    </div>
  );
}
