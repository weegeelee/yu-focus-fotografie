import { useContext, lazy, Suspense } from "react";
import { SelectedPhotosContext } from "../components/store/PhotoContext.jsx";
import "../components/photos.css";
const PhotoItem = lazy(() => import("../components/PhotoItem.jsx"));
const PhotoSidebar = lazy(() => import("../components/PhotoSidebar.jsx"));


export default function PhotoAlbum() {
    const { album } = useContext(SelectedPhotosContext);

    return (
        <main className="main-box">
            <Suspense fallback={<p>Lade Fotos...</p>}>
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
                ) : (<p>loading...</p>)}
            </Suspense>
            <Suspense fallback={<p>Sidebar wird geladen...</p>}>
                <PhotoSidebar />
            </Suspense>
        </main>
    );
}
