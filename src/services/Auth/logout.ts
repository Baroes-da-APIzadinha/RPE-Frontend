import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();

  return function logout() {
    Cookies.remove('authToken');
    navigate('/', { replace: true });
    window.location.reload();
  };
}
