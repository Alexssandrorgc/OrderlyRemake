import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';

const TableDialog = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{
      component: 'form',
      onSubmit: (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log(formData.get('tableNumber'));
        onClose();
      },
    }}
  >
    <DialogTitle>Ingresa el número de mesa</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        required
        margin="dense"
        id="tableNumber"
        name="tableNumber"
        label="Número de mesa"
        type="number"
        fullWidth
        variant="standard"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button type="submit">Aceptar</Button>
    </DialogActions>
  </Dialog>
);

// PropTypes validation
TableDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TableDialog;