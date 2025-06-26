import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import type { JSX } from 'react';

interface PublicRouteProps {
  element: JSX.Element;
}

const PublicRoute = ({ element }: PublicRouteProps) => {
  const token = Cookies.get('authToken');
  return token ? <Navigate to="/home" replace /> : element;
};

export default PublicRoute;
