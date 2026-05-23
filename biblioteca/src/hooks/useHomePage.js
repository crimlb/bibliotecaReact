import { useState, useEffect, useCallback } from 'react'
import { libriAPI, prestitiAPI } from '../services/api'

export function useHomePage(utente, isAdmin) {
  const [libri, setLibri] = useState([])
  const [prestiti, setPrestiti] = useState([])

  const [loadingLibri, setLoadingLibri] = useState(true)
  const [loadingPrestiti, setLoadingPrestiti] = useState(true)

  const [erroreLibri, setErroreLibri] = useState(null)
  const [errorePrestiti, setErrorePrestiti] = useState(null)

  // ─────────────────────────────────────────────
  // FETCH LIBRI (riutilizzabile)
  // ─────────────────────────────────────────────
  const fetchLibri = useCallback(async () => {
    try {
      setLoadingLibri(true)
      const data = await libriAPI.getAll()
      setLibri(data)
      setErroreLibri(null)
    } catch (e) {
      setErroreLibri(e.message)
    } finally {
      setLoadingLibri(false)
    }
  }, [])

  // ─────────────────────────────────────────────
  // FETCH PRESTITI
  // ─────────────────────────────────────────────
  const fetchPrestiti = useCallback(async () => {
    try {
      setLoadingPrestiti(true)

      const data = await prestitiAPI.getAll()

      const filtrati = isAdmin
        ? data
        : data.filter(p => p.utente_id === utente?.id)

      setPrestiti(filtrati)
      setErrorePrestiti(null)

    } catch (e) {
      setErrorePrestiti(e.message)
    } finally {
      setLoadingPrestiti(false)
    }
  }, [isAdmin, utente?.id])

  // ─────────────────────────────────────────────
  // INIT LIBRI
  // ─────────────────────────────────────────────
  useEffect(() => {
    fetchLibri()
  }, [fetchLibri])

  // ─────────────────────────────────────────────
  // INIT PRESTITI (si aggiorna se cambia utente/admin)
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!utente) return
    fetchPrestiti()
  }, [fetchPrestiti, utente])

  // ─────────────────────────────────────────────
  // RETURN
  // ─────────────────────────────────────────────
  return {
    libri,
    setLibri,
    fetchLibri,      // 👈 IMPORTANTISSIMO
    prestiti,
    setPrestiti,
    fetchPrestiti,   // utile per refresh
    loadingLibri,
    loadingPrestiti,
    erroreLibri,
    errorePrestiti
  }
}