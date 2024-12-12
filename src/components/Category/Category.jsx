import PropTypes from 'prop-types';
import { Box, Paper, Typography } from "@mui/material"

const Category = ({ name, totalItems, color, icon, onClick }) => {
    return (
        <Paper
            elevation={2}
            sx={{
                bgcolor: color,
                cursor: "pointer",
                "&:hover": {
                    opacity: 0.7
                }
            }}
            onClick={() => onClick(name)} // Llama a la función onClick con el nombre de la categoría
            >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    width: { xs: "100%", sm: "300px", md: "200px" },
                    height: { xs: "auto", sm: "150px", md: "150px" },
                    padding: 2,
                }}>
                {icon}
                <Typography variant='h5'>
                    {name}
                </Typography>
                <Typography variant='subtitle1' sx={{ color: "#989898" }}>
                    {totalItems + " items"}
                </Typography>
            </Box>
        </Paper>
    )
}

Category.propTypes = {
    name: PropTypes.string.isRequired,
    totalItems: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired // Asegúrate de que onClick se pase como propiedad
};

export default Category