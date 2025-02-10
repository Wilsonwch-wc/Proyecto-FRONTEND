import { useEffect, useState } from "react";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getCategories } from "../services/productService";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ id: null, name: "", price: "", categoryId: "" });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        const data = await getAllProducts();
        if (data.error) {
            setError(data.error);
        } else {
            setProducts(data.products || []);
        }
        setLoading(false);
    };

    const fetchCategories = async () => {
        const data = await getCategories();
        if (!data.error) setCategories(data.categories || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.price || !form.categoryId) {
            alert("Todos los campos son obligatorios");
            return;
        }

        let result;
        if (form.id) {
            result = await updateProduct(form.id, { name: form.name, price: form.price, categoryId: form.categoryId });
        } else {
            result = await createProduct({ name: form.name, price: form.price, categoryId: form.categoryId });
        }

        if (result.error) {
            alert(result.error);
        } else {
            alert(form.id ? "Producto actualizado" : "Producto agregado");
            fetchProducts();
            setForm({ id: null, name: "", price: "", categoryId: "" });
        }
    };

    const handleEdit = (product) => {
        setForm({ id: product.id, name: product.name, price: product.price, categoryId: product.category_id });
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            const result = await deleteProduct(id);
            if (result.error) {
                alert(result.error);
            } else {
                alert("Producto eliminado");
                fetchProducts();
            }
        }
    };

    if (loading) return <p className="text-center">Cargando productos...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Gestión de Productos</h2>

            {/* Formulario de Producto */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-3">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="col-md-4">
                        <input type="number" className="form-control" placeholder="Precio" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    </div>
                    <div className="col-md-4">
                        <select className="form-control" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                            <option value="">Seleccione Categoría</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-success mt-3">{form.id ? "Actualizar Producto" : "Agregar Producto"}</button>
            </form>

            {/* Tabla de Productos */}
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category_name || "Sin categoría"}</td>
                            <td>
                                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(product)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
