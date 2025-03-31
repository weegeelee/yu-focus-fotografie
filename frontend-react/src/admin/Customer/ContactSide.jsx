import "./customer.css";

export default function ContactSide({ onDelete, onSelectAll, selectedCount, totalContacts }) {
    return (
        <aside className="contact-aside">
            <h2>Nachricht</h2>
            <div className="message-button">
                <button onClick={onSelectAll} className="select-all-btn">
                    {selectedCount === totalContacts ? "- Alle abwählen" : "+ Alle auswählen"}
                </button>
                <button onClick={onDelete} disabled={selectedCount === 0} className="delete-all-btn">
                    Löschen ({selectedCount})
                </button>
            </div>
        </aside>
    );
}