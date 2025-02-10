import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService';

import 'bootstrap/dist/css/bootstrap.min.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data.users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await updateUser(editingUser.id, formData);
            } else {
                await createUser(formData);
            }
            setFormData({ username: '', email: '', password: '' });
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Error al guardar usuario:', error);
        }
    };

    const handleEdit = (user) => {
        setFormData({ username: user.username, email: user.email, password: '' });
        setEditingUser(user);
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Gestión de Usuarios</h2>
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type='text' className="form-control" placeholder='Nombre' value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <input type='email' className="form-control" placeholder='Correo' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <input type='password' className="form-control" placeholder='Contraseña' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                </div>
                <button type='submit' className="btn btn-primary">{editingUser ? 'Actualizar' : 'Crear'} Usuario</button>
            </form>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(user)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;