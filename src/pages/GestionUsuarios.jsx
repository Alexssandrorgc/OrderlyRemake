import { useState, useEffect } from "react";
import { Box, List, ListItem, Button, Typography, Modal, TextField, MenuItem } from "@mui/material";
import createApiUrl from "../api"; // Verifica que esté correctamente configurado

const roles = ["ADMIN", "MESERO", "COCINERO"]; // Ajusta según los roles disponibles en tu sistema

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newUsuario, setNewUsuario] = useState({ nombre: '', apellido: '', email: '', password: '', rol: '', activo: true });
  const [editUsuario, setEditUsuario] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(createApiUrl('usuarios'));
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleOpenModal = (usuario = null) => {
    if (usuario) {
      setEditUsuario(usuario);
      setNewUsuario({ 
        nombre: usuario.nombre, 
        apellido: usuario.apellido,
        email: usuario.email,
        password: '', // Dejar en blanco para no mostrar la contraseña
        rol: usuario.rol,
        activo: usuario.activo
      });
    } else {
      setNewUsuario({ nombre: '', apellido: '', email: '', password: '', rol: '', activo: true });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditUsuario(null);
  };

  const handleSaveUsuario = async () => {
    if (editUsuario) {
      await updateUsuario(editUsuario.id);
    } else {
      await addUsuario();
    }
  };

  const addUsuario = async () => {
    try {
      const response = await fetch(createApiUrl('usuarios'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUsuario),
      });
      if (response.ok) {
        fetchUsuarios();
        handleCloseModal();
      } else {
        console.error('Error al agregar usuario');
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  const updateUsuario = async (id) => {
    // Mostrar una confirmación antes de proceder con la actualización
    const isConfirmed = window.confirm("¿Estás seguro de que deseas actualizar este usuario?");
  
    if (isConfirmed) {
      try {
        const response = await fetch(createApiUrl(`usuarios/${id}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUsuario),
        });
  
        if (response.ok) {
          fetchUsuarios();  // Recargar la lista de usuarios después de la actualización
          handleCloseModal();  // Cerrar el modal
        } else {
          console.error('Error al actualizar usuario');
        }
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    } else {
      // Si el usuario cancela la acción, mostrar mensaje en la consola
      console.log('Actualización de usuario cancelada');
    }
  };
  

  const deleteUsuario = async (id) => {
    // Mostrar una confirmación antes de proceder con la eliminación
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.");
  
    if (isConfirmed) {
      try {
        const response = await fetch(createApiUrl(`usuarios/${id}`), {
          method: 'DELETE',
        });
  
        if (response.ok) {
          fetchUsuarios(); // Recargar la lista de usuarios después de la eliminación
        } else {
          console.error('Error al eliminar usuario');
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    } else {
      // Si el usuario cancela la acción, mostrar mensaje en la consola
      console.log('Eliminación de usuario cancelada');
    }
  };
  

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Gestionar Usuarios (Recuerada que los usuarios agregados podran iniciar sesión en la aplicación)
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Agregar Usuario
      </Button>
      <Box sx={{ marginTop: 3 }}>
        <List>
          {usuarios.map((usuario) => (
            <ListItem key={usuario.id} sx={{ backgroundColor: "#333", marginBottom: 1, padding: 2, borderRadius: 1 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1">{usuario.nombre} {usuario.apellido} - {usuario.email} ({usuario.rol})</Typography>
              </Box>
              <Button color="warning" onClick={() => handleOpenModal(usuario)}>Editar</Button>
              <Button color="error" onClick={() => deleteUsuario(usuario.id)}>Eliminar</Button>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Modal de Edición o Agregar Usuario */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', padding: 4, borderRadius: 2, width: 400
        }}>
          <Typography variant="h6">{editUsuario ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</Typography>
          <TextField
            label="Nombre"
            fullWidth
            value={newUsuario.nombre}
            onChange={(e) => setNewUsuario({ ...newUsuario, nombre: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Apellido"
            fullWidth
            value={newUsuario.apellido}
            onChange={(e) => setNewUsuario({ ...newUsuario, apellido: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={newUsuario.email}
            onChange={(e) => setNewUsuario({ ...newUsuario, email: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            value={newUsuario.password}
            onChange={(e) => setNewUsuario({ ...newUsuario, password: e.target.value })}
            margin="dense"
          />
          <TextField
            select
            label="Rol"
            fullWidth
            value={newUsuario.rol}
            onChange={(e) => setNewUsuario({ ...newUsuario, rol: e.target.value })}
            margin="dense"
          >
            {roles.map((rol) => (
              <MenuItem key={rol} value={rol}>
                {rol}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={handleSaveUsuario} color="primary" fullWidth sx={{ mt: 2 }}>
            {editUsuario ? 'Guardar Cambios' : 'Agregar Usuario'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default GestionUsuarios;
