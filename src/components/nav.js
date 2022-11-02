import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="layerDetail"></div>
    </nav>
  );
}
