import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { SelectedPhotosContext } from "../components/store/PhotoContext.jsx";
import { CartContext } from "../components/store/CartContext.jsx";
import Input from "../components/UI/Input.jsx";
import axios from "axios";
import "../components/checkout.css"

export default function Checkout() {
    const { albumId } = useParams();
    const { selectedPhotos } = useContext(SelectedPhotosContext);
    const { cart, clearCart } = useContext(CartContext);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [useUserAddress, setUseUserAddress] = useState(true);
    const navigate = useNavigate();
    const [shippingAddress, setShippingAddress] = useState({
        firstname: "",
        lastname: "",
        street: "",
        postal: "",
        city: "",
    });

    const handleGoBack = () => {
        navigate(`/shop/${albumId}/cart`);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!userId || !token) return;
        axios.get(`http://localhost:3000/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log("Fetched user data:", response.data);
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch user details", error);
                setError(error.response?.data?.message || "An error occurred");
            });
    }, []);

    const handleAddressChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handleSubmitCart = async () => {
        const token = localStorage.getItem("token");
        const cartData = {
            albumId: albumId,
            selectedPhotos: selectedPhotos.map(photo => photo._id),
            shippingAddress: !useUserAddress ? {
                firstname: shippingAddress.firstname,
                lastname: shippingAddress.lastname,
                street: shippingAddress.street,
                postal: shippingAddress.postal,
                city: shippingAddress.city
            } : null,
        };

        try {
            if (!cart || cart.length === 0) {
                alert("Warenkorb ist leer!");
                return;
            }
            const response = await axios.post(
                'http://localhost:3000/cart', JSON.stringify(cartData), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            console.log(response.data);
            alert("Cart submitted successfully!");
            clearCart();
            navigate(`/order`);
        } catch (error) {
            setError(error.response?.data?.message || "Error submitting cart");
            console.error(error);
        }
    };

    return (
        <div className="checkout" >
            <h2>Kundenbestellung</h2>
            {user ? (
                <div className="checkout-container">
                    <div className="checkout-box">
                        <h4>E-Mail:</h4>
                        <p>{user.email}</p>
                    </div>
                    <div className="checkout-box">
                        <h4>Rechnungsadresse:</h4>
                        <p>{user.firstname} {user.lastname}</p>
                        <p>{user.street}</p>
                        <p>{user.postal} {user.city}</p>
                    </div>
                    <div className="checkout-box">
                        <h4>Lieferadresse</h4>
                        <div className="check-box">

                            <input
                                className="check-radio"
                                type="radio"
                                name="shippingOption"
                                checked={useUserAddress === true}
                                onChange={() => {
                                    setUseUserAddress(true);
                                    setShippingAddress({
                                        firstname: "",
                                        lastname: "",
                                        street: "",
                                        postal: "",
                                        city: ""
                                    });
                                }}
                            />
                            <label htmlFor="shippingOption">wie Rechnungsadresse</label>
                        </div>
                        <div className="check-box">
                            <input
                                className="check-radio"
                                type="radio"
                                id="shippingOption"
                                checked={useUserAddress === false}
                                onChange={() => setUseUserAddress(false)}
                            />
                            <label htmlFor="shippingOption">Ich möchte eine abweichende Lieferadresse angeben</label>
                        </div>
                        {!useUserAddress && (
                            <form onSubmit={handleSubmitCart} className="address-form">
                                <div>
                                    <Input label="Vorname *" type="text" name="firstname" id="firstname" value={shippingAddress.firstname} onChange={handleAddressChange} required />
                                    <Input label="Nachname *" type="text" name="lastname" id="lastname" value={shippingAddress.lastname} onChange={handleAddressChange} required />
                                </div>
                                <Input label="Straße und Nr.*" type="text" name="street" id="street" value={shippingAddress.street} onChange={handleAddressChange} required />
                                <div>
                                    <Input label="PLZ *" type="text" name="postal" id="postal" value={shippingAddress.postal} onChange={handleAddressChange} required />
                                    <Input label="Ort *" type="text" name="city" id="city" value={shippingAddress.city} onChange={handleAddressChange} required />
                                </div>
                                <div className="button-box">
                                    <button className="back-button" onClick={handleGoBack}>zurück</button>
                                    <button className="check-button" type="submit">Bestellung abschließen</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <div className={!useUserAddress ? "button-box-hidden" : "button-box-outside"}>
                <button className="back-button" onClick={handleGoBack}>zurück</button>
                <button className="check-button" onClick={handleSubmitCart}>Bestellung abschließen</button>
            </div>
        </div >
    );
}