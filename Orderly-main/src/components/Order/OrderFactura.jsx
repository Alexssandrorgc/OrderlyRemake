import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import createApiUrl from "../../api";
import { useLocation } from "react-router-dom";

const Order = ({ articulos }) => {
  const [orderData, setOrderData] = useState([]);
  const location = useLocation();
  const selectedTable = location.state.selectedTable;

  console.log('numero de mesa nuevo:', selectedTable);

  useEffect(() => {
    // Si selectedTable no está disponible, no haces la solicitud
    if (!selectedTable) return;

    // Realizar la solicitud a la API usando el número de mesa
    const fetchOrderData = async () => {
      try {
        const response = await fetch(createApiUrl(`ordenes/completadas/${selectedTable}`));
        console.log('Respuesta de la API:', response);
        if (!response.ok) {
          throw new Error("Error al obtener las órdenes");
        }
        const data = await response.json();
        console.log('Datos recibidos de la API:', data);

        setOrderData(data.ordenes); // Almacena todas las órdenes en el estado
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [selectedTable]);

  // Si no se ha cargado la data aún, muestra un mensaje de carga
  if (orderData.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Cargando información de las órdenes...
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      {orderData.map((order) => {
        const { mesero, id, mesa, articulos } = order;
        return (
          <Paper key={id} elevation={2} sx={{ p: 2, borderRadius: 2, mb: 2 }}>
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
                    {/* Aquí mostramos la información obtenida de la API */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Mesero: {mesero}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Orden: #{id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mesa: #{mesa}
                    </Typography>
                  </Box>
                  <Chip icon={<AccessTimeIcon />} label="Completada" color="success" />
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

                {/* Items de la orden */}
                {articulos.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 1,
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">{item.nombre}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "center", flexBasis: "20%" }}
                    >
                      {item.cantidad}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                {/* Botones */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Button variant="outlined" color="primary" fullWidth>
                    Orden
                  </Button>
                </Box>
              </Box>
            </Container>
          </Paper>
        );
      })}
    </Box>
  );
};

Order.propTypes = {
  articulos: PropTypes.array.isRequired,
  selectedTable: PropTypes.string.isRequired,  // Se espera que el valor de la mesa sea un string
};

export default Order;
