import { Box, Container, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Categories from "./components/Category/Categories.jsx"; // Importa el componente Categories
import Dish from "./components/Dish/Dish";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import TableDialog from "./components/TableDialog";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const selectedTable = location.state?.selectedTable || 1;

  const [menuItems, setMenuItems] = useState([]); // Estado para almacenar los items del menú
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const savedName = "Nombre";
  const [articulosIds, setArticulosIds] = useState([]); // Estado para acumular los IDs
  const [orderData, setOrderData] = useState({
    articulosIds: [],
    mesa: selectedTable,
    mesero: "",
  }); // Nuevo estado para el objeto completo

  const handleAddDish = (name) => {
    const existingDish = orders.find((order) => order.name === name);
    const selectedItem = menuItems.find((item) => item.name === name);

    if (existingDish) {
      setOrders(
        orders.map((order) =>
          order.name === name
            ? { ...order, quantity: order.quantity + 1 }
            : order
        )
      );
    } else {
      setOrders([
        ...orders,
        { id: selectedItem.id, name, quantity: 1, price: selectedItem.price },
      ]);
    }

    // Agregar el ID al array de IDs acumulados
    setArticulosIds([...articulosIds, selectedItem.id]);
  };

  const navigate = useNavigate();

  const handleRemoveDish = (name) => {
    const selectedItem = menuItems.find((item) => item.name === name);

    if (selectedItem && articulosIds.includes(selectedItem.id)) {
      const updatedIds = [...articulosIds];
      const indexToRemove = updatedIds.indexOf(selectedItem.id);
      updatedIds.splice(indexToRemove, 1);
      setArticulosIds(updatedIds);
    }

    setOrders((prevOrders) =>
      prevOrders
        .map((order) =>
          order.name === name
            ? { ...order, quantity: order.quantity - 1 }
            : order
        )
        .filter((order) => order.quantity > 0)
    );
  };

  // Actualizar el objeto completo cuando cambian los IDs o la mesa seleccionada
  useEffect(() => {
    setOrderData((prevData) => ({
      ...prevData, // Mantiene el nombre del mesero actual
      articulosIds, // Actualiza solo los artículos
      mesa: selectedTable, // Actualiza solo la mesa
    }));
  }, [articulosIds, selectedTable]);

  // useEffect para mostrar el log del objeto completo
  useEffect(() => {
    console.log("Orden completa:", orderData);
  }, [orderData]);

  // Función para manejar la actualización del nombre
  const handleSaveValue = (name) => {
    setOrderData((prevData) => ({
      ...prevData,
      mesero: name, // Aquí se guarda el nombre ingresado
    }));
  };

  const subtotal = orders.reduce(
    (acc, item) => acc + parseFloat(item.price.slice(1)) * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
      }}
    >
      <Box
        sx={{
          position: "relative", // Posición relativa
          top: 10, // Distancia desde la parte superior
          left: 10, // Alineado a la izquierda
          display: "flex",
          alignItems: "center",
          zIndex: 10,
          marginBottom: 100, // Agrega un margen hacia abajo
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ color: "#fff"}}>
          <ArrowBackIcon sx={{ fontSize: "40px"}}/>
        </IconButton>
      </Box>
      <Container>
      <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold", marginTop:2}}>
          Categorias
        </Typography>
        <Categories setMenuItems={setMenuItems} />{" "}
        {/* Pasamos setMenuItems a Categories */}
        <Divider sx={{ mt: 5, bgcolor: "#323232" }} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
            },
            gap: 2,
            mt: 10,
            mb: 5,
          }}
        >
          {menuItems.map((item) => (
            <Dish
              key={item.name}
              {...item}
              onAddDish={handleAddDish}
              onRemoveDish={handleRemoveDish}
              quantity={
                orders.find((order) => order.name === item.name)?.quantity || 0
              }
            />
          ))}
        </Box>
      </Container>
      <OrderSummary
        orders={orders}
        subtotal={subtotal}
        tax={tax}
        total={total}
        onEditName={() => setOpen(true)}
        onRemoveDish={handleRemoveDish}
        name={orderData.mesero || "Sin nombre"} // Aquí se pasa el nombre dinámicamente
        selectedTable={selectedTable}
        orderData={orderData}
      />
      <TableDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSaveValue}
      />
    </Box>
  );
};

export default App;
