import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api.js";
import Modal from "../../components/UI/Modal";
import ArrowLeft from "../../assets/icon/pfeil-kreis-links.png"

export default function PhotoSide({ onDeleteAll }) {
    const { albumId } = useParams();
    const [albumName, setAlbumName] = useState("");
    const [photos, setPhotos] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await api.get(`/albums/${albumId}`);
                setAlbumName(response.data.name);
            } catch (error) {
                console.log("Error fetching album:", error);
            };
        };
        fetchAlbum();

        const fetchPhotos = async () => {
            try {
                const response = api.get(`/photos?albumId=${albumId}`);
                console.log("photos data:", response.data);
                setPhotos(response.data);
            } catch (error) {
                console.error("Error fetching photos:", error);
            };
        };
        fetchPhotos();
    }, [albumId]);

    const handleDeleteClick = () => {
        setShowConfirm(true);
    };

    return (
        <aside className="photo-aside">
            <button className="arrow-left" onClick={() => navigate(-1)}><img src={ArrowLeft} alt="Arrow left" /></button>
            <h2>{albumName}</h2>
            <div className="sidebtn-box">
                <div>
                    <label htmlFor="file-upload" className="album-button">
                        + Datein hinzufügen
                    </label>
                </div>
                <div>
                    <button className="album-button" onClick={handleDeleteClick}>Album leeren</button>
                </div>
            </div>
            {showConfirm && (
                <Modal className="modal" open={showConfirm}>
                    <div className="confirm-modal">
                        <h3>Album leeren?</h3>
                        <p>Alle Dateien in diesem Album werden gelöscht.</p>
                        <div className="btn-box">
                            <button onClick={() => setShowConfirm(false)} className="cancel-btn">Abrechen</button>
                            <button onClick={() => { onDeleteAll(); setShowConfirm(false); }} className="confirm-btn">löschen</button>
                        </div>
                    </div>
                </Modal>
            )
            }
        </aside >
    );
}