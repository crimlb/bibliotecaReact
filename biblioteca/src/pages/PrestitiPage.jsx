import { useState, useEffect, useMemo } from 'react'
import { prestitiAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import ListaPrestiti from '../components/home/ListaPrestiti'

import {
  FaBook,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaLayerGroup
} from 'react-icons/fa'

export default function PrestitiPage() {
  const { utente } = useAuth()
  const isAdmin = utente?.ruolo === 'admin'

  const [prestiti, setPrestiti] = useState([])
  const [loading, setLoading] = useState(true)
  const [errore, setErrore] = useState(null)
  const [filtro, setFiltro] = useState('tutti')

  // ── LOAD
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)

        const data = await prestitiAPI.getAll()

        const filtrati = isAdmin
          ? data
          : data.filter(p => p.utente_id === utente?.id)

        setPrestiti(filtrati)
      } catch (e) {
        setErrore(e.message)
      } finally {
        setLoading(false)
      }
    }

    if (utente) load()
  }, [utente, isAdmin])

  // ── ACTIONS
  const handleRestituisci = async (id) => {
    await prestitiAPI.restituisci(id)

    setPrestiti(prev =>
      prev.map(p =>
        p.id === id
          ? {
              ...p,
              stato: 'restituito',
              data_restituzione_effettiva: new Date().toISOString()
            }
          : p
      )
    )
  }

  const handleElimina = async (id) => {
    await prestitiAPI.elimina(id)
    setPrestiti(prev => prev.filter(p => p.id !== id))
  }

  // ── GROUPS
  const gruppi = useMemo(() => ({
    attivi: prestiti.filter(p => p.stato === 'attivo'),
    ritardo: prestiti.filter(p => p.stato === 'in_ritardo'),
    restituiti: prestiti.filter(p => p.stato === 'restituito')
  }), [prestiti])

  const conteggio = {
    tutti: prestiti.length,
    attivi: gruppi.attivi.length,
    ritardo: gruppi.ritardo.length,
    restituiti: gruppi.restituiti.length
  }

  const FILTERS = [
    { key: 'tutti', label: 'Tutti', icon: FaLayerGroup },
    { key: 'attivi', label: 'Attivi', icon: FaCheckCircle },
    { key: 'ritardo', label: 'In ritardo', icon: FaExclamationTriangle },
    { key: 'restituiti', label: 'Restituiti', icon: FaClock }
  ]

  const badgeColor = {
    success: 'bg-success',
    danger: 'bg-danger',
    secondary: 'bg-secondary'
  }

  const renderSection = (title, Icon, items, color) => {
    if (filtro !== 'tutti' && filtro !== title.toLowerCase()) return null
    if (!items.length) return null

    return (
      <div className="mb-5">

  {/* HEADER SEZIONE */}
  <div
    className={`px-2 px-md-3 mb-3 fs-4 text-${color}`}
  >

    <div className="d-flex align-items-center justify-content-around m-5">

      <div className="d-flex align-items-center gap-2">

        <Icon className="fs-3 flex-shrink-0" />

        <h2 className="fs-3 m-0 fw-bold">
          {title}
        </h2>

        <span
          className={`badge rounded-pill ms-2 ${badgeColor[color]} text-white`}
        >
          {items.length}
        </span>

      </div>

    </div>
  </div>

  {/* LISTA */}
  <div>
    <ListaPrestiti
      prestiti={items}
      isAdmin={isAdmin}
      setPrestiti={setPrestiti}
      onRestituisci={handleRestituisci}
      onElimina={handleElimina}
    />
  </div>
</div>
    )
  }

  return (
    <div className="container-fluid bg-black text-white min-vh-100 p-4 pt-5 px-5">

      {/* HEADER */}
      <div className="mb-5 text-center">
        <div className="align-items-center gap-2 text-center">
          <FaBook size={35} />
          <h2 className="fs-1 fw-bold m-0 mb-2">Dashboard Prestiti</h2>
        </div>
        <p className="text-white-50 mb-0 fs-4">
          Gestione completa dei prestiti della biblioteca
        </p>
      </div>

      {/* STATS CENTRATE */}
      <div className="row justify-content-center mb-4">
        <div className="col-lg-10">
          <div className="row g-3">

            <div className="col-6 col-md-3">
              <div className="bg-dark border rounded-3 p-3 text-center">
                <div className="text-white-50 small">Totali</div>
                <div className="fs-4 fw-bold">{conteggio.tutti}</div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="bg-success bg-opacity-25 border border-success rounded-3 p-3 text-center">
                <div className="text-success">Attivi</div>
                <div className="fs-4 fw-bold text-success">{conteggio.attivi}</div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="bg-danger bg-opacity-25 border border-danger rounded-3 p-3 text-center">
                <div className="text-danger">Ritardo</div>
                <div className="fs-4 fw-bold text-danger">{conteggio.ritardo}</div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="bg-secondary bg-opacity-25 border border-secondary rounded-3 p-3 text-center">
                <div className="text-secondary">Restituiti</div>
                <div className="fs-4 fw-bold text-secondary">{conteggio.restituiti}</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FILTRI */}
      <div className="d-flex justify-content-center mb-4">
        <div className="d-flex gap-2 flex-wrap justify-content-center">
          {FILTERS.map(f => {
            const Icon = f.icon

            return (
              <button
                key={f.key}
                onClick={() => setFiltro(f.key)}
                className={`btn btn-sm d-flex align-items-center gap-2 px-3 ${
                  filtro === f.key ? 'btn-light' : 'btn-outline-light'
                }`}
              >
                <Icon />
                {f.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* LOADING / ERROR */}
      {loading && <div className="text-white-50 ">Caricamento...</div>}
      {errore && <div className="text-danger">{errore}</div>}

      {/* CONTENUTO */}
      {!loading && (
        <>
          {renderSection('Attivi', FaCheckCircle, gruppi.attivi, 'success')}
          {renderSection('In ritardo', FaExclamationTriangle, gruppi.ritardo, 'danger')}
          {renderSection('Restituiti', FaClock, gruppi.restituiti, 'secondary')}
        </>
      )}

    </div>
  )
}