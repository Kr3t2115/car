import "../styles/Navigation.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navigation({ query }) {
  const [width, setWidth] = useState("200px");

  const style = {
    width: width,
  };

  return (
    <div id="mySidenav" style={style} className="sidenav">
      <button
        className="closebtn"
        onClick={() => {
          setWidth("0px");
          console.log("clicked");
        }}
      >
        &times;
      </button>
      <Link to="/">Home</Link>
      <Link to={"/cars/" + query}>Cars {query}</Link>
      <Link
        to="/fav"
        state={{
          q: query,
        }}
      >
        Fav
      </Link>
      <Link
        to="/last"
        state={{
          q: query,
        }}
      >
        Last
      </Link>
    </div>
    // <h1>adasdasd</h1>
  );
}
