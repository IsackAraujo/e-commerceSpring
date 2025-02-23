import { IUserLogin, IUserSignup } from "../commons/interfaces.ts";
import { api } from '../lib/axios.ts';


const signup = async (user: IUserSignup): Promise<any> => {
    let response;
    try {
        response = await api.post("/users", user);
    } catch (err: any) {
        response = err.response;
    }
    return response;
};

const login = async (user: IUserLogin): Promise<any> => {
    let response;
    try {
        response = await api.post("/login", user);

        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));

        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

    } catch (err: any) {
        response = err.response;
    }
    return response;
};

const isAuthenticated = async (): Promise<boolean> => {
    const token = localStorage.getItem("token");

    if (!token) {
        return false;
    }else {
        return true;
    }

    try {
        api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;

        const response = await api.get('/auth/validate-token');
        return response.status === 200;
    } catch (error) {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        return false;
    }
}

const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    api.defaults.headers.common["Authorization"] = '';
}

const AuthService = {
    signup,
    login,
    isAuthenticated,
    logout,
};

export default AuthService;