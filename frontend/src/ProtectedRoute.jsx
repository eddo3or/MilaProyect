import { Navigate, Outlet } from "react-router-dom";
import { useUsuarioContext } from "./ContextProvider.jsx";

function ProtectedRoute() {
    const { isAuthenticated, loading } = useUsuarioContext();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!isAuthenticated) return < Navigate to="/" replace />;
    else return < Outlet />
}

export default ProtectedRoute;
