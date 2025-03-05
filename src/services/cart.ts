import axios, { AxiosResponse } from "axios";
import { Types } from "mongoose";
import { ProductDoc } from "../models/Product";
import { CartRequestType } from "../types/Cart";

class CartService {
    static async store(cart: CartRequestType): Promise<ProductDoc[]> {
        try {
            const response: AxiosResponse<ProductDoc[]> = await axios.post(`/api/cart`, cart, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

export default CartService;