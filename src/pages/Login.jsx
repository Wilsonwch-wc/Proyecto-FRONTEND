import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(email, password);
            login(data.token); // Actualizar estado global
            navigate("/dashboard");
        } catch (err) {
            setError(err.error || "Error al iniciar sesión");
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "400px" }}>
                <h2 className="text-center text-dark fw-bold">Iniciar Sesión</h2>

                {error && <p className="text-danger text-center">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Ingresar
                    </button>
                </form>

                <p className="text-center mt-3">
                    ¿No tienes cuenta? <a href="/register" className="text-primary">Regístrate</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
