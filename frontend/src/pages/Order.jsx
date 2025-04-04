import { useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import api from "../../api.js";
import "../components/order.css"

export default function Order() {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                if (!userId || !token) return;

                const response = await api.get(`/customers/${userId}`);
                if (response.data) {
                    setCartData(response.data);
                }
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        fetchCartData();
    }, []);

    const handleDownloadAll = async () => {
        if (!cartData?.cart?.length) {
            console.error("No photos to download.");
            return;
        }

        const selectedPhotos = cartData.cart.flatMap(order => order.selectedPhotos);
        const zip = new JSZip();
        const albumName = cartData?.cart[0]?.albumObjectId?.name || "Meine_Fotos";
        const folder = zip.folder(albumName);

        const imagePromises = selectedPhotos.map(async (photo) => {
            const response = await fetch(photo.imageUrl);
            const blob = await response.blob();
            const fileName = photo.imageUrl.split('/').pop().split('-').slice(-1)[0];
            folder.file(fileName, blob);
        });

        await Promise.all(imagePromises);

        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, `${albumName}.zip`);
        });
    };

    return (
        <main>
            <div className="customer-order" >
                <h3>Bestellung</h3>
                {cartData?.cart?.length > 0 ? (
                    cartData.cart.map((order) => (
                        <>
                            <div key={order._id} className="customer-orderbox">
                                <div className="order-info">
                                    <p>Album:</p>
                                    <span>{order.albumObjectId?.name || 'No album name available'}</span>
                                </div>
                                <div className="order-info">
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
                                <div className="order-photos">
                                    {order.selectedPhotos.map(photo => (
                                        <li key={photo._id}>
                                            <img src={photo.imageUrl} alt={photo.name} />
                                            <span>{photo.name}</span>
                                        </li>
                                    ))}
                                </div>
                            </div>
                            <button className="download-btn" onClick={handleDownloadAll} >Datein herunterladen</button>
                        </>
                    ))
                ) : (
                    <p className="no-order">keine Bestellung</p>
                )}
            </div>
        </main >
    );
}