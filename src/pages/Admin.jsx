import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TableBarIcon from '@mui/icons-material/TableBar';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de cerrar sesión
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Importa el icono de cierre de sesión


import GestionMesas from './GestionMesas';
import GestionProductos from './GestionProductos.jsx';
import GestionUsuarios from './GestionUsuarios.jsx';
import GestionGanancias from './GestionGanancias.jsx';
import { ExitToApp } from "@mui/icons-material";

const AdminMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate(); // Redirección programática

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleLogout = () => {
    // Eliminar el rol del usuario de sessionStorage
    sessionStorage.removeItem('userRole');
    // Redirigir al login después de cerrar sesión
    navigate('/');
  };

  const userRole = sessionStorage.getItem('userRole');
  console.log("Rol del usuario desde sessionStorage:", userRole);

  // Verificar si el usuario tiene acceso, si no tiene rol, redirigir al login
  if (userRole !== "ADMIN") {
    navigate('/'); // Redirige si el rol no es ADMIN
    return null; // Si el usuario no tiene rol ADMIN, no renderiza el menú
  }

  return (
    <Box sx={{ display: 'flex', backgroundColor: "#121212", color: "#fff", minHeight: "100vh" }}>
      <Box sx={{ width: '230px', backgroundColor: '#1c1c1c', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Typography variant="h5" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
            Restaurante
          </Typography>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Productos" />
            </ListItemButton>

            
            <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
            
            
            <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <TableBarIcon />
              </ListItemIcon>
              <ListItemText primary="Mesas" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <BarChartIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Ganancias" />
            </ListItemButton>
          </List>
        </div>
        <div>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <ExitToAppIcon /> {/* Icono de cierre de sesión */}
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </div>
      </Box>

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        {selectedIndex === 2 && <GestionMesas />}
        {selectedIndex === 0 && <GestionProductos />}
        {selectedIndex === 1 && <GestionUsuarios />}
        {selectedIndex === 3 && <GestionGanancias />}
      </Box>
    </Box>
  );
};

export default AdminMenu;