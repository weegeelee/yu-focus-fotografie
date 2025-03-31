import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowLeft from "../../assets/icon/pfeil-kreis-links.png"
import "./customer.css";

export default function CustomerOrder() {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:3000/customers/${customerId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log("Fetched customer data:", response.data);
                setCustomer(response.data);
            })
            .catch((error) => {
                console.error("Failed to fetch customer details", error);
                setError(error.response?.data?.message || "An error occurred");
            });
    }, [customerId]);

    if (error) {
        return <h2>{error}</h2>;
    }
    if (!customer) {
        return <h2>Loading...</h2>;
    }
    return (
        <div className="customer-detail">
            <button className="arrowleft" onClick={() => navigate(-1)}><img src={ArrowLeft} alt="arrow-left}" /> </button>
            <div className="detail-container">
                <h2>Kundenbestellung</h2>
                <div className="customer-address">
                    <p>Name:</p>
                    <span>{customer.firstname} {customer.lastname}</span>
                </div>
                <div className="customer-address">
                    <p>Anschrift:</p>
                    <span>{customer.street}, {customer.postal} {customer.city}</span>
                </div>
                <div className="customer-address">
                    <p>E-Mail:</p>
                    <span>{customer.email}</span>
                </div>
                <div className="order-box">
                    <h3>Bestellung</h3>
                    {customer?.cart?.length > 0 ? (
                        customer.cart.map(order => (
                            <div key={order._id}>
                                <div className="customer-address">
                                    <p>Album:</p>
                                    <span>{order.albumObjectId?.name || 'No album name available'}</span>
                                </div>
                                <div className="customer-address">
                                    <p>Lieferadresse:</p>
                                    <span>{order?.shippingAddress?.firstname} {order?.shippingAddress?.lastname}</span>
                                    <span>{order?.shippingAddress?.street}</span>
                                    <span>{order?.shippingAddress?.postal} {order?.shippingAddress?.city}</span>
                                </div>
                                <div className="customer-address">
                                    <p>Datum:</p>
                                    <span>{order.date ? new Date(order.date).toLocaleString('de-DE', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    }).replace(',', '') : "N/A"}</span>
                                </div>
                                <p className="customer-address">Fotos:</p>
                                <div className="photo-list">
                                    {order.selectedPhotos.map(photo => (
                                        <li key={photo._id}>
                                            <img src={photo.imageUrl} alt={photo.name} />
                                            <span>{photo.name}</span>
                                        </li>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>keine Bestellung</p>
                    )}
                </div>
            </div>
        </div>
    );
}