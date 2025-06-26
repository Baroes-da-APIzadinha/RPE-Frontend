import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

function logout(){
  Cookies.remove('authToken');
  navigate('/', { replace: true });
  window.location.reload();
};

export default logout;
