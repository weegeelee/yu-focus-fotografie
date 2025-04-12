import { useState, useEffect } from "react";
import api from "../../../api.js";
import Modal from "../../components/UI/Modal";
import Delete from "../../assets/icon/delete.png";
import "./photo.css";

export default function Photos({ albumId }) {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedPhotoId, setSelectedPhotoId] = useState(null);
    const getNameWithoutExtension = (fileName) => fileName.replace(/\.[^/.]+$/, "");
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await api.get(`/photos?albumId=${albumId}`);
                setPhotos(response.data);
            } catch (err) {
                setError("Failed to fetch photos");
                console.error("Error fetching photos:", err);
            } finally {
                setLoading(false);
            }
        };

        if (albumId) {
            fetchPhotos();
        }
    }, [albumId]);

    if (loading) return <p className="center">Datein hochladen...</p>;
    if (error) return <p className="center error">{error}</p>;
    if (photos.length === 0) return <p className="center">Dieses Album enthält noch keine Dateien.</p>;

    const handleDeleteClick = (photoId) => {
        setSelectedPhotoId(photoId);
        setShowConfirm(true);
    };

    const handleDeletePhoto = async () => {
        try {
            await api.delete(`/deletephoto/${selectedPhotoId}`);
            setPhotos((prevPhotos) => prevPhotos.filter(photo => photo.id !== selectedPhotoId));
        } catch (error) {
            console.error("Error deleting photo:", error.message);
        } finally {
            setShowConfirm(false);
            setSelectedPhotoId(null);
        }
    };

    function handleChangePreview(index) {
        let validIndex;
        if (index < 0) {
            validIndex = photos.length - 1;
        } else if (index >= photos.length) {
            validIndex = 0;
        } else {
            validIndex = index;
        }
        setPreview({ ...photos[validIndex], index: validIndex });
    }

    return (
        <>
            {preview && (
                <div className="preview-box">
                    <p className="preview-close-btn">
                        <button onClick={() => setPreview(null)}>&#215;</button>
                    </p>
                    <div className="preview-img-box">
                        <img src={preview.imageUrl} alt="Preview" />
                    </div>
                    <div className="preview-config">
                        <div className="config-box">
                            <button className="left" onClick={() => handleChangePreview(preview.index - 1)}>{'<'}</button>
                            <span>{preview.index + 1} / {photos.length}</span>
                            <button className="right" onClick={() => handleChangePreview(preview.index + 1)}>{'>'}</button>
                        </div>
                    </div>
                </div >
            )
            }
            <ul className="photos">
                {photos.map((photo, index) => (
                    <li key={photo.id || index} className="photos-li">
                        <img src={photo.imageUrl} alt={photo.name} onClick={() => handleChangePreview(index)} loading="lazy"/>
                        <button className="delete-button" onClick={() => handleDeleteClick(photo.id)}>
                            <img src={Delete} alt="delete icon" />
                        </button>
                        <p className="photo-name">{getNameWithoutExtension(photo.name)}</p>
                    </li>
                ))}
            </ul>
            {
                showConfirm && (
                    <Modal className="modal" open={showConfirm}>
                        <div className="confirm-modal">
                            <h3>Datei löschen</h3>
                            <p>Möchtest du diese Datei wirklich löschen?</p>
                            <div className="btn-box">
                                <button onClick={() => setShowConfirm(false)} className="cancel-btn">Abrechen</button>
                                <button onClick={handleDeletePhoto} className="confirm-btn">löschen</button>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    );
};




