import axios from 'axios';
import {api} from "../lib/axios.ts";


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

    async getProducts(): Promise<Product[]> {
        try {
            const response = await api.get<Product[]>(`${this.baseUrl}/product`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter os produtos:', error);
            throw error;
        }
    }

    async getProductById(id: string): Promise<Product> {
        try {
            const productId = parseInt(id, 10);
            if (isNaN(productId)) {
                throw new Error('ID inválido');
            }
            const response = await api.get<Product>(`${this.baseUrl}/product/${productId}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao obter o produto com ID ${id}:`, error);
            throw error;
        }
    }

    async getProductsByCategory(categoryId: number): Promise<Product[]> {
        try {
            const response = await api.get<Product[]>(`${this.baseUrl}/product/category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao obter produtos da categoria ${categoryId}:`, error);
            throw error;
        }
    }
}