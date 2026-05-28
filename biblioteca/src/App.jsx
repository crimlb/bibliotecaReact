import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import PrestitiPage from './pages/PrestitiPage'
import AdminPage from './pages/AdminPage'

import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import MainLayout from './layouts/MainLayout'

export default function AppRoutes() {
  const { utente } = useAuth()

  return (
    <Routes>
      {/* AUTH */}
      <Route
        path="/login"
        element={utente ? <Navigate to="/" replace /> : <LoginPage />}
      />

      <Route
        path="/register"
        element={utente ? <Navigate to="/" replace /> : <RegisterPage />}
      />

      {/* LAYOUT PRINCIPALE */}
      <Route element={<MainLayout />}>
        
        <Route
          index
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prestiti"
          element={
            <ProtectedRoute>
              <PrestitiPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

      </Route>
    </Routes>
  )
}