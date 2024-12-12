import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import MeseroScreen from './App.jsx';
import AdminScreen from './pages/Admin.jsx';  // Página para ADMIN
import Tables from './pages/Tables.jsx';
import App from './App.jsx';
import Orders from './pages/Orders.jsx';
import MenuPage from './components/Menu/Menu.jsx';
import ProductDetail from './components/Menu/Info.jsx';
import Factura from './pages/Factura.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { boxClasses } from '@mui/material';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/mesero" element={<MeseroScreen />} />
         {/* Rutas privadas solo para ADMIN */}
         <Route element={<PrivateRoute roleRequired="ADMIN" />}>
          <Route path="/admin" element={<AdminScreen />} />  {/* Ruta para ADMIN */} 
        </Route>

        <Route path="/app" element={<App />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/orders" element={<Orders />} />
         {/* Ruta para MENU */}
         <Route path="/menuqr" element={<MenuPage />} />
         <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/factura" element={<Factura />} />

        {/* Ruta comodín para redirigir a "/" si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;