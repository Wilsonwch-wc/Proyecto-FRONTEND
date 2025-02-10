// userService.js - Servicio para gestionar categoria

const API_URL = 'http://localhost:8383/api/categories';

export const getcategories = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createcategories = async (userData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const updateCategories = async (id, userData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const deleteCategories = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
