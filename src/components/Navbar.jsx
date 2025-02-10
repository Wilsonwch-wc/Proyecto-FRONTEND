import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <h2>Panel de Administración</h2>
            <ul className="nav-links">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/categories">Categorías</Link></li>
                <li><Link to="/products">Productos</Link></li>
                <li><Link to="/orders">Pedidos</Link></li>
                <li><Link to="/users">Usuarios</Link></li>
            </ul>
            <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
    );
};

export default Navbar;
