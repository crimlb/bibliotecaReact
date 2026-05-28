import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { utente } = useAuth()
  const location = useLocation()

  if (!utente) {
    // "replace" evita che /login finisca nella cronologia del browser
    // "state" salva la pagina originale per poterla raggiungere dopo il login
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}