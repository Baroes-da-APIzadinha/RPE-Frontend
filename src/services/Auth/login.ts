import Cookies from "js-cookie";
import { postRequest } from "../HTTP/requests";

const baseUrl = "auth"

export function handleLogin(email: string, password: string) {
    console.log("Tentando fazer login com:", email, password);
    return postRequest(`${baseUrl}/login`, { 
        email: email, 
        senha: password })
        .then((response) => {
        if (response.access_token) {
            Cookies.set("authToken", response.access_token, { expires: 1 , secure: true, sameSite: "Strict" }); 
            return response;
        } else {
            throw new Error("Erro ao fazer login: Credenciais inválidas.");
        }
        })
        .catch((error) => {
        console.error("Erro ao fazer login:", error);
        throw error;
        });
}