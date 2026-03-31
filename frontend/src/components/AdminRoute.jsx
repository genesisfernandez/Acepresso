import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";



const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("asd:", useAuth());


  if (loading) return <div>Loading...</div>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;