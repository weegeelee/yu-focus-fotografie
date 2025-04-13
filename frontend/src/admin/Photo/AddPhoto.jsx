import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api.js";
import PhotoSide from "./PhotoSide";
import Photos from "./Photos";
import Modal from "../../components/UI/Modal";

export default function AddPhoto() {
    const { albumId } = useParams();
    const [uploading, setUploading] = useState(false);
    const [photosUpdated, setPhotosUpdated] = useState(false);
    const [existingPhotos, setExistingPhotos] = useState([]);
    const [duplicateFiles, setDuplicateFiles] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingUploadFiles, setPendingUploadFiles] = useState([]);

    useEffect(() => {
        if (!albumId) return;
        const fetchPhotos = async () => {
            try {
                const response = await api.get(`/photos?albumId=${albumId}`);
                setExistingPhotos(response.data);
            } catch (error) {
                console.error("Error fetching existing photos:", error);
            }
        };
        fetchPhotos();
    }, [albumId, photosUpdated]);

    const handleUpload = async (event) => {
        const files = Array.from(event.target.files);
        if (!files.length) return;

        const duplicates = files.filter(file => existingPhotos.some(photo => photo.name === file.name));
        if (duplicates.length > 0) {
            setDuplicateFiles(duplicates);
            setPendingUploadFiles(files); 
            setShowConfirm(true); 
            return;
        }
        uploadFiles(files);
    };

    const uploadFiles = async (files) => {
        if (!albumId) {
            alert("Error: albumId is undefined, cannot upload!");
            return;
        }
        setUploading(true);

        const formData = new FormData();
        files.forEach(file => formData.append("photos", file));

        try {
            const response = await api.post(`/albums/${albumId}/photos`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log("Uploaded successfully", response.data);
            alert("Hochladen ist fertig!");
            setPhotosUpdated(!photosUpdated);
        } catch (error) {
            console.error("Error uploading photos", error);
            alert("Hochladen ist fehlgeschlagen. Bitte versuchen Sie es später noch einmal.");
        }
        setUploading(false);
    };

    const handleConfirmOverwrite = async () => {
        setShowConfirm(false);
        try {
            const deletePromises = duplicateFiles.map(file => {
                const photoToDelete = existingPhotos.find(photo => photo.name === file.name);
                if (photoToDelete) {
                    return api.delete(`/deletephoto/${photoToDelete.id}`)
                } else {
                    console.warn(`Datei nicht gefunden: ${file.name}`);
                    return Promise.resolve();
                }
            });
            await Promise.all(deletePromises);
            uploadFiles(pendingUploadFiles);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleSkipDuplicates = () => {
        setShowConfirm(false);
        const filesToUpload = pendingUploadFiles.filter(file => !duplicateFiles.includes(file));
        if (filesToUpload.length > 0) {
            uploadFiles(filesToUpload);
        } else {
            console.log("All files are duplicated, skip uploading");
        }
    };

    const handleDeleteAllPhotos = async () => {
        try {
            await api.delete(`/albums/${albumId}/photos`);
            setPhotosUpdated(prev => !prev);
        } catch (error) {
            console.error("Delete failed:", error);
        };
    };

    return (
        <main className="admin-mainbox">
            <PhotoSide onDeleteAll={handleDeleteAllPhotos} />
            <div className="photo-box">
                {uploading ? <p>Uploading...</p> : <Photos key={photosUpdated} albumId={albumId} />}
                <div className="upload-box">
                    <label htmlFor="file-upload" className="custom-upload-btn">
                        + Datein hinzufügen
                        <input
                            type="file"
                            id="file-upload"
                            style={{ display: 'none' }}
                            multiple
                            onChange={handleUpload}
                        />
                    </label>
                </div>
            </div>
            {showConfirm && (
                <Modal className="modal" open={showConfirm}>
                    <div className="confirm-modal">
                        <h3>Dateien überschreiben?</h3>
                        <p>Einige der hochgeladenen Dateien befinden sich bereits in dieser Galerie. Möchtest du sie ersetzen oder ihren Upload überspringen?</p>
                        <div className="btn-box">
                            <button onClick={handleConfirmOverwrite} className="cancel-btn">Überschreiben</button>
                            <button onClick={handleSkipDuplicates} className="confirm-btn">Überspringen</button>
                        </div>
                    </div>
                </Modal>
            )}
        </main>
    );
};
