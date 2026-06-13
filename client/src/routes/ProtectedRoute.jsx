import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading  } = useSelector((state) => state.auth);


   if (isLoading) {
    return <div>Loading...</div>; // 👈 wait for /me
  }
  console.log(isAuthenticated)


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;