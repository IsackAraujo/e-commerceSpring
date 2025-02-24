
import {Product} from '../services/CarrinhoServices.ts'
import {api} from "../lib/axios.ts";

interface CartItem extends Product {
    quantity: number;
}

interface OrderProduct {
    id: number;
    quantity: number;
}

export interface Order {
    orderDate: string;
    orderDescription: string;
    products: {
        id: number;
        name: string;
        description: string | null;
        imageUrl: string;
        quantity: number;
        totalValue: number;
    }[];
}

export class OrderService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async makeOrder(cart: CartItem[], userId: number): Promise<any> {
        try {
            const orderData = {
                userId: userId,
                orderDescription: "Novo pedido",
                products: cart.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                }))
            };

            const response = await api.post(`${this.baseUrl}/order`, orderData);


            return response.data;
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw error;
        }
    }

    async getAllOrders(userId: number): Promise<Order[]> { // Mudando retorno para Array
        try {
            const response = await api.get(`${this.baseUrl}/order/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            throw error;
        }
    }


}
