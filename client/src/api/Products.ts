import axios from 'axios';

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryEntity: {
        id: number;
        name: string;
    };
}

export class ProductService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getProducts(): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/product`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter os produtos:', error);
            throw error;
        }
    }

    async getProductById(id: string): Promise<any> {
        try {
            const productId = parseInt(id, 10); // Converte o id para um número inteiro
            const response = await axios.get(`${this.baseUrl}/product/${productId}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao obter o produto com ID ${id}:`, error);
            throw error;
        }
    }

    async getProductsByCategory(categoryId: number): Promise<Product[]> {
        try {

            const response = await axios.get<Product[]>(`${this.baseUrl}/product/category/${categoryId}`);
            console.log("Log 1: " + response.data);
            return response.data;
        } catch (error) {
            console.error(`Erro ao obter produtos da categoria ${categoryId}:`, error);
            throw error;
        }
    }

}
