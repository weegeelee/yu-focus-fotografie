import { useState } from "react";
import { createContext } from "react";

export const UserProgressContext = createContext({
    progress: '',
    addNewAlbum: () => { },
    hideNewAlbum: () => { },
});

export default function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState('');

    function addNewAlbum() {
        setUserProgress('newalbum');
    }

    function hideNewAlbum() {
        setUserProgress('');
    }
   
    const userProgressContext = {
        progress: userProgress,
        addNewAlbum,
        hideNewAlbum,
    };

    return <UserProgressContext.Provider value={userProgressContext}>{children}</UserProgressContext.Provider>
}