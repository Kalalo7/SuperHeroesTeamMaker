import React, { createContext, useState, useEffect } from 'react';
import { login } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Verificar si el token existe y no está vacío
    setIsAuthenticated(!!token && token.trim() !== '');
    setIsLoading(false);
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const token = await login(email, password);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      login: handleLogin,
      logout: handleLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};