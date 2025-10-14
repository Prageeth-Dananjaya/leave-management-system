import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  return tokrn ? children : <Navigate to="/" replace />;
}
