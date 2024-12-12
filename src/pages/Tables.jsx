import { Alert, Box, Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";  
import Table from "../components/Table/Table";
import createApiUrl from "../api"; 
import { useNavigate } from "react-router-dom";  // Importar useNavigate
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const Tables = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [mesas, setMesas] = useState([]);  
  const navigate = useNavigate();  // Inicializar el hook de navegación

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await fetch(createApiUrl('mesas'));
        const data = await response.json();
        setMesas(data);  
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    fetchMesas();  
  }, []);

  const handleTableClick = (id) => {
    if (selectedTable === id) {
      setSelectedTable(null);
    } else {
      setSelectedTable(id);
    }
  };

  // Función para manejar el clic en el botón "Seleccionar"
  const handleSelectTable = () => {
    if (selectedTable) {
      // Redirige a la página de "App" o donde desees después de seleccionar la mesa
      navigate("/app", { state: { selectedTable } });  // Cambia "/app" por la ruta de tu elección
    } else {
      // Si no hay mesa seleccionada, muestra un error o alerta
      alert("Por favor, selecciona una mesa.");
    }
  };

  const handleSelectTableFactura = () => {
    if (selectedTable) {
      navigate("/factura", { state: { selectedTable } });
    } else {
      alert("Por favor, selecciona una mesa.");
    }
  };
  

  return (
    <Container>
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          color: "#fff",
          marginBottom: 2,
          position: "absolute", // Fija su posición dentro del contenedor
          left: "20px", // Ajusta la distancia desde el borde derecho
          top: "20px", // Ajusta la distancia desde el borde superior
          padding: "16px", // Ajusta el área interactiva del botón
        }}
      >
        <ArrowBackIcon sx={{ fontSize: "40px" }} /> {/* Tamaño del ícono */}
      </IconButton>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
          Selecciona una mesa
        </Typography>
        <Alert severity="info" sx={{ mt: 3 }}>
          Al seleccionar la mesa, la orden estará asociada a la mesa previamente seleccionada.
        </Alert>
      </Box>
      <Box
        sx={{
          mt: 4,
          display: "grid",
          gridTemplateColumns: {
            xs: '1fr 1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr 1fr',
          },
          gap: 2,
          justifyItems: "center",
          alignItems: "center",
        }}>
        {mesas.map((mesa) => (
          <Table
            key={mesa.id}
            idMesa={mesa.numero}
            selected={selectedTable === mesa.numero}
            onClick={handleTableClick}
            disponible={mesa.disponible}  
          />
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{ mr: 8 }}
          onClick={handleSelectTable}  // Llama a la función de selección
        >
          Crear Orden
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleSelectTableFactura}  // Llama a la función de selección
        >
          Cerrar Orden
        </Button>
      </Box>
    </Container>
  );
};

export default Tables;
