import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import "./homepage.css"

const photos = [
    { src: "/photo-image/EN3A3571.jpg", width: 960, height: 1440 },
    { src: "/photo-image/EN3A9425.jpg", width: 960, height: 1440 },
    { src: "/photo-image/EN3A5127.jpg", width: 1440, height: 960},
    { src: "/photo-image/EN3A0347.jpg", width: 1440, height: 960 },
    { src: "/photo-image/EN3A7251.jpg", width: 960, height: 1440 },
    { src: "/photo-image/EN3A0358.jpg", width: 1440, height: 960 },
    { src: "/photo-image/EN3A9386.jpg", width: 960, height: 1440 },
    { src: "/photo-image/EN3A9014.jpg", width: 1440, height: 960 },
    { src: "/photo-image/EN3A9616.jpg", width: 1440, height: 960 },
    { src: "/photo-image/EN3A9638.jpg", width: 960, height: 1440 },
    { src: "/photo-image/EN3A9243.jpg", width: 960, height: 1440 },
    { src: "/photo-image/EN3A9640.jpg", width: 1440, height: 960 },
  ];

export default function Gallery() {
  return (
    <div className="gallery-box">
      <ColumnsPhotoAlbum photos={photos} />
    </div>
  );
}