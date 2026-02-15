import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust path as needed

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  // 1. Wait for the 'fetchMe' call to finish
  if (loading) {
    return <div>Loading...</div>; // Or a nice Spinner
  }

  // 2. If no user is found, send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists but role doesn't match, send to a "Not Authorized" page or Home
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // 4. Everything is good, render the dashboard
  return <Outlet />;
};

export default ProtectedRoute;