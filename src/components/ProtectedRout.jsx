import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // یا localStorage

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('accessToken'); // توکن را از کوکی یا localStorage بخوانید
  if (!token) {
    return <Navigate to="/admin-login" />; // اگر توکن نیست، به صفحه لاگین برو
  }
  return children; // اگر توکن هست، کامپوننت موردنظر را رندر کن
};

export default ProtectedRoute;