import galerie from "../../assets/icon/galerie.png";
import "./album.css";

export default function NoAlbumSelected({onStartAddAlbum}) {
    return (
        <div className="new-album">
            <p>Keine Galerie vorhanden.</p>
            <img src={galerie} alt="photos" className="galerie-icon"/>
            <p >Los geht's! Erstelle deine erste Galerie.</p>
            <p>
                <button className="album-button" onClick={onStartAddAlbum}>+ Neue Galerie erstellen</button>
            </p>
        </div>
    );
}