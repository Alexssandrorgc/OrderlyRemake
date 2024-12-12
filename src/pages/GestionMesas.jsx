// GestionMesas.jsx
import { useState, useEffect } from "react";
import { Box, List, ListItem, Typography, Modal, TextField, Button } from "@mui/material";
import createApiUrl from "../api"; // Asegúrate de que este archivo api.js esté bien configurado

const GestionMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newMesa, setNewMesa] = useState({ numero: '', capacidad: '' });
  const [editMesa, setEditMesa] = useState(null);

  useEffect(() => {
    fetchMesas();
  }, []);

  const fetchMesas = async () => {
    try {
      const response = await fetch(createApiUrl('mesas'));
      const data = await response.json();
      setMesas(data);
    } catch (error) {
      console.error('Error al obtener mesas:', error);
    }
  };

  const handleOpenModal = (mesa = null) => {
    if (mesa) {
      setEditMesa(mesa);
      setNewMesa({ numero: mesa.numero, capacidad: mesa.capacidad });
    } else {
      setNewMesa({ numero: '', capacidad: '' });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMesa(null);
  };

  const handleSaveMesa = async () => {
    if (editMesa) {
      await updateMesa(editMesa.id);
    } else {
      await addMesa();
    }
  };

  const addMesa = async () => {
    try {
      const response = await fetch(createApiUrl('mesas'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newMesa, disponible: true }),
      });
      if (response.ok) {
        fetchMesas();
        handleCloseModal();
      } else {
        console.error('Error al agregar mesa');
      }
    } catch (error) {
      console.error('Error al agregar mesa:', error);
    }
  };

  const updateMesa = async (id) => {
    // Mostrar una confirmación antes de proceder con la actualización
    const isConfirmed = window.confirm("¿Estás seguro de que deseas actualizar esta mesa?");
  
    if (isConfirmed) {
      try {
        await fetchMesas();  // Recargar las mesas antes de la actualización
        const mesaExistente = mesas.find(mesa => mesa.numero === newMesa.numero && mesa.id !== id);
  
        if (mesaExistente) {
          alert(`Ya existe una mesa con el número ${newMesa.numero}. No se puede actualizar.`);
          return;
        }
  
        const url = createApiUrl(`mesas/${id}`);
        const response = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newMesa, disponible: true }),
        });
  
        if (response.ok) {
          fetchMesas();  // Recargar las mesas después de la actualización
          handleCloseModal();  // Cerrar el modal
        } else {
          console.error('Error al actualizar mesa');
        }
      } catch (error) {
        console.error('Error al actualizar mesa:', error);
      }
    } else {
      // Si el usuario cancela la actualización, mostrar mensaje
      console.log('Actualización de mesa cancelada');
    }
  };
  

  const deleteMesa = async (id) => {
    // Mostrar un cuadro de confirmación antes de eliminar
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar esta mesa?");
  
    // Si el usuario confirma la acción, proceder con la eliminación
    if (isConfirmed) {
      try {
        const response = await fetch(createApiUrl(`mesas/${id}`), { method: 'DELETE' });
        if (response.ok) {
          fetchMesas(); // Recargar la lista de mesas después de eliminar
        } else {
          console.error('Error al eliminar mesa');
        }
      } catch (error) {
        console.error('Error al eliminar mesa:', error);
      }
    } else {
      // Si el usuario cancela, no hacer nada
      console.log('Eliminación de mesa cancelada');
    }
  };
  

  return (
    <Box  sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Gestionar Mesas
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Agregar Mesa
      </Button>
      <Box sx={{ marginTop: 3 }}>
        <Typography variant="subtitle1">Mesas Disponibles</Typography>
        <List>
          {mesas.map((mesa) => (
            <ListItem key={mesa.id} sx={{ backgroundColor: "#333", marginBottom: 1, padding: 2, borderRadius: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1">Mesa {mesa.numero} - Capacidad: {mesa.capacidad}</Typography>
              </Box>
              <Button color="warning" onClick={() => handleOpenModal(mesa)}>Editar</Button>
              <Button color="error" onClick={() => deleteMesa(mesa.id)}>Eliminar</Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: 4, borderRadius: 2, width: 400
        }}>
          <Typography variant="h6">{editMesa ? 'Editar Mesa' : 'Agregar Nueva Mesa'}</Typography>
          <TextField
            label="Número de Mesa"
            type="number"
            fullWidth
            value={newMesa.numero}
            onChange={(e) => setNewMesa({ ...newMesa, numero: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Capacidad"
            type="number"
            fullWidth
            value={newMesa.capacidad}
            onChange={(e) => setNewMesa({ ...newMesa, capacidad: e.target.value })}
            margin="dense"
          />
          <Button
            onClick={handleSaveMesa}
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {editMesa ? 'Guardar Cambios' : 'Agregar Mesa'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default GestionMesas;
