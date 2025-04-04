import { useContext } from "react";
import { SelectedPhotosContext } from "../components/store/PhotoContext.jsx";
import PhotoItem from "../components/PhotoItem.jsx";
import PhotoSidebar from "../components/PhotoSidebar.jsx"
import "../components/photos.css";

export default function PhotoAlbum() {
    const { album } = useContext(SelectedPhotosContext);

    return (
        <main className="main-box">
            {album ? (
                <ul className="photos">
                    {album.photos.length > 0 ? (
                        album.photos.map((photo, index) =>
                            <PhotoItem
                                key={photo._id}
                                photo={photo}
                                index={index}
                                allPhotos={album.photos}
                                enableDownload={false}
                            />)
                    ) : (
                        <p>Das Album enthält noch keine Fotos</p>
                    )}
                </ul>
            ) : <p>loading...</p>}
            <PhotoSidebar />
        </main>
    );
}
