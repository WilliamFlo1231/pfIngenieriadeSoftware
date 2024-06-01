import { Outlet, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const user = Cookies.get('user');
  let userData = {};

  if (user) {
    try {
      userData = JSON.parse(user);
    } catch (error) {
      console.error('Error al parsear la cookie del usuario:', error);
    }
  }

  console.log('User data:', userData);

  if (userData.role === 'Usuario') {
    return <Outlet />;
  }

  return <Navigate to="/Login" />;
};

export default PrivateRoute;
