const API_URL = "http://localhost:8383/api/products"; // Cambia según tu backend

export const getAllProducts = async () => {
    try {
        const res = await fetch(API_URL);
        return await res.json();
    } catch (error) {
        console.error(error);
        return { error: "Error al obtener productos" };
    }
};

export const createProduct = async (productData) => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });
        return await res.json();
    } catch (error) {
        console.error(error);
        return { error: "Error al agregar producto" };
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });
        return await res.json();
    } catch (error) {
        console.error(error);
        return { error: "Error al actualizar producto" };
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        return await res.json();
    } catch (error) {
        console.error(error);
        return { error: "Error al eliminar producto" };
    }
};

export const getCategories = async () => {
    try {
        const res = await fetch("http://localhost:8383/api/categories"); // Asegúrate de tener esta ruta en el backend
        return await res.json();
    } catch (error) {
        console.error(error);
        return { error: "Error al obtener categorías" };
    }
};
