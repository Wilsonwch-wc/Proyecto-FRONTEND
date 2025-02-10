import axios from 'axios';
const API_URL = 'http://localhost:8383/api/users';

// Función para iniciar sesión
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { error: 'Error al conectar con el servidor' };
    }
};
