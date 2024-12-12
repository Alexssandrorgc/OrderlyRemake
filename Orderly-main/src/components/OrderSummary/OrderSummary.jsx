import { Box, Paper, Divider, Typography, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import createApiUrl from '../../api';

const OrderSummary = ({ orders, subtotal, tax, total, onRemoveDish, onEditName, selectedTable, orderData }) => {

  const handleSubmitOrder = async () => {
    // Asegúrate de que los campos sean correctos
    console.log('Datos de la orden:', orderData);

    if (!orderData.articulosIds.length || !orderData.mesa || !orderData.mesero) {
      alert('Faltan datos para enviar la orden');
      return;
    }
  
    try {
      console.log('Enviando orden:', orderData);  // Depuración antes del envío
  
      const response = await fetch(createApiUrl('ordenes'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Obtener detalles del error
        console.error('Detalles del error:', errorData);
        throw new Error(errorData.message || 'Error al enviar la orden');
      }
  
      const result = await response.json();
      console.log('Orden enviada:', result);
      alert('¡Orden enviada con éxito!');
    } catch (error) {
      console.error('Error al enviar la orden:', error.message);
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <Paper elevation={3} sx={{
      width: { xs: "100%", md: 350 },
      height: "100vh",
      bgcolor: "#1c1c1e",
      color: "white",
      padding: 2,
      display: "flex",
      flexDirection: "column",
    }}>
      <Box>
        {/* Mostrar el número de mesa seleccionado */}
        <Typography variant="h6">Table {selectedTable}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1
          }}>
          <Typography variant="subtitle1" color="gray">{name}</Typography>
          <IconButton onClick={onEditName}>
            <EditIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ my: 2, bgcolor: "#444" }} />
      <Box sx={{
        flexGrow: 1,
        maxHeight: 300,
        overflow: "auto",
      }}>
        {orders.map((order) => (
          <Box
            key={order.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#2c2c2e",
              borderRadius: 1,
              padding: 1,
              mb: 1,
            }}
          >
            <Typography variant="subtitle1">
              {order.name} x{order.quantity}
            </Typography>
            <Typography variant="subtitle1">
              ${(parseFloat(order.price.slice(1)) * order.quantity).toFixed(2)}
            </Typography>
            <IconButton size="small" color="error" onClick={() => onRemoveDish(order.name)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Divider sx={{ my: 2, bgcolor: "#444" }} />
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">Subtotal</Typography>
          <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">Tax 10%</Typography>
          <Typography variant="body2">${tax.toFixed(2)}</Typography>
        </Box>
        <Divider sx={{ my: 1, bgcolor: "#444" }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">${total.toFixed(2)}</Typography>
        </Box>
      </Box>
      <Button variant="contained" color="primary" fullWidth  onClick={handleSubmitOrder}>Enviar orden</Button>
    </Paper>
  );
};

OrderSummary.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onRemoveDish: PropTypes.func.isRequired,
  onEditName: PropTypes.func.isRequired,
  selectedTable: PropTypes.number.isRequired,
  orderData: PropTypes.shape({
    articulosIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    mesa: PropTypes.string.isRequired,
    mesero: PropTypes.string.isRequired,
  }).isRequired,
};
export default OrderSummary;