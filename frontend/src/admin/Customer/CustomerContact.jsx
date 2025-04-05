import { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal";
import ContactSide from "./ContactSide";
import api from "../../../api.js";
import "./customer.css"

export default function CustomerContact() {
    const [contacts, setContacts] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState(new Set());
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await api.get("/contact");
                const sortedContacts = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setContacts(sortedContacts);
            } catch (error) {
                console.error("Failed to fetch data", error);
            };
        };
        fetchContact();
    }, []);

    const toggleSelect = (id) => {
        setSelectedContacts((prevSelected) => {
            const updatedSelected = new Set(prevSelected);
            if (updatedSelected.has(id)) {
                updatedSelected.delete(id);
            } else {
                updatedSelected.add(id);
            }
            return updatedSelected;
        });
    };

    const toggleSelectAll = () => {
        setSelectedContacts((prevSelected) => {
            if (prevSelected.size === contacts.length) {
                return new Set();
            } else {
                return new Set(contacts.map(contact => contact._id));
            }
        });
    };

    const handleBatchDeleteClick = () => {
        if (selectedContacts.size === 0) return;
        setDeleteTarget(Array.from(selectedContacts));
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedContacts.size === 0) return;

        const idsToDelete = Array.from(selectedContacts);
        try {
            await api.post("/contact/batch-delete", { ids: idsToDelete });
            setContacts(contacts.filter(contact => !idsToDelete.includes(contact._id)));
            setSelectedContacts(new Set());
            setShowConfirm(false);
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedContacts = contacts.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(contacts.length / pageSize);

    return (
        <main className="contact-container">
            <ContactSide
                onDelete={handleBatchDeleteClick}
                onSelectAll={toggleSelectAll}
                selectedCount={selectedContacts.size}
                totalContacts={contacts.length}
            />
            <ul className="message-container">
                {paginatedContacts.map((contact) => (
                    <li key={contact._id} className="contact-li">
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={selectedContacts.has(contact._id)}
                            onChange={() => toggleSelect(contact._id)}
                        />
                        <div className="contactbox">
                            <div className="contactdata">
                                <div className="contact-info">
                                    <p><strong>Name:</strong></p>
                                    <span>{contact.firstname} {contact.lastname}</span>
                                </div>
                                <div className="contact-info">
                                    <p><strong>E-Mail:</strong></p>
                                    <span>{contact.email}</span>
                                </div>
                                <div className="contact-info">
                                    <p><strong>Telefon:</strong></p>
                                    <span>{contact.phone}</span>
                                </div>
                            </div>
                            <p className="time">{contact.date ? new Date(contact.date).toLocaleString('de-DE', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            }).replace(',', '') : "N/A"}</p>
                        </div>
                        <div className="messagebox">
                            <h4>Nachricht:</h4>
                            <p>{contact.message}</p>
                        </div>
                    </li >
                ))
                }
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>←</button>
                    <span>Seite {currentPage} von {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>→</button>
                </div>
            </ul >

            {
                showConfirm && (
                    <Modal className="modal" open={showConfirm}>
                        <div className="confirm-modal">
                            <h3>Nachricht löschen</h3>
                            <p>Diese Nachricht werden dauerhaft gelöscht.</p>
                            <div className="btn-box">
                                <button onClick={() => setShowConfirm(false)} className="cancel-btn">Abrechen</button>
                                <button onClick={handleConfirmDelete} className="confirm-btn">löschen</button>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </main >
    );
};
