import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TeamProvider } from './context/TeamContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import HeroDetailPage from './pages/HeroDetailPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Asegúrate de que tienes un archivo CSS global si es necesario

function App() {
  return (
    <Router>
      <AuthProvider>
        <TeamProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/hero/:id" element={
              <ProtectedRoute>
                <HeroDetailPage />
              </ProtectedRoute>
            } />
          </Routes>
        </TeamProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
