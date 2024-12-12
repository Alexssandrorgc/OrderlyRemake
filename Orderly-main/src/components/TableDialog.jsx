import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useState } from 'react';

const TableDialog = ({ open, onClose, onSave }) => {

  const [name, setName] = useState("");

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleSave = () => {
    onSave(name)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          //console.log(formJson); //Aqui imprime el objeto con el nombre del mesero
          onClose();
        },
      }}
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

TableDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default TableDialog;