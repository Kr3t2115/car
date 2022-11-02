import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import ManufactureList from "./ManufactureList";

export default function Home() {
  const [query, setQuery] = useState("");

  const [minutes, setMinutes] = useState(Number);

  const [hours, setHours] = useState(Number);

  const date = new Date();

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

  useEffect(() => {
    setHours(1);
    setMinutes(2);
  }, []);

  useEffect(() => {}, [query]);

  useEffect(() => {
    if (minutes != 0) {
      let interval;
      interval = setInterval(() => {
        setMinutes(minutes - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    if (minutes == 0 && hours == 0) {
      return;
    }

    if (minutes == 0) {
      setMinutes(60);
    }
  }, [minutes]);

  useEffect(() => {
    if (hours != 0) {
      let interval;
      interval = setInterval(() => {
        setHours(hours - 1);
      }, 60000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [hours]);
  return (
    <div className="main" onKeyDown={handleKeyDown}>
      <div className="box">
        <h1>Search Car</h1>
        <h2>{hours + ":" + minutes}</h2>
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
