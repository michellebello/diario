import { Navigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../contexts/Session";

function ProtectedRoute() {
  const authStatus = isAuthenticated();
  const location = useLocation();

  console.log("auth status is", authStatus);

  if (authStatus === null || authStatus === undefined) {
    return <div>Loading...</div>;
  }

  return authStatus ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}

export default ProtectedRoute;
