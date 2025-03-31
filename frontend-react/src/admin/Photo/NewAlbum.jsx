import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserProgressContext } from "../../components/store/UserProgressContext";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import "./album.css";

export default function NewAlbum({ onAdd }) {
    const [name, setName] = useState('');
    const userProgressCtx = useContext(UserProgressContext);
    const navigate = useNavigate();

    const generateUniqueId = () => Math.random().toString(36).substr(2, 9);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const albumId = generateUniqueId();
            const albumData = { id: albumId, name };
            const response = await axios.post('http://localhost:3000/addalbum', albumData);
            onAdd(response.data); 
            userProgressCtx.hideNewAlbum();
            navigate(`/admin/album/${albumId}`);
        } catch (error) {
            console.error('Error uploading album:', error.message);
        }
    };

    function handleCloseNewAlbum() {
        userProgressCtx.hideNewAlbum();
    }

    return (
        <Modal className="modal" open={userProgressCtx.progress === "newalbum"}
           >
            <form onSubmit={handleSubmit} className="modal-form">
                <div className="modal-box">
                    <h2>Neue Galerie erstellen</h2>
                    <Input
                        label="Name für deine neue Galerie"
                        type="text"
                        placeholder="Galeriename"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                    <menu className="btn-box">
                        <button type="button" className="cancel-btn" onClick={handleCloseNewAlbum}>Abbrechen</button>
                        <button type="submit" className="confirm-btn">Galerie erstellen</button>
                    </menu>
                </div>
            </form>
        </Modal>
    );
}