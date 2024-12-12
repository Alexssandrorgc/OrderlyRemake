import createApiUrl from "../api";

const fetchMenuItems = async (categoryName) => {
    try {
        // Hacemos la solicitud al endpoint, usando el nombre de la categoría
        const response = await fetch(createApiUrl(`inventario/categoria/${categoryName}`));
        const data = await response.json();

        // Reorganizamos los datos como lo solicitaste
        const menuItems = data.articulos.map(item => ({
            id: item.id,
            name: item.nombre,
            price: `$${item.precio.toFixed(2)}`, // Aseguramos que el precio tenga dos decimales
        }));

        return menuItems;
    } catch (error) {
        console.error("Error al obtener los elementos del menú:", error);
        return [];
    }
};

export default fetchMenuItems;
