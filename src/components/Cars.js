import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/Cars.css";
import CarsList from "./CarsList";
import ManufactureList from "./ManufactureList";

export default function Cars() {
  const { query } = useParams();

  const [carBrand, setCardBrand] = useState(query);

  const [allData, setAllData] = useState([]);

  let isTyping;
  
  const send = async () => {
    var loader = document.getElementById("loader");
    var images = document.getElementById("images");
    var carError = document.getElementById("carError");

    ManufactureList.forEach((e) => {
      if (e.name !== carBrand.toLowerCase()) {
        carError.classList.add("block");
        return;
      } else {
        carError.classList.remove("block");
      }
    });

    try {
      const req = await fetch(
        `https://pixabay.com/api/?key=30072676-d250de6e9ee4620711444e58c&q=${carBrand.toLowerCase()}+car&image_type=photo&pretty=true`
      );

      if (req.status !== 200) {
        throw new Error(req.statusText);
      }
      const parsedData = await req.json();

      setAllData(parsedData.hits);

      if (parsedData.hits.length == 0) {
        carError.classList.add("block");
      } else {
        carError.classList.remove("block");
      }

      loader.classList.remove("active");

      images.classList.remove("notvisible");
      isTyping = false;
    } catch (err) {
      console.log(err);
      carError.classList.add("block");
    }
  };

  const eventHandler = (e) => {
    var loader = document.getElementById("loader");
    var images = document.getElementById("images");
    var carError = document.getElementById("carError");
    var typeSth = document.getElementById("typeSth");

    setCardBrand(e.target.value);
    typeSth.classList.remove("block");
    images.classList.add("notvisible");
    loader.classList.add("active");
    carError.classList.remove("block");
    isTyping = true;
  };

  useEffect(() => {
    let timeout;
    var loader = document.getElementById("loader");
    var images = document.getElementById("images");
    var carError = document.getElementById("carError");
    var typeSth = document.getElementById("typeSth");

    if (carBrand === "") {
      loader.classList.remove("active");
      typeSth.classList.add("block");
      carError.classList.remove("block");
      return;
    } else {
      timeout = setTimeout(() => {
        send();
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [carBrand]);
  return (
    <div>
      <div className="form">
        <div className="layer">
          <h1>Find your car</h1>
          <input
            defaultValue={query}
            onChange={(event) => {
              eventHandler(event);
            }}
          ></input>

          <Link
            to={"/fav"}
            state={{
              q: carBrand,
            }}
          >
            Fav pics
          </Link>

          <Link
            to={"/last"}
            state={{
              q: carBrand,
            }}
          >
            Last
          </Link>
        </div>
      </div>

      <h1 id="typeSth">Type somthing</h1>
      <span id="carError">Not found your car</span>

      <div className="loader active" id="loader">
        <div className="lds-dual-ring"></div>
      </div>

      <div id="images">
        <CarsList
          data={allData}
          query={carBrand}
          length={carBrand.length}
          setData={setAllData}
        ></CarsList>
      </div>
    </div>
  );
}
