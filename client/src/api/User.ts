import axios from 'axios';
/*{
    "username": "Testes",
    "displayName": "TesteDisplay",
    "email": "email@gamil.com",
    "password": "123"
}*/
export interface UserRegisterData {
    username: string;
    displayName: string;
    email: string;
    password: string;
}

export class UserService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async registerUser(userData: UserRegisterData): Promise<any> {
        console.log('Dados do usuário:', userData);
        try {
            const response = await axios.post(`${this.baseUrl}/user`, userData, {
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

}