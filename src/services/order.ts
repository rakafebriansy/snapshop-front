import axios, { AxiosResponse } from "axios";

class OrderService {
    static async store(order: any): Promise<{url: string}> {
        try {
            const response: AxiosResponse = await axios.post(`/api/checkout`, order, {
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

export default OrderService;