import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createChart } from "lightweight-charts";
import { Button, ButtonGroup, Box, Grid, Card, Typography, CardContent } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Ganancias = () => {
  const [facturas, setFacturas] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0); // Estado para el total de todas las facturas
  const chartContainerRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // Obtener facturas del backend
  useEffect(() => {
    const obtenerFacturas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/factura/todas');
        const facturas = response.data;

        // Calcular el total de todas las facturas
        const total = facturas.reduce((acc, factura) => acc + factura.total, 0);

        // Convertimos y ordenamos los datos para el gráfico
        const data = facturas
          .reduce((acc, factura) => {
            const date = factura.fecha.split('T')[0]; // Extraer la fecha
            const existing = acc.find((item) => item.time === date);

            if (existing) {
              existing.value += factura.total; // Sumar valores
            } else {
              acc.push({ time: date, value: factura.total });
            }

            return acc;
          }, [])
          .sort((a, b) => new Date(a.time) - new Date(b.time)); // Orden ascendente

        setFacturas(facturas);
        setTotalRevenue(total); // Actualizamos el total de revenue
        setChartData(data); // Actualizamos los datos del gráfico
      } catch (error) {
        console.error('Error al obtener facturas:', error);
      }
    };

    obtenerFacturas();
  }, []);

  // Inicializar y actualizar el gráfico
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: { backgroundColor: "#000", textColor: "#fff" },
      grid: { vertLines: { color: "#444" }, horzLines: { color: "#444" } },
    });

    const lineSeries = chart.addLineSeries({ color: "#c113de", lineWidth: 2 });
    lineSeries.setData(chartData);

    setChartInstance(chart);

    return () => chart.remove(); // Limpieza
  }, [chartData]);

  // Manejar cambios de rango
  const handleRangeChange = (range) => {
    const now = new Date();
    let filteredData = [];

    if (range === "day") {
      const today = now.toISOString().split("T")[0];
      filteredData = facturas.filter((factura) => factura.fecha.startsWith(today));
    } else if (range === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      filteredData = facturas.filter((factura) => {
        const facturaDate = new Date(factura.fecha);
        return facturaDate >= weekAgo && facturaDate <= now;
      });
    } else if (range === "month") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      filteredData = facturas.filter((factura) => {
        const facturaDate = new Date(factura.fecha);
        return facturaDate >= monthStart && facturaDate <= now;
      });
    }

    const data = filteredData.map((factura) => ({
      time: factura.fecha.split("T")[0],
      value: factura.total,
    }));

    setChartData(data);
  };

  return (
    <Box sx={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#9c27b0", color: "#fff" }}>
            <CardContent>
              <MonetizationOnIcon />
              <Typography>Ganancias</Typography>
              <Typography variant="h6">${totalRevenue.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
            <CardContent>
              <ShoppingCartIcon />
              <Typography>Facturas</Typography>
              {/* Mostrar la cantidad total de facturas */}
              <Typography variant="h6">{facturas.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <ButtonGroup>
          {/* <Button onClick={() => handleRangeChange("day")}>Day</Button>
          <Button onClick={() => handleRangeChange("week")}>Week</Button>
          <Button onClick={() => handleRangeChange("month")}>Month</Button> */}
        </ButtonGroup>
        <Box ref={chartContainerRef} sx={{ border: "1px solid #fff", mt: 2, height: "300px" }} />
      </Box>
    </Box>
  );
};

export default Ganancias;