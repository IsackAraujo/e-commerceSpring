import axios from 'axios';

export interface UserAuthData {
    displayName: string
    password: string;
}

export class LoginService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async registerUser(userData: UserAuthData): Promise<any> {
        console.log('Dados do usuário:', userData);
        try {
            const response = await axios.post(`${this.baseUrl}/login`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Status da criação: " + response.status);
            return response.data;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    }

    async loginUser(userData: UserAuthData): Promise<any> {
        console.log('Dados de login:', userData);
        // Edit the end-point here
        try {
            const response = await axios.post(`${this.baseUrl}/login`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Status do login: " + response.status);


            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            return response.data;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    }

}