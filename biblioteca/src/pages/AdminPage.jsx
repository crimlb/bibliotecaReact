import { useEffect, useState } from 'react'
import HeaderAdmin from '../components/admin/dashboard/HeaderAdmin'
import StatsSection from '../components/admin/dashboard/StatsSection'
import QuickActions from '../components/admin/dashboard/QuickAction'
import FormLibro from '../components/admin/libri/FormLibro'
import TableLibri from '../components/admin/libri/TableLibri'
import Toast from '../components/admin/Toast'
import { libriAPI, prestitiAPI } from '../services/api'
import { deleteLibro } from '../api/libri'
export default function AdminPage() {
  const [libri, setLibri] = useState([])
  const [prestiti, setPrestiti] = useState([])
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [ricerca, setRicerca] = useState('')

  const showToast = (m, t = 'successo') => setToast({ messaggio: m, tipo: t })

  useEffect(() => {
    Promise.all([libriAPI.getAll(), prestitiAPI.getAll()])
      .then(([l, p]) => { setLibri(l); setPrestiti(p) })
      .finally(() => setLoading(false))
  }, [])

  const stats = {
    libri: libri.length,
    volumi: libri.reduce((a, b) => a + (b.quantita || 0), 0),
    attivi: prestiti.filter(p => p.stato === 'attivo').length,
    ritardo: prestiti.filter(p => p.stato === 'in_ritardo').length,
  }

  const add = async (payload) => {
    const nuovo = await libriAPI.crea(payload)
    setLibri(prev => [nuovo, ...prev])
    showToast('Libro aggiunto')
  }

  const elimina = async (id) => {
  await deleteLibro(id)
  setLibri(prev => prev.filter(l => l.id !== id))
  showToast('Libro eliminato')
}

  const filtered = libri.filter(l =>
    l.titolo?.toLowerCase().includes(ricerca.toLowerCase()) ||
    l.autore?.toLowerCase().includes(ricerca.toLowerCase())
  )

  if (loading) {
    return (
      <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-success" />
      </div>
    )
  }

  return (
    <div
      className="bg-dark text-light min-vh-100"
      style={{ padding: 'clamp(1rem, 4vw, 2rem)' }}
    >
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <HeaderAdmin />

      <div className="mb-3 mb-sm-4">
        <StatsSection stats={stats} />
      </div>

      <div className="row g-3 mb-3 mb-sm-4 align-items-stretch">
        <div className="col-12 col-xl-7">
          <div className="card bg-black border border-success border-opacity-25 shadow-lg h-100 rounded-4 overflow-hidden">
            <div className="card-body p-3 p-md-4">
              <h3
                className="text-success fw-bold mb-1"
                style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}
              >
                Aggiungi libro
              </h3>
              <p className="text-secondary mb-3 small">
                Inserisci un nuovo volume nel catalogo
              </p>
              <FormLibro onSalva={add} />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <QuickActions
            libri={stats.libri}
            prestiti={stats.attivi}
            ritardi={stats.ritardo}
          />
        </div>
      </div>

      <TableLibri
        libri={filtered}
        setLibri={setLibri}
        showToast={showToast}
        ricerca={ricerca}
        setRicerca={setRicerca}
        onElimina={elimina}
      />
    </div>
  )
}