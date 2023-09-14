import { useAuth } from "../../hooks/auth";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const { authed } = useAuth();

  return authed? children : <Navigate to="/login" replace />;
}
