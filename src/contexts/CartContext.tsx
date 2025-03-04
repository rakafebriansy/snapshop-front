import { Types } from "mongoose";
import { useState } from "react";
import { createContext } from "react";

export type CartContextType = {
    cartProducts: any[];
    setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
    addProduct(productId: Types.ObjectId): void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartProducts, setCartProducts] = useState<any[]>([]);

    const addProduct = (productId: Types.ObjectId): void => {
        setCartProducts(prev => [...prev, productId])
    }
    
    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
            {children}
        </CartContext.Provider>
    );
}