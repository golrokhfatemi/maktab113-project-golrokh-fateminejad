import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('accessToken'); 
  if (!token) {
    return <Navigate to="/admin-login" />;
  }
  return children; 
};

export default ProtectedRoute;