import { useEffect } from "react";
import { useAuth } from "../provider/AuthProvider";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectedPages = () => {
  const [token, _] = useAuth();
  const navigate = useNavigate();

  if (token) return token ? <Outlet /> : navigate("/");
};
export default ProtectedPages;
