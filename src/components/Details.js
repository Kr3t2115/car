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

export default function Details() {
  const { carId } = useParams();

  const [detailData, setDetailData] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const send = async () => {
    try {
      const req = await fetch(
        `https://pixabay.com/api/?key=30072676-d250de6e9ee4620711444e58c&image_type=photo&pretty=true&id=${carId}`
      );

      if (req.status !== 200) {
        throw new Error(req.statusText);
      }
      const parsed = await req.json();

      setDetailData(parsed.hits);
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
      <nav className="navigation">
        <div className="layerDetail">
          <Link to={"/cars/" + location.state.q}>
            <button>Back to cars</button>
          </Link>

          <Link to={"/"}>
            <button>Back to home</button>
          </Link>
        </div>
      </nav>

      <DetailsData data={detailData}></DetailsData>
    </div>
  );
}
