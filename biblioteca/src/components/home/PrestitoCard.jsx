import {
  FaBook,
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaUndo,
  FaTrash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCircle
} from 'react-icons/fa'

export default function PrestitoCard({
  prestito,
  onRestituisci,
  onElimina,
  isAdmin
}) {
  const isRestituito = prestito.stato === 'restituito'
  const isRitardo = prestito.stato === 'in_ritardo'

  const getStatusStyle = () => {
    if (isRestituito) return 'text-secondary'
    if (isRitardo) return 'text-danger'
    return 'text-success'
  }

  const getStatusIcon = () => {
    if (isRestituito) return <FaCheckCircle className="text-secondary" />
    if (isRitardo) return <FaExclamationTriangle className="text-danger" />
    return <FaCircle className="text-success" />
  }

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('it-IT') : '—'

  return (
    <div
      className={`
        list-group-item
        bg-dark
        border border-secondary
        text-white
        py-3
        overflow-hidden
        ${isRestituito ? 'opacity-75' : ''}
      `}
    >
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">

        {/* LEFT */}
        <div className="flex-grow-1 min-w-0">

          {/* TITOLO LIBRO */}
          <div className="d-flex align-items-center gap-2 mb-2">
            <FaBook className="text-warning" />
            <strong className={isRestituito ? 'text-decoration-line-through text-white-50' : ''}>
              {prestito.libro_titolo}
            </strong>
          </div>

          {/* UTENTE */}
          {isAdmin && (
            <div className="small text-white-50 d-flex align-items-center gap-2 mb-2 text-break">
              <FaUser />
              {prestito.utente_nome} · {prestito.utente_email}
            </div>
          )}

          {/* DATE */}
          <div className="small text-white-50 d-flex flex-wrap gap-3">

            <span className="d-flex align-items-center gap-1">
              <FaCalendarAlt />
              {formatDate(prestito.data_prestito)}
            </span>

            <span className={`d-flex align-items-center gap-1 ${isRitardo ? 'text-danger fw-semibold' : ''}`}>
              <FaClock />
              {formatDate(prestito.data_restituzione_prevista)}
            </span>

            {prestito.data_restituzione_effettiva && (
              <span className="text-success d-flex align-items-center gap-1">
                <FaCheckCircle />
                {formatDate(prestito.data_restituzione_effettiva)}
              </span>
            )}
          </div>
        </div>

       {/* RIGHT */}
<div className="d-flex flex-column align-items-end gap-2 ms-auto">

  {/* STATUS */}
  <div className={`d-flex align-items-center gap-1 small ${getStatusStyle()}`}>
    {getStatusIcon()}
    <span className="text-uppercase fw-semibold">
      {prestito.stato}
    </span>
  </div>

  {/* ACTIONS */}
  <div className="d-flex gap-2">

    {!isRestituito && (
      <button
        onClick={() => onRestituisci(prestito.id)}
        className="btn btn-sm btn-outline-light d-flex align-items-center justify-content-center gap-1 px-2"
        title="Restituisci prestito"
      >
        <FaUndo />

        <span className="d-none d-sm-inline">
          Restituisci
        </span>
      </button>
    )}

    {isAdmin && (
      <button
        onClick={() => onElimina(prestito.id)}
        className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center px-2"
        title="Elimina prestito"
      >
        <FaTrash />
      </button>
    )}

  </div>
</div>

      </div>

      {/* FOOTER VISIVO PER RESTITUITI */}
      {isRestituito && (
        <div className="mt-2 small text-secondary border-top border-secondary pt-2">
          Prestito concluso
        </div>
      )}
    </div>
  )
}