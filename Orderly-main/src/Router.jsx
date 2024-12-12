// src/Router.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import MeseroScreen from './App.jsx';
import AdminScreen from './pages/Admin.jsx';  // Página para ADMIN
import Tables from './pages/Tables.jsx';
import App from './App.jsx';
import Orders from './pages/Orders.jsx';
import MenuPage from './components/Menu/Menu.jsx';
import ProductDetail from './components/Menu/Info.jsx';
import Factura from './pages/Factura.jsx';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mesero" element={<MeseroScreen />} />
        <Route path="/admin" element={<AdminScreen />} />  {/* Ruta para ADMIN */}

        <Route path="/app" element={<App />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/orders" element={<Orders />} />
         {/* Ruta para MENU */}
         <Route path="/menuqr" element={<MenuPage />} />
         <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/factura" element={<Factura />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
