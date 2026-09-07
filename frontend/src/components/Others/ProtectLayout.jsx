import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectLayout = ({ children }) => {
  const { isLogin } = useSelector((state) => state.user);

  if (!isLogin) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectLayout;