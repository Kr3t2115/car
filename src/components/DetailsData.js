export default function DetailsData({ data }) {
  var path =
    "https://www.ark-doradztwo.pl/wp-content/uploads/2019/11/brak-zdjecia.png";
  if (data.length === 0) {
  } else {
    if (data.userImageURL === "") {
      path =
        "https://www.ark-doradztwo.pl/wp-content/uploads/2019/11/brak-zdjecia.png";
    } else {
      path = data[0].userImageURL;
    }
    return (
      <div className="detailsData">
        <img
          className="carImage"
          src={data[0].largeImageURL}
          alt={data[0].tags}
        ></img>

        <div className="detailsAboutImage">
          <br></br>

          <span>Views on pixabay: {data[0].views}</span>
          <h3>Tags: {data[0].tags}</h3>
          <br></br>
          <a target="_blank" href={data[0].pageURL}>
            View on pixabay
          </a>
          <br></br>
          <div className="userInfo">
            <h2>Photograped by {data[0].user}</h2>
            <img src={path} alt="user pic"></img>
          </div>
          <br></br>
        </div>
      </div>
    );
  }
}
