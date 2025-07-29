import { type ReactNode } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  return token ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
