import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SellerRoute = ({ children }) => {
  const { isAuthenticated, role, isAdmin, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // Show loading spinner while checking authentication
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  if (role !== 'seller' && !isAdmin) {
    // Redirect to home page if user is not a seller
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SellerRoute;
