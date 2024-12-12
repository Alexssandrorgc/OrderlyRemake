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
        const response = await fetch(createApiUrl("mesas"));
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
      navigate("/app", { state: { selectedTable } }); // Cambia "/app" por la ruta de tu elección
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
            position: "absolute",
            left: { xs: "10px", sm: "20px", md: "30px" }, // Posición izquierda responsiva
            top: { xs: "10px", sm: "20px", md: "30px" }, // Posición superior responsiva
            padding: { xs: "8px", sm: "12px", md: "16px" }, // Padding responsivo
          }}
        >
          <ArrowBackIcon
            sx={{
              fontSize: { xs: "24px", sm: "32px", md: "40px" }, // Tamaño del ícono responsivo
            }}
          />
        </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          mt: { xs: 2, sm: 3, md: 4 }, // Margen superior responsivo
          position: "relative", // Asegura que los elementos posicionados absolutamente se ubiquen correctamente
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            mt: { xs: 6, sm: 7, md: 2 }, // Margen superior para evitar superposición con el botón
            ml: { xs: 8, sm: 8, md: 10,lg:2}, // Margen izquierdo responsivo  
          }}
        >
          Selecciona una mesa
        </Typography>
        <Alert severity="info" sx={{ mt: { xs: 2, sm: 3, md: 4 } }}>
          Al seleccionar la mesa, la orden estará asociada a la mesa previamente
          seleccionada.
        </Alert>
      </Box>
      <Box
        sx={{
          mt: 4,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 2,
          justifyItems: "center",
          alignItems: "center",
        }}
      >
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5, gap: 2 }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{
            width: { xs: "100%", sm: "250px" },
            height: "50px",
          }}
          onClick={handleSelectTable}
        >
          Crear Orden
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          sx={{
            width: { xs: "100%", sm: "250px" },
            height: "50px",
          }}
          onClick={handleSelectTableFactura}
        >
          Ordenes completadas
        </Button>
      </Box>
    </Container>
  );
};

export default Tables;
