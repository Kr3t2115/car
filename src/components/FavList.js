import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export default function FavList({ query }) {
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
  };

  const [allFav, setAllFav] = useState([]);

  useEffect(() => {
    const item = localStorage.getItem("fav");

    if (item && item != null && item != "undefined" && item != undefined) {
      setAllFav(JSON.parse(item));
    } else {
      localStorage.setItem("fav", JSON.stringify([]));
    }
  }, []);

  const [open, setOpen] = useState(false);

  const [elementState, setElementState] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const remove = (carId) => {
    let gettedData = JSON.parse(localStorage.getItem("fav"));

    let removedImage = gettedData.findIndex((obj) => {
      return obj.id == carId;
    });

    if (removedImage > -1) {
      let el = gettedData.splice(removedImage, 1);

      localStorage.setItem("fav", JSON.stringify(gettedData));

      setElementState("removed from");

      handleOpen();

      setAllFav(JSON.parse(localStorage.getItem("fav")));
    }
  };

  useEffect(() => {
    if (allFav.length > 0) {
      localStorage.setItem("fav", JSON.stringify(allFav));
    }
  }, [allFav]);

  return (
    <div className="list">
      {allFav.map((element) => {
        return (
          <div className="listContainer">
            <button
              id="remove"
              onClick={() => {
                remove(element.id);
              }}
            >
              Remove
            </button>
            <Link to={"/details/" + element.id} state={{ q: query }}>
              <img src={element.url} alt={element.tags}></img>
            </Link>
          </div>
        );
      })}

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
