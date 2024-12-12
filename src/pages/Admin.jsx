import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import TableBarIcon from "@mui/icons-material/TableBar";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import GestionMesas from "./GestionMesas";
import GestionProductos from "./GestionProductos.jsx";
import GestionUsuarios from "./GestionUsuarios.jsx";
import GestionGanancias from "./GestionGanancias.jsx";

const AdminMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userRole");
    navigate("/");
  };

  const userRole = sessionStorage.getItem("userRole");
  console.log("Rol del usuario desde sessionStorage:", userRole);

  if (userRole !== "ADMIN") {
    navigate("/");
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Menú lateral */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: { xs: isSidebarOpen ? "230px" : "0", sm: "230px" },
          backgroundColor: "#1c1c1c",
          padding: isSidebarOpen ? "16px" : { xs: "0", sm: "16px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          transition: "width 0.3s ease, padding 0.3s ease",
          zIndex: 1000,
        }}
      >
        {isSidebarOpen && (
          <div>
            <Typography
              variant="h5"
              sx={{ marginBottom: "16px", fontWeight: "bold" }}
            >
              Restaurante
            </Typography>
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Productos" />
              </ListItemButton>

              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
              </ListItemButton>

              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  <TableBarIcon />
                </ListItemIcon>
                <ListItemText primary="Mesas" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Ganancias" />
              </ListItemButton>
            </List>
          </div>
        )}
        {isSidebarOpen && (
          <div>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: "#fff" }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItemButton>
          </div>
        )}
      </Box>

      {/* Contenido principal */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          marginLeft: { xs: isSidebarOpen ? "230px" : "0", sm: "230px" },
          transition: "margin-left 0.3s ease",
        }}
      >
        <IconButton
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          sx={{ display: { sm: "none" }, color: "#fff", marginBottom: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {selectedIndex === 2 && <GestionMesas />}
        {selectedIndex === 0 && <GestionProductos />}
        {selectedIndex === 1 && <GestionUsuarios />}
        {selectedIndex === 3 && <GestionGanancias />}
      </Box>
    </Box>
  );
};

export default AdminMenu;
