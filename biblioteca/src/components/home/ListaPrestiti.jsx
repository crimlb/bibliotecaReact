import Spinner from './Spinner'
import PrestitoCard from './PrestitoCard'
import {
  FaBook,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHistory,
  FaChartBar
} from 'react-icons/fa'

export default function ListaPrestiti({
  prestiti,
  loading,
  error,
  onRestituisci,
  onElimina,
  isAdmin
}) {

  const attivi = prestiti.filter(p => p.stato === 'attivo')
  const ritardo = prestiti.filter(p => p.stato === 'in_ritardo')
  const restituiti = prestiti.filter(p => p.stato === 'restituito')

  const total = prestiti.length

  const SectionHeader = ({ icon: Icon, title, count, color }) => (
    <div className="d-flex align-items-center justify-content-between mb-2">

      <div className={`d-flex align-items-center gap-2 text-${color}`}>
        <Icon />
        <h6 className="mb-0 fw-bold">{title}</h6>
        <span className={`badge bg-${color}`}>{count}</span>
      </div>

      <small className="text-white-50">
        {title === 'Attivi' && 'In gestione'}
        {title === 'In ritardo' && 'Richiede attenzione'}
        {title === 'Archivio' && 'Storico completo'}
      </small>

    </div>
  )

  const Section = ({ children, colorClass }) => (
    <div className={`rounded-4 bg-black border-${colorClass}`}>
      {children}
    </div>
  )

  return (
    <div className="container-lg px-2 px-md-3 bg-dark border border-2 border-success border-opacity-75 rounded-4 p-3">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4 mx-4">

        <div className="d-flex align-items-center gap-2 text-white">
          <div >
            <h4 className="fw-bold mb-0">Gestione Prestiti</h4>
            <small className="text-white-50">
              Monitoraggio stato prestiti biblioteca
            </small>
          </div>
        </div>

        <div className="px-2 px-md-3 py-1 rounded-3 bg-dark border text-white-50 text-center small">
          <FaChartBar className="me-2" />
          Totale <span className="text-white fw-semibold ms-1">{total}</span>
        </div>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="d-flex justify-content-center py-4">
          <Spinner />
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* ================= ATTIVI ================= */}
      {!loading && attivi.length > 0 && (
        <Section colorClass="success">
          <div className="m-2 list-group list-group-flush rounded-3 overflow-hidden">
            {attivi.map(p => (
              <PrestitoCard
                key={p.id}
                prestito={p}
                onRestituisci={onRestituisci}
                onElimina={onElimina}
                isAdmin={isAdmin}
              />
            ))}
          </div>

        </Section>
      )}

      {/* ================= RITARDO ================= */}
      {!loading && ritardo.length > 0 && (
        <Section colorClass="danger">

          <SectionHeader
            icon={FaExclamationTriangle}
            title="In ritardo"
            count={ritardo.length}
            color="danger"
          />

          <div className="list-group list-group-flush rounded-3 overflow-hidden">
            {ritardo.map(p => (
              <PrestitoCard
                key={p.id}
                prestito={p}
                onRestituisci={onRestituisci}
                onElimina={onElimina}
                isAdmin={isAdmin}
              />
            ))}
          </div>

        </Section>
      )}

      {/* ================= ARCHIVIO ================= */}
      {!loading && restituiti.length > 0 && (
        <Section colorClass="secondary">

          <SectionHeader
            icon={FaHistory}
            title="Archivio"
            count={restituiti.length}
            color="secondary"
          />

          <div className="list-group list-group-flush rounded-3 overflow-hidden opacity-75">
            {restituiti.map(p => (
              <PrestitoCard
                key={p.id}
                prestito={p}
                onRestituisci={onRestituisci}
                onElimina={onElimina}
                isAdmin={isAdmin}
              />
            ))}
          </div>

        </Section>
      )}

      {/* EMPTY */}
      {!loading && prestiti.length === 0 && (
        <div className="text-center text-white-50 py-5">
          Nessun prestito presente
        </div>
      )}

    </div>
  )
}