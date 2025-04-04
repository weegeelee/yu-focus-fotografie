import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const EXPIRATION_TIME = 60 * 60 * 1000;
    const { albumId } = useParams();
    const [cart, setCart] = useState(() => {
        if (!albumId) return []; 
        try {
            if (!albumId) return [];
            const savedCart = localStorage.getItem(`cart-${albumId}`);
            if (savedCart) {
                const { cart, createdAt } = JSON.parse(savedCart);
                if (!createdAt || Date.now() - createdAt > EXPIRATION_TIME) {
                    localStorage.removeItem(`cart-${albumId}`);
                    return [];
                }
                return cart;
            }
        } catch (error) {
            console.log(" Failed to parse localStorage", error);
        } return [];
    });

    useEffect(() => {
        if (!albumId || cart === null) return;
        localStorage.setItem(`cart-${albumId}`, JSON.stringify({
            cart,
            createdAt: Date.now(),
        }));
    }, [cart, albumId]);

    const clearCart = () => {
        setCart([]);
    };

    
    return (
        <CartContext.Provider value={{ cart, setCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};



