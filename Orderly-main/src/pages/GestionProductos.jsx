import { useState, useEffect } from "react";
import { Box, List, ListItem, Button, Typography, Modal, TextField } from "@mui/material";
import createApiUrl from "../api"; // Asegúrate de que esté configurado correctamente

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newProducto, setNewProducto] = useState({ nombre: '', cantidad: '', precio: '', categoria: '' });
  const [editProducto, setEditProducto] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch(createApiUrl('inventario'));
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleOpenModal = (producto = null) => {
    if (producto) {
      setEditProducto(producto);
      setNewProducto({ 
        nombre: producto.nombre, 
        precio: producto.precio, 
        categoria: producto.categoria 
      });
    } else {
      setNewProducto({ nombre: '', precio: '', categoria: '' });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditProducto(null);
  };

  const handleSaveProducto = async () => {
    if (editProducto) {
      await updateProducto(editProducto.id);
    } else {
      await addProducto();
    }
  };

  const addProducto = async () => {
    try {
      const response = await fetch(createApiUrl('inventario'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProducto, activo: true }),
      });
      if (response.ok) {
        fetchProductos();
        handleCloseModal();
      } else {
        console.error('Error al agregar producto');
      }
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const updateProducto = async (id) => {
    try {
      const response = await fetch(createApiUrl(`inventario/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProducto, activo: true }),
      });
      if (response.ok) {
        fetchProductos();
        handleCloseModal();
      } else {
        console.error('Error al actualizar producto');
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const deleteProducto = async (id) => {
    try {
      const response = await fetch(createApiUrl(`inventario/${id}`), {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProductos();
      } else {
        console.error('Error al eliminar producto');
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Gestionar Productos
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Agregar Producto
      </Button>
      <Box sx={{ marginTop: 3 }}>
        <List>
          {productos.map((producto) => (
            <ListItem key={producto.id} sx={{ backgroundColor: "#333", marginBottom: 1, padding: 2, borderRadius: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1">{producto.nombre} - ${producto.precio} ({producto.categoria})</Typography>
              </Box>
              <Button color="warning" onClick={() => handleOpenModal(producto)}>Editar</Button>
              <Button color="error" onClick={() => deleteProducto(producto.id)}>Eliminar</Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Modal de Edición o Agregar Producto */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: 4, borderRadius: 2, width: 400
        }}>
          <Typography variant="h6">{editProducto ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Typography>
          <TextField
            label="Nombre"
            fullWidth
            value={newProducto.nombre}
            onChange={(e) => setNewProducto({ ...newProducto, nombre: e.target.value })}
            margin="dense"
          />
          
          <TextField
            label="Precio"
            type="number"
            fullWidth
            value={newProducto.precio}
            onChange={(e) => setNewProducto({ ...newProducto, precio: e.target.value })}
            margin="dense"
          />
          <TextField
            label="categoria"
            fullWidth
            value={newProducto.categoria}
            onChange={(e) => setNewProducto({ ...newProducto, categoria: e.target.value })}
            margin="dense"
          />
          <Button onClick={handleSaveProducto} color="primary" fullWidth sx={{ mt: 2 }} variant="outlined">
            {editProducto ? 'Guardar Cambios' : 'Agregar Producto'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default GestionProductos;
