import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useState } from 'react';

const TableDialog = ({ open, onClose, onSave }) => {

  const [name, setName] = useState("");

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleSave = () => {
    onSave(name);  // Guarda el nombre del mesero
    onClose();     // Cierra el diálogo
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      
    >
      <DialogTitle>Ingresa el nombre del mesero</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Nombre"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={handleName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit" onClick={handleSave} disabled={!name.trim()}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  )
};
console.log(name);
TableDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default TableDialog;