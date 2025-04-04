import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api.js";
import Delete from "../../assets/icon/delete.png";
import galerie from "../../assets/icon/photos.png";
import Modal from "../../components/UI/Modal";
import "./albumitem.css";

export default function AlbumItem({ album, setAlbums, onRemove }) {
    const [photos, setPhotos] = useState([]);
    const [editingAlbumId, setEditingAlbumId] = useState(null);
    const [albumName, setAlbumName] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [seletedAlbumId, setSeletedAlbumId] = useState(null);

    useEffect(() => {
        if (!album?.id) return;
        const fetchAlbumItem = async () => {
            try {
                const response = await api.get(`/photos?albumId=${album.id}`);
                if (response.data.length > 0) {
                    setPhotos(response.data);
                };
            } catch (error) {
                console.error("Error fetching photos:", error);
            };
        };
        fetchAlbumItem();
    }, [album?.id]);

    function handleEditClick(album) {
        setEditingAlbumId(album.id);
        setAlbumName(album.name);
    }

    async function handleSave(albumId) {
        try {
            if (!albumName.trim()) return;
            await api.put(`/albums/${albumId}`, { name: albumName });
            setAlbums((prevAlbums) =>
                prevAlbums.map(album =>
                    album.id === albumId ? { ...album, name: albumName } : album
                ));
        } catch (error) {
            console.error("Album name update failed:", error);
        }
        setEditingAlbumId(null);
    }

    const handleDeleteClick = (albumId) => {
        setSeletedAlbumId(albumId);
        setShowConfirm(true);
    };

    const handleDeleteAlbum = async () => {
        try {
            await api.delete(`/deletealbum/${album.id}`);
            onRemove(album.id);
        } catch (error) {
            console.error("Error deleting album:", error.message);
        }
    };

    return (
        <li className='album-item'>
            <Link to={`/admin/album/${album.id}`} className="album-link">
                <div className="album-cover">
                    {photos.length > 0 ? (
                        <img src={photos[0].imageUrl} alt="album cover" className="cover-img" />
                    ) : (
                        <img src={galerie} alt="album cover" />
                    )}
                </div>
            </Link>
            <div className="albumname-box" onClick={() => handleEditClick(album)}>
                {editingAlbumId === album.id ? (
                    <input className="album-input"
                        value={albumName}
                        onChange={(event) => setAlbumName(event.target.value)}
                        onBlur={() => handleSave(album.id)}
                        onKeyDown={(event) => event.key === "Enter" && handleSave(album.id)}
                        autoFocus
                    />
                ) : <p className='album-name'>{album.name} <span>{photos.length > 0 ? photos.length : ""}</span></p>}
            </div>
            <button className="album-delete-btn" onClick={handleDeleteClick}>
                <img src={Delete} alt="delete icon" />
            </button>
            {showConfirm && (
                <Modal className="modal" open={showConfirm}>
                    <div className="confirm-modal">
                        <h3>Album löschen</h3>
                        <p>Möchtest du das Album wirklich löschen?</p>
                        <div className="btn-box">
                            <button onClick={() => setShowConfirm(false)} className="cancel-btn">Abrechen</button>
                            <button onClick={handleDeleteAlbum} className="confirm-btn">löschen</button>
                        </div>
                    </div>
                </Modal>
            )}
        </li>
    );
}