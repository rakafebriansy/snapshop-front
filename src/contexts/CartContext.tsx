import { Types } from "mongoose";
import { useEffect, useState } from "react";
import { createContext } from "react";

export type CartContextType = {
    cartProducts: any[];
    setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
    addProduct(productId: Types.ObjectId): void;
    removeProduct(productId: Types.ObjectId): void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const ls: Storage | null = typeof window !== 'undefined' ? window.localStorage : null;
    const defaultProducts = ls ? JSON.parse(ls?.getItem('cart')!) : [];
    
    const [cartProducts, setCartProducts] = useState<Types.ObjectId[]>([]);

    const addProduct = (productId: Types.ObjectId): void => {
        setCartProducts(prev => [...prev, productId])
    }

    const removeProduct = (productId: Types.ObjectId): void => {
        setCartProducts(prev => {
            const pos = prev.indexOf(productId);
            if(pos !== -1) {
                return prev.filter((_, i) => i !== pos);
            }
            return prev;
        });
    }

    useEffect(() => {
        if (cartProducts.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    useEffect(() => {
        if(ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')!))
        }
    },[]);

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct }}>
            {children}
        </CartContext.Provider>
    );
}