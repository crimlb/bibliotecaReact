import { useState, useEffect, useRef } from 'react'
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from 'react-icons/fa'

export default function RigaLibro({
  libro,
  selectedLibroId,
  onModifica,
  onElimina,
  onIncrementa,
  onDecrementa,
  loading
}) {

  const [aperto, setAperto] = useState(false)
  const [highlight, setHighlight] = useState(false)

  const isSelected = selectedLibroId === libro.id
  const ref = useRef(null)

  const rowBg = highlight ? 'rgba(25,135,84,0.18)' : undefined

  // 🔥 SCROLL STABILE
  useEffect(() => {
    if (selectedLibroId === libro.id) {
      requestAnimationFrame(() => {
        ref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      })

      // 🔥 highlight temporaneo
      setHighlight(true)
      const timer = setTimeout(() => {
        setHighlight(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [selectedLibroId, libro.id])

  return (
    <>
      <tr
        ref={ref}
        onClick={() => setAperto(p => !p)}
        style={{
          cursor: 'pointer'
        }}
      >

        {/* CHEVRON */}
        <td
          style={{
            width: 36,
            minWidth: 36,
            backgroundColor: rowBg
          }}
          onClick={e => e.stopPropagation()}
        >
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
            maxWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            backgroundColor: rowBg
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
            whiteSpace: 'nowrap',
            backgroundColor: rowBg
          }}
        >
          {libro.autore}
        </td>

        {/* ISBN */}
        <td
          className="text-secondary d-none d-md-table-cell"
          style={{
            maxWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            backgroundColor: rowBg
          }}
        >
          {libro.isbn || '—'}
        </td>

        {/* ANNO */}
        <td
          className="text-center d-none d-md-table-cell"
          style={{
            width: 60,
            minWidth: 60,
            backgroundColor: rowBg
          }}
        >
          {libro.anno_pubblicazione || '—'}
        </td>

        {/* QUANTITÀ */}
        <td
          className="text-center d-none d-sm-table-cell"
          style={{
            width: 90,
            minWidth: 90,
            backgroundColor: rowBg
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="d-flex align-items-center justify-content-center gap-2">

            <button
              className="btn btn-outline-danger rounded-3 px-2 py-0"
              style={{ fontSize: '0.75rem' }}
              onClick={() => onDecrementa(libro.id)}
              disabled={libro.quantita <= 0 || loading === libro.id}
            >
              {loading === libro.id ? '...' : '−'}
            </button>

            <span className="fw-bold">
              {libro.quantita}
            </span>

            <button
              className="btn btn-outline-success rounded-3 px-2 py-0"
              style={{ fontSize: '0.75rem' }}
              onClick={() => onIncrementa(libro.id)}
              disabled={loading === libro.id}
            >
              {loading === libro.id ? '...' : '+'}
            </button>

          </div>
        </td>

        {/* AZIONI */}
        <td
          style={{
            width: 80,
            minWidth: 80,
            backgroundColor: rowBg
          }}
          className="text-center"
          onClick={e => e.stopPropagation()}
        >
          <div className="d-flex justify-content-center gap-1">

            {onModifica && (
              <button
                className="btn btn-outline-success rounded-3"
                style={{ padding: '3px 7px', fontSize: '0.75rem' }}
                onClick={() => onModifica(libro)}
              >
                <FaEdit />
              </button>
            )}

            <button
              className="btn btn-outline-danger rounded-3"
              style={{ padding: '3px 7px', fontSize: '0.75rem' }}
              onClick={() => onElimina(libro.id)}
            >
              <FaTrash />
            </button>

          </div>
        </td>

      </tr>

      {/* DETTAGLI */}
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