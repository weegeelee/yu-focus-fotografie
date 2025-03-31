import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SelectedPhotosContext } from "../components/store/PhotoContext.jsx";
import { CartContext } from '../components/store/CartContext';
import "./sidebar.css";

export default function PhotoSidebar() {
    const { album, albumId, selectedPhotos, onSelectAll, isAllSelected } = useContext(SelectedPhotosContext);
    const { setCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleContinue = () => {
        setCart(selectedPhotos); 
        navigate(`/shop/${albumId}/cart`);  
    };
    return (
        <aside className="aside">
            {album && <h2>{album.name}</h2>}
            <div id="select">
                <button onClick={onSelectAll}>
                    {isAllSelected() ? "- Alle abwählen" : "+ Alle auswählen"}
                </button>
            </div>
            {selectedPhotos.length > 0 && (<div id="aside-photo">
                <p>
                    <span className="number"><strong>{selectedPhotos.length}</strong> <span className="for-hidden">{selectedPhotos.length > 1 ? "Dateien" : "Datei"} ausgewählt</span></span>
                </p>
                <div className="aside-img">
                    {selectedPhotos.map((photo, index) => (
                        <img key={index} src={photo.imageUrl} alt={photo.name} />
                    ))}
                </div>
                <p id="next">
                    <button onClick={handleContinue}>Weiter</button>
                </p>
            </div>)
            }
        </aside>
    );
}
