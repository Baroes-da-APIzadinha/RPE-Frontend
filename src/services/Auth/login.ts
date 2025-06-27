import { postRequest } from "../HTTP/requests";

const baseUrl = "auth"

export function handleLogin(email: string, password: string): Promise<boolean> {
  console.log("Tentando fazer login com:", email, password);

  return postRequest(`${baseUrl}/login`, { 
    email: email, 
    senha: password 
  })
    .then(() => {   
      return true;
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error);
      return false;
    });
}