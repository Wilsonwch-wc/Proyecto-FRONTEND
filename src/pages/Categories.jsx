import { useState, useEffect } from 'react';
import { getcategories, createcategories, updateCategories, deleteCategories } from '../services/categoryService';

import 'bootstrap/dist/css/bootstrap.min.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ name: '' });
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getcategories();
            setCategories(data.categories || data); // Ajusta según la respuesta real
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await updateCategories(editingCategory.id, formData);
            } else {
                await createcategories(formData);
            }
            setFormData({ name: '' });
            setEditingCategory(null);
            fetchCategories();
        } catch (error) {
            console.error('Error al guardar categoría:', error);
        }
    };

    const handleEdit = (category) => {
        setFormData({ name: category.name });
        setEditingCategory(category);
    };

    const handleDelete = async (id) => {
        try {
            await deleteCategories(id);
            fetchCategories();
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Gestión de Categorías</h2>
            <form className="mb-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type='text'
                        className="form-control"
                        placeholder='Nombre de la categoría'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <button type='submit' className="btn btn-primary">
                    {editingCategory ? 'Actualizar' : 'Crear'} Categoría
                </button>
            </form>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre de la categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(category)}>
                                    Editar
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Categories;
