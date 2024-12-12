import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Card from "@mui/material/Card";
import Input from "@mui/material/Input";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import createApiUrl from "../api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Estado para el mensaje de error
  const navigate = useNavigate(); // Hook para navegar a otra ruta

  const handleLogin = async (e) => {
    e.preventDefault();

    setError(null); // Limpiar el error antes de hacer la solicitud

    try {
      const response = await axios.post(
        "http://localhost:8080/api/usuarios/login",
        {
          email,
          password,
        }
      );

      // Si el rol es MESERO o ADMIN, redirigimos
      if (response.data.rol === "MESERO") {
        sessionStorage.setItem('userRole', 'MESERO'); // Guardar el rol
        console.log("¡Inicio de sesión exitoso como Mesero!");
        navigate("/mesero"); // Redirige al mesero
      } else if (response.data.rol === "ADMIN") {
        sessionStorage.setItem('userRole', 'ADMIN'); // Guardar el rol
        console.log("User Role guardado en sessionStorage:", sessionStorage.getItem('userRole'));  // Verificar en consola
        console.log("¡Inicio de sesión exitoso como Admin!");
        navigate("/admin"); // Redirige al admin
      } else {
        // Si el rol no es MESERO ni ADMIN
        setError("El usuario no tiene permisos para acceder.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Si ocurre un error, mostramos el mensaje de credenciales incorrectas
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Card
        sx={{
          maxWidth: "448px",
          width: "100%",
          backgroundColor: "#242424",
          color: "white",
          padding: "16px",
          borderRadius: "8px",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <CardHeader
          title={
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(to right, #FFC0CB, #DDA0DD)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Orderly
            </Typography>
          }
        />
        <CardContent>
          <Typography variant="h4" sx={{ color: "while", fontWeight: "bold" }}>
            Bienvenido
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#B0B0B0", marginBottom: "16px" }}
          >
            Ingrese sus credenciales para acceder a su cuenta
          </Typography>
          {error && (
            <Typography
              color="error"
              sx={{ marginBottom: "16px", textAlign: "center" }}
            >
              {error}
            </Typography>
          )}
          <form
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            onSubmit={handleLogin}
          >
            <div>
              <label htmlFor="email" style={{ color: "#e5e7eb" }}>
                Usuario
              </label>
              <Input
                id="email"
                placeholder="restaurant@example.com"
                type="email"
                sx={{
                  width: "100%",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  marginTop: "4px",
                  paddingRight: "40px",
                  backgroundColor: "#2A2A2A",
                  "&:before": {
                    borderBottom: "2px solid white",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "2px solid #DDA0DD",
                  },
                  "&.Mui-focused:after": {
                    borderBottom: "2px solid purple",
                  },
                }}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" style={{ color: "#e5e7eb" }}>
                Contraseña
              </label>
              <div style={{ position: "relative" }}>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  sx={{
                    width: "100%",
                    color: "white",
                    padding: "8px",
                    borderRadius: "4px",
                    marginTop: "4px",
                    paddingRight: "40px",
                    backgroundColor: "#2A2A2A",
                    "&:before": {
                      borderBottom: "2px solid white",
                    },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottom: "2px solid #DDA0DD",
                    },
                    "&.Mui-focused:after": {
                      borderBottom: "2px solid purple",
                    },
                  }}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "8px",
                    transform: "translateY(-50%)",
                    minWidth: "auto",
                    padding: "4px",
                    color: "#B0B0B0",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              sx={{
                width: "100%",
                background: "linear-gradient(to right, #FFC0CB, #DDA0DD)",
                color: "#1C1C1C",
                fontWeight: "bold",
                padding: "10px",
                "&:hover": {
                  background: "linear-gradient(to right, #FFB6C1, #BA55D3)",
                },
              }}
            >
              Iniciar como administrador
            </Button>
            <Button
              sx={{
                width: "100%",
                background: "linear-gradient(to right, #FFC0CB, #DDA0DD)",
                color: "#1C1C1C",
                fontWeight: "bold",
                padding: "10px",
                "&:hover": {
                  background: "linear-gradient(to right, #FFB6C1, #BA55D3)",
                },
              }}
              onClick={() => navigate("/tables")} // Redirige a la ruta '/mesero'
            >
              Mesero
            </Button>
            <Button
              sx={{
                width: "100%",
                background: "linear-gradient(to right, #FFC0CB, #DDA0DD)",
                color: "#1C1C1C",
                fontWeight: "bold",
                padding: "10px",
                "&:hover": {
                  background: "linear-gradient(to right, #FFB6C1, #BA55D3)",
                },
              }}
              onClick={() => navigate("/orders")} // Redirige a la ruta '/mesero'
            >
              Cocinero
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
