import { Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Table = ({ idMesa, selected, onClick, disponible }) => {
  return (
    <Paper
      elevation={3}
      onClick={() => onClick(idMesa)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 150,
        borderRadius: 2,
        backgroundColor: selected
          ? "#1892d5"  // Verde si está seleccionada
          : disponible
          ? "#2e7d32"  // Gris claro si está disponible
          : "#d32f2f", // Rojo si está ocupada
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        '&:hover': {
          backgroundColor: selected
            ? "#1892d5"
            : disponible
            ? "#d1d9e6"
            : "#b71c1c",  // Rojo más oscuro en hover si está ocupada
        },
      }}
    >
      <Typography variant="h6" sx={{ color: selected ? "#fff" : "#000" }}>
        {idMesa}
      </Typography>
    </Paper>
  );
};

Table.propTypes = {
  idMesa: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  disponible: PropTypes.bool.isRequired,  // Nueva prop para disponibilidad
};

export default Table;
