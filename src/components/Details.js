import { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import "../styles/Details.css";
import DetailsData from "./DetailsData";
import MenuIcon from "@mui/icons-material/Menu";

export default function Details() {
  const { carId } = useParams();

  const [detailData, setDetailData] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const [width, setWidth] = useState("0px");

  const style = {
    width: width,
  };

  const send = async () => {
    try {
      const req = await fetch(
        `https://pixabay.com/api/?key=30072676-d250de6e9ee4620711444e58c&image_type=photo&pretty=true&id=${carId}`
      );

      if (req.status !== 200) {
        throw new Error(req.statusText);
      }
      const parsed = await req.json();

      setDetailData(parsed.hits[0]);
    } catch (err) {
      console.log(err);
      navigate(`/cars/${location.state.q}`);
    }
  };

  useEffect(() => {}, [detailData]);

  useEffect(() => {
    send();
  }, []);

  return (
    <div>
      <div id="mySidenav" style={style} className="sidenav">
        <a
          className="closebtn"
          onClick={() => {
            setWidth("0px");
          }}
        >
          &times;
        </a>
        <Link to="/">Home</Link>
        <Link to={"/cars/" + location.state.q}>Cars {location.state.q}</Link>
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

      <nav className="navigation">
        <div className="layerDetail">
          <MenuIcon
            sx={{ fontSize: 40 }}
            onClick={() => {
              if (width == "0px") {
                setWidth("200px");
              } else {
                setWidth("0px");
              }
            }}
          ></MenuIcon>
        </div>
      </nav>

      <DetailsData data={detailData} query={location.state.q}></DetailsData>
    </div>
  );
}
