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
        console.log('Dados do usuário:', userData); // Verifique se a estrutura está correta
        try {
            const response = await axios.post(`${this.baseUrl}/user`, userData, {
                headers: {
                    'Content-Type': 'application/json', // Garantir que o conteúdo seja tratado como JSON
                },
            });
            console.log("Status da criação: " + response.status);
            return response.data;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    }

}