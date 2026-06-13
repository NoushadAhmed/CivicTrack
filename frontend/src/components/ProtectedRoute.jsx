import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">
          Loading...
        </h1>
      </div>
    );
  }

  const token =
    localStorage.getItem("token");

  // If there's no token, force login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists but user data hasn't loaded yet,
  // show a loading state instead of redirecting.
  if (token && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  // Debug info
  console.log("ProtectedRoute:", {
    tokenPresent: !!token,
    user,
    loading,
    allowedRoles,
  });

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/" />;
  }

  return children;
}