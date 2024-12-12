import React, { useEffect, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [ordenes, setOrdenes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada al backend para obtener las órdenes
    axios
      .get("http://localhost:8080/api/ordenes") // Ajusta la URL según tu endpoint
      .then((response) => {
        setOrdenes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las órdenes:", error);
      });
  }, []);

  // Función para actualizar el estatus de la orden
  const actualizarEstatus = (id, nuevoEstatus) => {
    axios
      .put(
        `http://localhost:8080/api/ordenes/${id}`,
        { estatus: nuevoEstatus }, // Asegúrate de enviar un objeto JSON
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setOrdenes((prevOrdenes) =>
          prevOrdenes.map((orden) =>
            orden.id === id ? { ...orden, estatus: nuevoEstatus } : orden
          )
        );
      })
      .catch((error) => {
        console.error("Error al actualizar el estatus:", error);
      });
  };

  return (
    <Container>
       <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: { xs: 2, sm: 3, md: 4 }, // Margen superior responsivo
          mb: 2,
        }}
      >
        <IconButton
          onClick={() => navigate('/')}
          sx={{
            color: '#fff',
            padding: { xs: '8px', sm: '12px', md: '16px' }, // Padding responsivo
          }}
        >
          <ArrowBackIcon
            sx={{
              fontSize: { xs: '24px', sm: '32px', md: '40px' }, // Tamaño del ícono responsivo
            }}
          />
        </IconButton>
        <Typography
          variant="h4"
          color="#fff"
          sx={{
            ml: 2,
            textAlign: { xs: 'center', sm: 'left' }, // Alineación responsiva
            flexGrow: 1,
          }}
        >
          Listado de órdenes
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 2,
        }}
      >
        {ordenes.map((orden) => (
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }} key={orden.id}>
            <Container>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Mesero: {orden.mesero}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Orden #{orden.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mesa: {orden.mesa}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total: ${orden.precioTotal.toFixed(2)}
                    </Typography>
                  </Box>
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={orden.estatus}
                    color={
                      orden.estatus === "pendiente" ? "warning" : "success"
                    }
                  />
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle2">Alimentos</Typography>
                  <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
                    Cantidad
                  </Typography>
                </Box>

                {orden.articulos.map((articulo) => (
                  <Box
                    key={articulo.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">{articulo.nombre}</Typography>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                      {articulo.cantidad}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => actualizarEstatus(orden.id, "Completada")}
                    disabled={orden.estatus === "Completada"}
                  >
                    Iniciar Orden
                  </Button>
                </Box>
              </Box>
            </Container>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Orders;
