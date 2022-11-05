import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cars from "./components/Cars";
import Details from "./components/Details";
import Fav from "./components/Fav";
import LastViewed from "./components/LastViewed";
import ThemeContext, { themes } from "./components/Theme";

function App() {
  const theme = useContext(ThemeContext);

  const [stateTheme, setStateTheme] = useState(themes.light);

  const changeTheme = () => {
    stateTheme == themes.dark
      ? setStateTheme(themes.light)
      : setStateTheme(themes.dark);
  };

  document.body.style.background = stateTheme.background;

  // document.body.style.color = stateTheme.color;

  return (
    <ThemeContext.Provider value={stateTheme}>
      <button
        style={{
          position: "fixed",
          bottom: "0px",
          margin: "30px",
          width: "100px",
          height: "50px",
          zIndex: "1",
          backgroundColor: "#f03838",
          color: "white",
          border: "2px solid #f03838",
          borderRadius: "10px",
        }}
        onClick={() => {
          changeTheme();
        }}
      >
        Switch Color
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<Fav />} />
        <Route path="/last" element={<LastViewed />} />
        <Route path="/cars/:query" element={<Cars />} />
        <Route path="/details/:carId" element={<Details />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
