import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Unauthorized from "../../pages/Unauthorized";

const RequireAuth = ({ allowedRoles }) => {
  const currentUser = useAuth();
  const location = useLocation();
  const roles = currentUser?.roles;
  console.log(roles);

  console.log("User Roles", roles);
  console.log("Allowed Roles", allowedRoles);

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : currentUser ? (
    <Unauthorized />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
