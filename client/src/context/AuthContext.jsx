import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login as loginApi, register as registerApi } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load user data from token on initial load
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Load user info from localStorage
      const storedEmail = localStorage.getItem('userEmail');
      const storedUserId = localStorage.getItem('userId');
      const storedIsAdmin = localStorage.getItem('userIsAdmin') === 'true';
      const storedRole = localStorage.getItem('userRole');

      if (storedEmail && storedUserId) {
        setUser({
          id: storedUserId,
          email: storedEmail,
          isAdmin: storedIsAdmin,
          role: storedRole
        });
      } else if (token) {
        // If we have a token but no stored user info, try to parse the token
        try {
          const tokenData = parseJwt(token);
          setUser({
            id: tokenData.userId,
            email: tokenData.email,
            isAdmin: tokenData.isAdmin,
            role: tokenData.role
          });

          // Store the parsed data
          localStorage.setItem('userEmail', tokenData.email);
          localStorage.setItem('userId', tokenData.userId);
          localStorage.setItem('userIsAdmin', tokenData.isAdmin);
          localStorage.setItem('userRole', tokenData.role);
        } catch (error) {
          console.error('Error parsing token:', error);
        }
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      localStorage.removeItem('userIsAdmin');
      localStorage.removeItem('userRole');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginApi({ email, password });

      // Decode the JWT token to get user info including isAdmin
      const tokenData = parseJwt(response.token);

      setToken(response.token);
      setUser({
        id: response.userId,
        email: email,
        isAdmin: tokenData.isAdmin,
        role: tokenData.role
      });

      // Store user info in localStorage for persistence
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('userIsAdmin', tokenData.isAdmin);
      localStorage.setItem('userRole', tokenData.role);

      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to parse JWT token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return {};
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await registerApi(userData);

      // Decode the JWT token to get user info including isAdmin
      const tokenData = parseJwt(response.token);

      setToken(response.token);
      setUser({
        id: response.userId,
        email: userData.email,
        isAdmin: tokenData.isAdmin || false,
        role: tokenData.role || userData.role || 'customer'
      });

      // Store user info in localStorage for persistence
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('userIsAdmin', tokenData.isAdmin || false);
      localStorage.setItem('userRole', tokenData.role || userData.role || 'customer');

      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userIsAdmin');
    localStorage.removeItem('userRole');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        isAdmin: user?.isAdmin || false,
        role: user?.role || 'customer',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
