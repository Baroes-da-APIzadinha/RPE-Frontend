import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "@/services/axios";

export function useLogout() {
  const navigate = useNavigate();

  return async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.warn("Erro ao deslogar do backend, prosseguindo:", error);
    } finally {
      Cookies.remove("perfil");

      navigate("/", { replace: true });
      window.location.reload();
    }
  };
}
