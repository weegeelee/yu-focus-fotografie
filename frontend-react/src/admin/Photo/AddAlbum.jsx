import { useState, useEffect, useContext } from "react";
import { UserProgressContext } from "../../components/store/UserProgressContext.jsx";
import api from "../../../api.js";
import AlbumSidebar from "./AlbumSidebar.jsx";
import NewAlbum from "./NewAlbum.jsx";
import NoAlbumSelected from "./NoAlbumSelected.jsx";
import AlbumItem from "./AlbumItem.jsx";
import "./album.css";

export default function AddAlbum() {
    const userProgressCtx = useContext(UserProgressContext);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = api.get("/allalbums");
                setAlbums(response.data);
            } catch (error) {
                console.error("Error fetching albums:", error);
            }
        };
        fetchAlbums();
    }, []);

    function handleOpenNewAlbum() {
        userProgressCtx.addNewAlbum();
    }

    function handleAlbumAdded(newAlbum) {
        setAlbums(prevAlbums => [...prevAlbums, newAlbum]);
        userProgressCtx.hideNewAlbum();
    }

    function handleRemoveAlbum(albumId) {
        setAlbums(prevAlbums => prevAlbums.filter(album => album.id !== albumId));
    }

    return (
        <main className="admin-mainbox">
            <AlbumSidebar albums={albums} setAlbums={setAlbums} />

            {albums.length > 0 ? (
                <ul className='albums'>
                    {albums.map((album) => (
                        <AlbumItem key={album.id} album={album} setAlbums={setAlbums} onRemove={handleRemoveAlbum} />
                    ))}
                </ul>
            ) : (
                <NoAlbumSelected onStartAddAlbum={handleOpenNewAlbum} />
            )}
            {userProgressCtx.progress === "newalbum" && (
                <NewAlbum onAdd={handleAlbumAdded} />
            )}
        </main>
    );
}