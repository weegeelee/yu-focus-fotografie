import { ColumnsPhotoAlbum } from "react-photo-album";
import "react-photo-album/columns.css";
import "./homepage.css"

const photos = [
    { src: new URL("/photo-image/EN3A3571.jpg", import.meta.url).href, width: 960, height: 1440 },
    { src: new URL("/photo-image/EN3A9425.jpg", import.meta.url).href, width: 960, height: 1440 },
    { src: new URL("/photo-image/EN3A5127.jpg", import.meta.url).href, width: 1440, height: 960},
    { src: new URL("/photo-image/EN3A0347.jpg", import.meta.url).href, width: 1440, height: 960 },
    { src: new URL("/photo-image/EN3A7251.jpg", import.meta.url).href, width: 960, height: 1440 },
    { src: new URL("/photo-image/EN3A0358.jpg", import.meta.url).href, width: 1440, height: 960 },
    { src: new URL("/photo-image/EN3A9386.jpg", import.meta.url).href, width: 960, height: 1440 },
    { src: new URL("/photo-image/EN3A9014.jpg", import.meta.url).href, width: 1440, height: 960 },
    { src: new URL("/photo-image/EN3A9616.jpg", import.meta.url).href, width: 1440, height: 960 },
    { src: new URL("/photo-image/EN3A9638.jpg", import.meta.url).href, width: 960, height: 1440 },
    { src: new URL("/photo-image/EN3A9243.jpg", import.meta.url).href, width: 960, height: 1440 },
    { src: new URL("/photo-image/EN3A9640.jpg", import.meta.url).href, width: 1440, height: 960 },
  ];

export default function Gallery() {
  return (
    <div className="gallery-box">
      <ColumnsPhotoAlbum photos={photos} />
    </div>
  );
}