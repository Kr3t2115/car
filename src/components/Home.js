import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import ManufactureList from "./ManufactureList";

export default function Home() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const eventHandler = (e) => {
    setQuery(e.target.value);
    handleKeyDown(e);
  };
  const checkCarManu = () => {
    const error = document.getElementById("error");

    ManufactureList.forEach((e) => {
      if (e.name === query.toLowerCase()) {
        navigate("/cars/" + query.toLowerCase());
        error.classList.remove("block");
      } else {
        error.classList.add("block");
      }
    });
  };

  const handleKeyDown = (event) => {
    if (query === "") {
      return;
    } else {
      if (event.key === "Enter") {
        checkCarManu();
      } else {
        return;
      }
    }
  };

  useEffect(() => {}, [query]);
  return (
    <div className="main" onKeyDown={handleKeyDown}>
      <div className="box">
        <h1>Search Car</h1>
        <input
          type="text"
          onChange={(event) => {
            eventHandler(event);
          }}
        ></input>

        <span id="error">Not found your car</span>

        <button type="submit" onClick={checkCarManu}>
          Search
        </button>
      </div>
    </div>
  );
}
