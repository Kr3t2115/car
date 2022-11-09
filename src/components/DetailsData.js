import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CommentIcon from "@mui/icons-material/Comment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect } from "react";

export default function DetailsData({ data, query }) {
  let newTags = "";
  useEffect(() => {
    const tags = data.tags;

    newTags += tags.split(",").join(" | ");
  }, []);

  return (
    <div
      className="container"
      style={{ width: "min(600px, 90vw)", margin: "auto" }}
    >
      <div className="listContainer">
        <img src={data.largeImageURL} alt={data.tags}></img>
      </div>
      <h2>Auto fajne</h2>
      <h4>Tags: {newTags}</h4>
      <h5>
        <RemoveRedEyeIcon style={{ margin: "10px" }}></RemoveRedEyeIcon>
        {data.views}
        <ThumbUpIcon style={{ margin: "10px" }}></ThumbUpIcon> {data.likes}
        <DownloadIcon style={{ margin: "10px" }}></DownloadIcon>
        {data.downloads}
        <CommentIcon style={{ margin: "10px" }}></CommentIcon> {data.comments}
        <AccountCircleIcon style={{ margin: "10px" }}></AccountCircleIcon>
        {data.user}
      </h5>
    </div>
  );
}

// <div className="detailsData">
//       <img className="carImage" src={data.largeImageURL} alt={data.tags}></img>

//       <div className="detailsAboutImage">
//         <br></br>

//         <span>Views on pixabay: {data.views}</span>
//         <h3>Tags: {data.tags}</h3>
//         <br></br>
//         <a target="_blank" href={data.pageURL}>
//           View on pixabay
//         </a>
//         <br></br>
//         <div className="userInfo">
//           <h2>Photograped by {data.user}</h2>
//           <img src={data.largeImageURL} alt="user pic"></img>
//         </div>
//         <br></br>
//       </div>
//     </div>
