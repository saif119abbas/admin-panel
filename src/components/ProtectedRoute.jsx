// src/components/ProtectedRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePermissions } from "../hooks/usePermissions";
import { useSidebar } from "../context/SidebarContext";
import LoadingSpinner from "./Users/common/LoadingSpinner";

function ProtectedRoute({ children, requiredPage }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasPermission, permittedPages } = usePermissions();
  const { changeView } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && requiredPage && !hasPermission(requiredPage)) {
      if (permittedPages.length > 0) {
        changeView(permittedPages[0]);
      }
    }
  }, [isAuthenticated, isLoading, requiredPage, hasPermission, changeView, permittedPages]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredPage && !hasPermission(requiredPage)) {
    return null;
  }

  return children;
}

export default ProtectedRoute;