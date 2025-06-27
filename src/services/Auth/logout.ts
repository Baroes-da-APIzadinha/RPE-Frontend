import { useNavigate } from "react-router-dom";
import api from "@/services/axios"; // axios com withCredentials: true

export function useLogout() {
  const navigate = useNavigate();

  return async function logout() {
    try {
      await api.post('/auth/logout'); // rota que remove o cookie no back
    } catch (error) {
      console.warn("Erro ao deslogar, mas prosseguindo:", error);
    } finally {
      navigate("/", { replace: true });
      window.location.reload();
    }
  };
}
