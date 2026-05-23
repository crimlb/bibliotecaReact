import { useState } from 'react'
import { FaBook, FaCalendarAlt, FaTimes, FaCheck } from 'react-icons/fa'

function toLocalDateInput(days = 0) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

export default function ModalPrestito({
  libro,
  onConferma,
  onAnnulla
}) {
  const [data, setData] = useState(toLocalDateInput(14))
  const [errore, setErrore] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleConferma = async () => {
    setErrore(null)
    setLoading(true)

    try {
      await onConferma(libro.id, data)
    } catch (err) {
      setErrore(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="modal d-block bg-black bg-opacity-75"
      onClick={onAnnulla}
      style={{ backdropFilter: 'blur(6px)' }}
    >
      <div className="container d-flex justify-content-center align-items-center min-vh-100">

        {/* MODALE */}
   <div
  onClick={(e) => e.stopPropagation()}
  className="bg-dark text-white rounded-4 p-4 p-md-5 w-100 shadow-lg position-relative"
  style={{
    maxWidth: '640px',
    border: '1px solid rgba(255,255,255,0.08)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.7)'
  }}
>

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-start mb-4">

            <div className="d-flex align-items-start gap-3">
              <FaBook className="text-success fs-4 mt-1" />

              <div>
                <h4 className="fw-bold mb-1">
                  Nuovo prestito
                </h4>
                <small className="text-white-50">
                  Seleziona la data di restituzione
                </small>
              </div>
            </div>

          <button
  onClick={onAnnulla}
className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center p-0 position-absolute"
style={{
  width: '38px',
  height: '38px',
  top: '12px',
  right: '12px',
  lineHeight: '1',
  opacity: 0.8
}}
onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
>
  <FaTimes />
</button>
          </div>

          {/* INFO LIBRO */}
          <div
            className="rounded-3 p-3 mb-4"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            <div className="text-white-50 small mb-1">
              Libro selezionato
            </div>
            <div className="fw-semibold fs-5">
              {libro.titolo}
            </div>
          </div>

          {/* ERRORE */}
          {errore && (
            <div className="alert alert-danger py-2">
              ⚠ {errore}
            </div>
          )}

          {/* INPUT */}
          <label className="form-label d-flex align-items-center gap-2 text-white-50">
            <FaCalendarAlt />
            Data restituzione
          </label>
          <div className="mb-5">
            <input
              type="date"
              className="form-control bg-black text-white mb-4"
              style={{
                maxWidth: '100%',
                colorScheme: 'dark',
                fontSize: '1rem'
              }}

              value={data}
              min={toLocalDateInput(1)}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          {/* ACTIONS */}
          <div className="d-flex justify-content-end gap-2">

            <button
              className="btn btn-outline-light px-3"
              onClick={onAnnulla}
              disabled={loading}
            >
              Annulla
            </button>

            <button
              className="btn btn-success px-4 d-flex align-items-center gap-2 fw-semibold"
              onClick={handleConferma}
              disabled={loading}
            >
              <FaCheck />
              {loading ? 'Salvataggio…' : 'Conferma'}
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}