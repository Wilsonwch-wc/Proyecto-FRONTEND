const API_URL = "http://localhost:8383/api/orders"; 

export const getAllOrders = async () => {
    try {
        const res = await fetch(API_URL);
        return await res.json();
    } catch (error) {
        console.error(error);
        return { error: "Error al obtener órdenes" };
    }
};

export const createOrder = async (orderData) => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });
        return await res.json();
    } catch (error) {
        console.error(error);
        return { error: "Error al agregar orden" };
    }
};

export const updateOrder = async (id, orderData) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });
        return await res.json();
    } catch (error) {
        console.error(error);
        return { error: "Error al actualizar orden" };
    }
};

export const deleteOrder = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        return await res.json();
    } catch (error) {
        console.error(error);
        return { error: "Error al eliminar orden" };
    }
};
