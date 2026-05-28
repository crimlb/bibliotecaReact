import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminRoute({ children }) {
  const { utente } = useAuth()

  if (!utente)                    return <Navigate to="/login" replace />
  if (utente.ruolo !== 'admin')   return <Navigate to="/" replace />

  return children
}