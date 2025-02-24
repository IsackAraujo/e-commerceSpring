import axios from 'axios'



export const api = axios.create({
    baseURL: "http://localhost:8080/",
})

const token = localStorage.getItem("token");
if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
}
