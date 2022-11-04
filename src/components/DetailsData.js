import { Link } from "react-router-dom";

export default function DetailsData({ data, query }) {
  // "https://www.ark-doradztwo.pl/wp-content/uploads/2019/11/brak-zdjecia.png";

  // const tags = data.tags;

  // const newTags = tags.split(",").join(" | ");
  return (
    <div className="container">
      <div className="listContainer">
        <Link
          onClick={() => {
            addToLastView(data.id, data.largeImageURL, data.tags);
          }}
          to={"/details/" + data.id}
          state={{
            q: query,
          }}
        >
          <img src={data.largeImageURL} alt={data.tags}></img>
        </Link>
      </div>
      <h2>Auto fajne</h2>
      {/* <h4>{newTags}</h4> */}
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
