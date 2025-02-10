import { useState, useEffect } from "react";
import { getAllOrders, createOrder, deleteOrder } from "../services/orderService";
import { getUsers } from "../services/userService";
import { getAllProducts } from "../services/productService";
import 'bootstrap/dist/css/bootstrap.min.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ userId: "", productId: "", quantity: 1 });

    useEffect(() => {
        fetchOrders();
        fetchUsers();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        const data = await getAllOrders();
        if (data.error) {
            setError(data.error);
        } else {
            setOrders(data.orders || []);
        }
        setLoading(false);
    };

    const fetchUsers = async () => {
        const data = await getUsers();
        if (!data.error) setUsers(data.users || []);
    };

    const fetchProducts = async () => {
        const data = await getAllProducts();
        if (!data.error) setProducts(data.products || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.userId || !form.productId || !form.quantity) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const result = await createOrder(form);
        if (result.error) {
            setError(result.error);
        } else {
            setForm({ userId: "", productId: "", quantity: 1 });
            fetchOrders();
        }
    };

    const handleDelete = async (id) => {
        const result = await deleteOrder(id);
        if (result.error) {
            setError(result.error);
        } else {
            fetchOrders();
        }
    };

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar error */}
            <h2 className="mb-4">Pedidos</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <select 
                        value={form.userId} 
                        onChange={(e) => setForm({ ...form, userId: e.target.value })} 
                        className="form-select" 
                    >
                        <option value="">Seleccione un usuario</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Producto</label>
                    <select 
                        value={form.productId} 
                        onChange={(e) => setForm({ ...form, productId: e.target.value })} 
                        className="form-select"
                    >
                        <option value="">Seleccione un producto</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input 
                        type="number" 
                        value={form.quantity} 
                        onChange={(e) => setForm({ ...form, quantity: e.target.value })} 
                        className="form-control" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Crear Pedido</button>
            </form>

     
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user_name}</td>
                                <td>{order.product_name}</td>
                                <td>{order.quantity}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(order.id)} 
                                        className="btn btn-danger btn-sm"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Orders;
