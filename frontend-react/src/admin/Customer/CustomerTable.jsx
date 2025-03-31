import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Delete from "../../assets/icon/delete.png";
import Modal from "../../components/UI/Modal";
import "./customer.css"

export default function CustomerTable({ customers, onDelete }) {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setShowConfirm(true);
    };

    return (
        <div className="table-container">
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-Mail</th>
                        <th>Adresse</th>
                        <th>Bestellung</th>
                        <th>Löschen</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {customers.map((customer) => (
                        <tr key={customer._id} className="tr-row" >
                            <td onClick={() => navigate(`/admin/customer/${customer._id}`)}>{customer.lastname}, {customer.firstname}</td>
                            <td onClick={() => navigate(`/admin/customer/${customer._id}`)}>{customer.email}</td>
                            <td onClick={() => navigate(`/admin/customer/${customer._id}`)}>{customer.street}, {customer.postal}, {customer.city}</td>
                            <td onClick={() => navigate(`/admin/customer/${customer._id}`)}>{customer.cart.length > 0 ? (
                                customer.cart.map((cartItem, index) => (
                                    <div key={index}>
                                        <p><b>Album ID:</b> {cartItem.albumId}</p>
                                        {cartItem.selectedPhotos.map((photo, i) => (
                                            <div key={i} className="photo-item">
                                                <span>{photo.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <span>keine Bestellung</span>
                            )}
                            </td>
                            <td>
                                <button className="customer-delete-btn" onClick={() => { handleDeleteClick(customer._id); }}>
                                    <img src={Delete} alt="delete icon" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showConfirm && (
                <Modal className="modal" open={showConfirm}>
                    <div className="confirm-modal">
                        <h3>Kunden löschen</h3>
                        <p>Diese Kundendaten werden dauerhaft aus deiner Kundenliste gelöscht.</p>
                        <div className="btn-box">
                            <button onClick={() => setShowConfirm(false)} className="cancel-btn">Abrechen</button>
                            <button onClick={() => { onDelete(selectedUserId); setShowConfirm(false); }} className="confirm-btn">löschen</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

