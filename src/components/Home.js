import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import ManufactureList from "./ManufactureList";

export default function Home() {
  const [query, setQuery] = useState("");

  const [time, setTIme] = useState({
    hours: null,
    minutes: null,
  });

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
    setTIme({
      hours: date.getHours(),
      minutes: date.getMinutes(),
    });
  }, []);

  useEffect(() => {}, [query]);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      if (time.minutes == 0 && time.hours == 0) {
        return;
      }
      if (time.minutes == 0 && time.hours != 0) {
        setTIme((element) => ({
          ...element,
          hours: element.hours - 1,
          minutes: 59,
        }));
      } else {
        setTIme((element) => ({ ...element, minutes: element.minutes - 1 }));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  return (
    <div className="main" onKeyDown={handleKeyDown}>
      <div className="box">
        <h1>Search Car</h1>
        <h2>{time.hours + ":" + time.minutes}</h2>
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
