import { Box, Button, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Dish = ({ name, price, onAddDish, onRemoveDish, quantity }) => {
  return (
    <Paper elevation={2}
      sx={{
        bgcolor: "#2d2d2d",
        display: "flex",
        justifyContent: "center"
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: { xs: "100%", sm: "350px", md: "250px" },
          height: { xs: "auto", sm: "150px", md: "150px" },
          padding: 2
        }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
          {name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#989898" }}>
          {price}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2
          }}>
          <Button
            variant="outlined"
            sx={{
              minWidth: '32px',
              minHeight: '32px',
              borderRadius: '12px',
              color: '#cfcfcf',
              borderColor: '#cfcfcf'
            }}
            onClick={() => onRemoveDish(name)}>
            -
          </Button>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            {quantity}
          </Typography>
          <Button
            variant="outlined"
            sx={{
              minWidth: '32px',
              minHeight: '32px',
              borderRadius: '12px',
              color: '#cfcfcf',
              borderColor: '#cfcfcf'
            }}
            onClick={() => onAddDish(name)}>
            +
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onAddDish: PropTypes.func.isRequired,
  onRemoveDish: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired
};

export default Dish;