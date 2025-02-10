import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categoria from "./pages/Categories";
import Product from "./pages/Products";
import Users from "./pages/Users";
import Orders from "./pages/Orders";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AuthContext.Consumer>
                    {({ isAuthenticated }) => isAuthenticated && <Navbar />}
                </AuthContext.Consumer>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/categories" element={<ProtectedRoute><Categoria /></ProtectedRoute>} />
                    <Route path="/products" element={<ProtectedRoute><Product /></ProtectedRoute>} />
                    <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                    <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
