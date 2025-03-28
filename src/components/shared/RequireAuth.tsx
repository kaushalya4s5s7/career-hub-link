
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useEffect } from "react";

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast("Authentication required", {
        description: "Please log in to access this page",
      });
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="text-2xl font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the current location they were
    // trying to go to when they were redirected
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
