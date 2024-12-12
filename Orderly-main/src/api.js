const API_BASE_URL = "http://localhost:8080/api/";

// Función para crear una URL completa a partir de la base y la ruta proporcionada
const createApiUrl = (path) => {
  return `${API_BASE_URL}${path}`;
};

// Exportamos solo la función de crear URL
export default createApiUrl;
