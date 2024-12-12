import { Chip, Stack } from '@mui/material'
import { useState } from "react";

const Filter = () => {

  const [selected, setSelected] = useState(false);

    return (
        <Stack direction="row" spacing={1} mt={5}>
            <Chip
                label="Todas"
                onClick={() => setSelected(!selected)}
                color="primary"
                variant={selected ? "outlined" : "filled"} />
            <Chip
                label="Pendientes"
                onClick={() => setSelected(!selected)}
                color="primary"
                variant={selected ? "outlined" : "filled"} />
            <Chip
                label="Completadas"
                onClick={() => setSelected(!selected)}
                color="primary"
                variant={selected ? "outlined" : "filled"} />
        </Stack>
    )
}

export default Filter