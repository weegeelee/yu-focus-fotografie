import { useState, useContext } from "react";
import { SelectedPhotosContext } from "../components/store/PhotoContext.jsx"; 
import "./photos.css";

export default function PhotoItem({ photo, index, allPhotos }) {
    const [preview, setPreview] = useState(null);
    const { onSelectPhoto, isSelected } = useContext(SelectedPhotosContext);
    const getNameWithoutExtension = (fileName) => fileName.replace(/\.[^/.]+$/, "");
    
    function handleChangePreview(index) {
        if (allPhotos.length === 0) return;
        let valiadIndex;
        if (index < 0) {
            valiadIndex = allPhotos.length - 1;
        } else if (index >= allPhotos.length) {
            valiadIndex = 0;
        } else {
            valiadIndex = index;
        }
        const selectedPhoto = { ...allPhotos[valiadIndex], index: valiadIndex };

        setPreview(selectedPhoto);
    }

    return (
        <>
            {preview && (
                <div className="preview-box">
                    <p className="top-button">
                        <button onClick={() => setPreview(null)}>&#215;</button>
                    </p>
                    <img src={preview.imageUrl} alt={preview.name} />
                    <div className="preview-config">
                        <div className="config-box">
                            <button className="left" onClick={() => handleChangePreview(preview.index - 1, allPhotos)}>{'<'}</button>
                            <span>{preview.index + 1} / {allPhotos.length}</span>
                            <button className="right" onClick={() => handleChangePreview(preview.index + 1, allPhotos)}>{'>'}</button>
                        </div>
                        <div className="config-button">
                            <button onClick={() => onSelectPhoto(preview.id)} className={isSelected(preview.id) ? 'preview-button-selected' : 'preview-button'}>{isSelected(preview.id) ? ' Abwählen' : '+ Auswählen'}</button>
                        </div>
                    </div>
                </div>
            )}
            <li className={isSelected(photo.id) ? 'li li-selected' : 'li'}>
                <img src={photo.imageUrl} alt={photo.name} onContextMenu={(e) => e.preventDefault()} onClick={() => handleChangePreview(index)} />
                <p className="photo-button">
                    <button onClick={() => onSelectPhoto(photo.id)} className={isSelected(photo.id) ? 'button-selected' : 'button'}>{isSelected(photo.id) ? '' : '+'}</button>
                </p>
                <p className="photo-name">{getNameWithoutExtension(photo.name)}</p>
            </li>
        </>
    );
}

