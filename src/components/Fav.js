import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FavList from "./FavList";
import Nav from "./nav";

export default function Fav() {

  const location = useLocation();

  return (
    <div>
      <Nav></Nav>

      <h1>Fav</h1>

      <FavList query={location.state.q}></FavList>
    </div>
  );
}
