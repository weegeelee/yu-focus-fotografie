import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../components/store/CartContext.jsx";
import Delete from "../assets/icon/delete.png"
import "../components/cart.css"

export default function Cart() {
    const { albumId } = useParams();
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const getNameWithoutExtension = (fileName) => fileName.replace(/\.[^/.]+$/, "");

    const handleGoBack = () => {
        navigate(`/shop/${albumId}`);
    };
    const handleGoNext = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn("No token found, redirecting to login.");
            navigate(`/login?redirectTo=${encodeURIComponent(`/shop/${albumId}/checkout`)}`);
            return null;
        } else {
            navigate(`/shop/${albumId}/checkout`)
        };
    };

    return (
        <div className="cart" >
            <h2>Warenkorb</h2>
            {cart.length > 0 && (<div>
                <h3>
                    Du hast <span className="number">{cart.length}</span> {cart.length > 1 ? "Fotos" : "Foto"} ausgewählt:
                </h3>
                <div className="view-container">
                    <ul className="view-box">
                        {cart.map((photo, index) => (
                            <li key={index}>
                                <img src={photo.imageUrl} alt={photo.name} />
                                <p className="photo-name">{getNameWithoutExtension(photo.name)}</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearCart}><img src={Delete} alt="delete icon" /></button>
                </div>
            </div>)
            }
            <div className="button-box">
                <button className="back-button" onClick={handleGoBack}>weitere Fotos auswählen</button>
                <button className="check-button" onClick={handleGoNext}>bestellen</button>
            </div>
        </div>
    );
}