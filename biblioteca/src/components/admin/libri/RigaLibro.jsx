import { useState } from 'react'
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from 'react-icons/fa'

export default function RigaLibro({ libro, onModifica, onElimina }) {
  const [aperto, setAperto] = useState(false)

  return (
    <>
      <tr
        onClick={() => setAperto(p => !p)}
        style={{ cursor: 'pointer' }}
      >

        {/* CHEVRON */}
        <td style={{ width: 36, minWidth: 36 }} onClick={e => e.stopPropagation()}>
          <button
            className="btn btn-sm btn-link text-success p-0"
            onClick={() => setAperto(p => !p)}
            aria-label="Espandi dettagli"
          >
            {aperto ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </td>

        {/* TITOLO */}
        <td
          className="fw-semibold"
          style={{
            maxWidth: 0,       /* trick: forza la cella a cedere spazio */
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {libro.titolo}
        </td>

        {/* AUTORE */}
        <td
          className="d-none d-sm-table-cell"
          style={{
            maxWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {libro.autore}
        </td>

        {/* ISBN */}
        <td className="text-secondary d-none d-md-table-cell"
          style={{ maxWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {libro.isbn || '—'}
        </td>

        {/* ANNO */}
        <td className="text-center d-none d-md-table-cell" style={{ width: 60, minWidth: 60 }}>
          {libro.anno_pubblicazione || '—'}
        </td>

        {/* QTÀ */}
        <td className="text-center d-none d-sm-table-cell" style={{ width: 48, minWidth: 48 }}>
          {libro.quantita}
        </td>

        {/* AZIONI — larghezza fissa, non comprimibile */}
        <td
          style={{ width: 80, minWidth: 80 }}
          className="text-center"
          onClick={e => e.stopPropagation()}
        >
          <div className="d-flex justify-content-center gap-1">
            {onModifica && (
              <button
                className="btn btn-outline-success rounded-3"
                style={{ padding: '3px 7px', fontSize: '0.75rem' }}
                onClick={() => onModifica(libro)}
                aria-label="Modifica"
              >
                <FaEdit />
              </button>
            )}
            <button
              className="btn btn-outline-danger rounded-3"
              style={{ padding: '3px 7px', fontSize: '0.75rem' }}
              onClick={() => onElimina(libro.id)}
              aria-label="Elimina"
            >
              <FaTrash />
            </button>
          </div>
        </td>

      </tr>

      {/* DETTAGLI ESPANSI */}
      {aperto && (
        <tr className="bg-dark">
          <td colSpan="7" className="px-3 px-md-4 py-3">
            <div className="row g-2 g-sm-3 small">

              <div className="col-6 d-sm-none">
                <span className="text-secondary d-block">Autore</span>
                <span className="text-light">{libro.autore || '—'}</span>
              </div>

              <div className="col-6 d-sm-none">
                <span className="text-secondary d-block">Quantità</span>
                <span className="text-light">{libro.quantita}</span>
              </div>

              <div className="col-6 d-md-none">
                <span className="text-secondary d-block">ISBN</span>
                <span className="text-light">{libro.isbn || '—'}</span>
              </div>

              <div className="col-6 d-md-none">
                <span className="text-secondary d-block">Anno</span>
                <span className="text-light">{libro.anno_pubblicazione || '—'}</span>
              </div>

              {libro.genere && (
                <div className="col-6 col-sm-4">
                  <span className="text-secondary d-block">Genere</span>
                  <span className="text-light">{libro.genere}</span>
                </div>
              )}

              <div className="col-6 col-sm-4">
                <span className="text-secondary d-block">Disponibile</span>
                <span className={libro.disponibile ? 'text-success' : 'text-danger'}>
                  {libro.disponibile ? 'Sì' : 'No'}
                </span>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  )
}