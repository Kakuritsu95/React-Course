import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthProvider";

function ProtectedRoute({ children }) {
  const { isAutenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAutenticated) navigate("/");
  }, [isAutenticated, navigate]);
  return isAutenticated ? children : null;
}

export default ProtectedRoute;
