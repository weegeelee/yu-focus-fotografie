import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const SelectedPhotosContext = createContext({
  album: { photos: [] },
  selectedPhotos: [],
  onSelectPhoto: () => { },
  onSelectAll: () => { },
  isAllSelected: () => false,
  isSelected: () => false,
});

export default function SelectedPhotosProvider({ children }) {
  const EXPIRATION_TIME = 60 * 60 * 1000;
  const { albumId } = useParams();
  const albumIdRef = useRef(albumId || '');
  const [album, setAlbum] = useState(null);
  const [selectedPhotos, setSelectedPhotos] = useState(() => {
    try {
      const savedData = localStorage.getItem(`selectedPhotos-${albumId}`);
      if (savedData) {
        const { photos, createdAt } = JSON.parse(savedData);
        if (!createdAt || Date.now() - createdAt > EXPIRATION_TIME) {
          localStorage.removeItem(`selectedPhotos-${albumId}`);
          return [];
        }
        return photos;
      }
    } catch (error) {
      console.error("Failed to parse localStorage, clear data", error);
      localStorage.removeItem(`selectedPhotos-${albumId}`);
    }
    return [];
  });

  useEffect(() => {
    if (!albumId) return;
    const fetchAlbum = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/albums/${albumId}`);
        const fetchedAlbum = response.data;
        setAlbum({ ...fetchedAlbum, albumId: fetchedAlbum.id });
      } catch (error) {
        console.error("Error in getting album data:", error);
      }
    };
    fetchAlbum();
  }, [albumId]);

  useEffect(() => {
    if (!albumId) return; 
    if (albumId && albumIdRef.current && albumIdRef.current !== albumId) {
      setSelectedPhotos([]); 
      localStorage.removeItem(`selectedPhotos-${albumIdRef.current}`);
    }
    albumIdRef.current = albumId; 
  }, [albumId]);

  useEffect(() => {
    if (!albumId) return;
    localStorage.setItem(`selectedPhotos-${albumId}`, JSON.stringify({
      photos: selectedPhotos,
      createdAt: Date.now(),
    }));
  }, [selectedPhotos, albumId]);

  function handleIsAllSelected() {
    const allSelected = selectedPhotos.length === album?.photos.length;
    console.log("isAllSelected:", allSelected);
    return allSelected;
  }

  function handleSelectAllPhotos() {
    const isAllSelected = handleIsAllSelected();

    if (!isAllSelected) {
      const selectAllPhotos = album.photos;
      setSelectedPhotos(selectAllPhotos);
    } else {
      setSelectedPhotos([]);
    }
  }

  function handleIsSelected(photoId) {
    return selectedPhotos.some(photo => photo.id === photoId);
  }

  function handleSelectPhoto(photoId) {
    setSelectedPhotos(prevSelectedPhotos => {
      const selectedPhoto = album.photos.find(photo => photo.id === photoId);
      if (!selectedPhoto) return prevSelectedPhotos;

      if (prevSelectedPhotos.some(photo => photo.id === photoId)) {
        return prevSelectedPhotos.filter(photo => photo.id !== photoId);
      } else {
        return [...prevSelectedPhotos, selectedPhoto];
      }
    });
  }

  const selectedPhotosCxt = {
    album: album,
    albumId: albumId,
    selectedPhotos: selectedPhotos,
    onSelectPhoto: handleSelectPhoto,
    onSelectAll: handleSelectAllPhotos,
    isAllSelected: handleIsAllSelected,
    isSelected: handleIsSelected,
  }
  return <SelectedPhotosContext.Provider value={selectedPhotosCxt}>{children}</SelectedPhotosContext.Provider>
};