import { useContext, useState } from "react";
import { UserProgressContext } from "../../components/store/UserProgressContext";
import { Link } from "react-router-dom";
import Folder from "../../assets/icon/folder.png";
import "./album.css";
import axios from "axios";

export default function AlbumSidebar({ albums = [] }) {
    const userProgressCtx = useContext(UserProgressContext);

    function handleOpenNewAlbum() {
        userProgressCtx.addNewAlbum();
    }

    return (
        <aside className="album-aside">
            <h2>PhotoAlbum</h2>
            <div>
                <button className="album-button" onClick={handleOpenNewAlbum}>+ Neue Galerie erstellen</button>
            </div>
            <ul className="albumname">
                {albums.map((album) => (
                    <li key={album.id}>
                        <img src={Folder} alt="folder icon" />
                        <Link to={`/admin/album/${album.id}`} className="album-link">
                            <p className='album-name'>{album.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}