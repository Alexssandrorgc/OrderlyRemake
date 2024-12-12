// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

// Este componente revisa si el usuario tiene el rol de ADMIN.
const PrivateRoute = ({ roleRequired }) => {
  // Aquí puedes usar el estado global o un almacenamiento como sessionStorage o localStorage
  const userRole = sessionStorage.getItem('userRole'); // O de alguna otra forma

  // Si no es el rol correcto o no hay rol, redirigimos a login
  if (userRole !== roleRequired) {
    return <Navigate to="/" />;
  }

  return <Outlet />; // Renderiza la ruta hija si el rol es el adecuado
};

export default PrivateRoute;
