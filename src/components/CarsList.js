import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Cars.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function CarsList({ data, query }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const [allFav, setAllFav] = useState([]);

  const [open, setOpen] = useState(false);

  const [elementState, setElementState] = useState("");

  useEffect(() => {
    const item = localStorage.getItem("fav");

    if (item && item != null && item != "undefined" && item != undefined) {
      setAllFav(JSON.parse(item));
    } else {
      localStorage.setItem("fav", JSON.stringify([]));
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const add = (carId, carUrl, carTags) => {
    if (localStorage.getItem("fav") == null) {
      localStorage.setItem(
        "fav",
        JSON.stringify([{ id: carId, url: carUrl, tags: carTags }])
      );

      setAllFav(JSON.parse(localStorage.getItem("fav")));

      setElementState("added to");

      handleOpen();
    } else {
      let gettedData = JSON.parse(localStorage.getItem("fav"));

      let checked = gettedData.some((e) => e.id === carId);

      if (checked === true) {
        return;
      } else {
        let newArray = [
          ...gettedData,
          { id: carId, url: carUrl, tags: carTags },
        ];

        localStorage.setItem("fav", JSON.stringify(newArray));

        setAllFav(JSON.parse(localStorage.getItem("fav")));
      }

      setElementState("added to");

      handleOpen();
    }
  };

  const remove = (carId) => {
    let gettedData = JSON.parse(localStorage.getItem("fav"));

    let removedImage = gettedData.findIndex((obj) => {
      return obj.id == carId;
    });

    if (removedImage == -1) {
      return;
    }

    if (removedImage > -1) {
      let el = gettedData.splice(removedImage, 1);

      localStorage.setItem("fav", JSON.stringify(gettedData));

      setAllFav(JSON.parse(localStorage.getItem("fav")));

      setElementState("removed from");

      handleOpen();
    }
  };

  const addToLastView = (carId, carUrl, carTags) => {
    if (localStorage.getItem("last") == null) {
      localStorage.setItem(
        "last",
        JSON.stringify([{ id: carId, url: carUrl, tags: carTags }])
      );
    } else {
      let gettedData = JSON.parse(localStorage.getItem("last"));

      let checked = gettedData.some((e) => e.id === carId);

      if (checked === true) {
        return;
      } else {
        if (gettedData.length >= 10) {
          let sliced = gettedData.slice(1, 10);

          let arr = [{ id: carId, url: carUrl, tags: carTags }, ...sliced];

          localStorage.setItem("last", JSON.stringify(arr));
        } else {
          let newArray = [
            { id: carId, url: carUrl, tags: carTags },
            ...gettedData,
          ];

          localStorage.setItem("last", JSON.stringify(newArray));
        }
      }
    }
  };

  useEffect(() => {
    if (allFav.length > 0) {
      localStorage.setItem("fav", JSON.stringify(allFav));
    }
  }, [allFav]);

  return (
    <div>
      <div className="list">
        {data.map((e) => {
          let checked = allFav.some((par) => par.id === e.id);

          const tags = e.tags;

          const newTags = tags.split(",").join(" | ");

          let button;

          if (checked == true) {
            button = (
              <button
                onClick={() => {
                  remove(e.id);
                }}
              >
                Remove
              </button>
            );
          } else {
            button = (
              <button
                onClick={() => {
                  add(e.id, e.largeImageURL, e.tags);
                }}
              >
                Add
              </button>
            );
          }

          return (
            <div className="container">
              <div className="listContainer">
                {button}
                <Link
                  onClick={() => {
                    addToLastView(e.id, e.largeImageURL, e.tags);
                  }}
                  to={"/details/" + e.id}
                  state={{
                    q: query,
                  }}
                >
                  <img src={e.largeImageURL} alt={e.tags}></img>
                </Link>
              </div>
              <h2>Auto fajne</h2>
              <h4>{newTags}</h4>
            </div>
          );
        })}
      </div>
      ;
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Image is {elementState} fav.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
