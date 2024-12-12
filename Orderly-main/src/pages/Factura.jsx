import { Box, Container, Typography, Button, Modal, TextField } from "@mui/material";
import Order from "../components/Order/OrderFactura";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import createApiUrl from "../api";

const Factura = () => {
  const location = useLocation();
  const selectedTable = location.state.selectedTable;
  const [orders, setOrders] = useState([]);
  const [sumaTotalOrdenes, setSumaTotalOrdenes] = useState(0);
  const [openModal, setOpenModal] = useState(false); // Estado para el modal
  const [email, setEmail] = useState(""); // Estado para el correo

  console.log('Mesa seleccionada:', selectedTable);

  // Obtener las órdenes de la API
  useEffect(() => {
    if (!selectedTable) return;

    const fetchOrders = async () => {
      try {
        const response = await fetch(createApiUrl(`ordenes/completadas/${selectedTable}`));
        const data = await response.json();
        console.log('Datos de las órdenes:', data);

        // Filtrar las órdenes duplicadas por numeroOrden
        const uniqueOrders = data.ordenes.filter((order, index, self) =>
          index === self.findIndex((o) => o.numeroOrden === order.numeroOrden)
        );

        // Actualizar el estado con las órdenes únicas y el total
        setOrders(uniqueOrders);
        setSumaTotalOrdenes(data.sumaTotalOrdenes); // Aquí actualizamos el total
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    fetchOrders();
  }, [selectedTable]);

  // Función para manejar la creación de la factura
  const handleCrearFactura = async () => {
    const url = createApiUrl(`factura/completadas/${selectedTable}`) + (email ? `?correo=${email}` : "");
    try {
      const response = await fetch(url, { method: "POST" });
      if (response.ok) {
        alert("Factura generada con éxito");
        window.location.reload(); // Recarga la página
      } else {
        alert("Error al generar la factura");
      }
    } catch (error) {
      console.error("Error al realizar la factura:", error);
      alert("Hubo un error al generar la factura.");
    }
  };

  return (
    <Container>
      {/* Botón para abrir el modal, alineado a la derecha */}
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ position: 'absolute', top: 30, right: 250 }} 
        onClick={() => setOpenModal(true)}
      >
        Realizar factura
      </Button>

      <Typography variant="h4" color="#fff" mt={3}>
        Ordenes a Facturar
      </Typography>
      <Typography variant="h6" color="#fff">Mesa {selectedTable}</Typography>
      <Typography variant="h6" color="#fff">
        Total a pagar: {sumaTotalOrdenes}
      </Typography>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
          },
          gap: 2,
        }}
      >
        {/* Mapeamos sobre las órdenes para mostrar cada una */}
        {orders.map((order) => (
          <Order key={order.id} articulos={order.articulos} />
        ))}
      </Box>

      {/* Modal para ingresar el correo */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
            width: 300,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Ingresa tu correo (opcional)
          </Typography>
          <TextField
            id="correo"
            label="Correo electrónico"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleCrearFactura(); // Llama a la función para crear la factura
                setOpenModal(false); // Cierra el modal
              }}
            >
              Crear factura
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Factura;
