// AdminMenu.jsx
import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TableBarIcon from '@mui/icons-material/TableBar';
import BarChartIcon from '@mui/icons-material/BarChart';
import GestionMesas from './GestionMesas'; // Importamos el nuevo componente
import GestionProductos from './GestionProductos.jsx';
import GestionUsuarios from './GestionUsuarios.jsx';
import GestionGanancias from './GestionGanancias.jsx';


const AdminMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: "#121212", color: "#fff", minHeight: "100vh" }}>
      <Box sx={{ width: '230px', backgroundColor: '#1c1c1c', padding: '16px' }}>
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
        <Divider />
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
