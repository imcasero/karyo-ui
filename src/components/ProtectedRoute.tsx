import { useEffect } from "react";
import { useLocation } from "preact-iso";
import { useAuth } from "../context/AuthContext";
import type { ComponentType } from "preact";

interface ProtectedRouteProps {
  component: ComponentType;
}

export const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      location.route("/login");
    }
  }, [user, isLoading, location]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <Component />;
}; 