import { Navigate } from "react-router-dom";

const KitchenRoute = ({ children }) => {
  const role = localStorage.getItem("userRole");

  if (role !== "KITCHEN_STAFF") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default KitchenRoute;
