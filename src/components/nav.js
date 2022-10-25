import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  return (
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
  );
}
