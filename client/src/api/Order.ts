import axios from 'axios';
import {Product} from '../services/CarrinhoServices.ts'

interface CartItem extends Product {
    quantity: number;
}

interface OrderProduct {
    id: number;
    quantity: number;
}

export interface Order {
    userId: number;
    orderDescription: string;
    products: OrderProduct[];
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

            const response = await axios.post(`${this.baseUrl}/order`, orderData);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            throw error;
        }
    }

    async getAllOrders(userId: number): Promise<Order[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/order/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter pedidos:', error);
            throw error;
        }
    }


}
