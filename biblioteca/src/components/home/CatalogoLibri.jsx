import LibroCard from './LibroCard'
import Spinner from './Spinner'
import { GiBookshelf } from "react-icons/gi";
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const CARD_PER_PAGINA = 6

function Paginazione({ paginaCorrente, totalePagine, onCambia }) {
    if (totalePagine <= 1) return null

    const pagine = []
    for (let i = 1; i <= totalePagine; i++) {
        const vicino = i === 1 || i === totalePagine || Math.abs(i - paginaCorrente) <= 1
        if (vicino) {
            pagine.push(i)
        } else if (
            pagine[pagine.length - 1] !== '...'
        ) {
            pagine.push('...')
        }
    }

    return (
        <div className="d-flex flex-column align-items-center gap-3 mt-5 mb-2">
            <p className="text-white-50 mb-0" style={{ fontSize: '.8rem', letterSpacing: '.1em' }}>
                Pagina {paginaCorrente} di {totalePagine}
            </p>
            <nav aria-label="Navigazione pagine"  className="w-100 overflow-auto">
                <ul className="pagination pagination-sm mb-0  flex-nowrap justify-content-center p-1">
                    {/* PRECEDENTE */}
                    <li className={`page-item ${paginaCorrente === 1 ? 'disabled' : ''}`}>
                        <button
                            className="page-link d-flex align-items-center gap-1 rounded-3"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,.12)',
                                color: paginaCorrente === 1 ? 'rgba(255,255,255,.25)' : '#fff',
                                padding: '6px 14px',
                                fontSize: '0.9rem',
                                letterSpacing: '.1em'
                            }}
                            onClick={() => onCambia(paginaCorrente - 1)}
                            disabled={paginaCorrente === 1}
                        >
                            <FaChevronLeft size={10} /> PREC
                        </button>
                    </li>

                    {/* NUMERI */}
                    {pagine.map((p, i) =>
                        p === '...'
                            ? (
                                <li key={`ellipsis-${i}`} className="page-item disabled">
                                    <span
                                        className="page-link"
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'rgba(255,255,255,.3)',
                                            padding: '6px 8px'
                                        }}
                                    >
                                        ···
                                    </span>
                                </li>
                            )
                            : (
                                <li key={p} className="page-item">
                                    <button
                                        className="page-link rounded-3"
                                        style={{
                                            background: p === paginaCorrente
                                                ? 'transparent'
                                                : 'transparent',
                                            border: p === paginaCorrente
                                                ? 'transparent'
                                                : 'transparent',
                                            color: p === paginaCorrente
                                                ? '#f8fbf9'
                                                : 'rgb(113, 111, 111)',
                                            fontWeight: p === paginaCorrente ? 600 : 400,
                                            minWidth: '38px',
                                            textAlign: 'center',
                                            fontSize: '1rem',
                                            padding: '6px 10px'
                                        }}
                                        onClick={() => onCambia(p)}
                                    >
                                        {p}
                                    </button>
                                </li>
                            )
                    )}

                    {/* SUCCESSIVO */}
                    <li className={`page-item ${paginaCorrente === totalePagine ? 'disabled' : ''}`}>
                        <button
                            className="page-link d-flex align-items-center gap-1 rounded-3"
                            style={{
                                background: 'rgba(255,255,255,.04)',
                                border: '1px solid rgba(255,255,255,.12)',
                                color: paginaCorrente === totalePagine ? 'rgba(255,255,255,.25)' : '#fff',
                                padding: '6px 14px',
                                fontSize: '.8rem',
                                letterSpacing: '.1em'
                            }}
                            onClick={() => onCambia(paginaCorrente + 1)}
                            disabled={paginaCorrente === totalePagine}
                        >
                            SUCC <FaChevronRight size={10} />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default function CatalogoLibri({
    libri,
    ricerca,
    setRicerca,
    loading,
    error,
    onPrestito,
    isAdmin,
    onElimina
}) {
    const [paginaCorrente, setPaginaCorrente] = useState(1)

    const filtrati = libri.filter(l =>
        (l.titolo || '').toLowerCase().includes(ricerca.toLowerCase()) ||
        (l.autore || '').toLowerCase().includes(ricerca.toLowerCase())
    )

    const totalePagine = Math.ceil(filtrati.length / CARD_PER_PAGINA)

    const libriPagina = filtrati.slice(
        (paginaCorrente - 1) * CARD_PER_PAGINA,
        paginaCorrente * CARD_PER_PAGINA
    )

    // Reset pagina quando cambia la ricerca
    useEffect(() => {
        setPaginaCorrente(1)
    }, [ricerca])

    const cambiaPagina = (num) => {
        setPaginaCorrente(num)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <section className="container py-4 text-white">
            {/* STICKY HEADER + SEARCH */}
            <div
                className="sticky-top bg-black pt-3 pb-3"
                style={{ zIndex: 1020 }}>
                {/* HEADER */}
                <div className="mb-4 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                        <GiBookshelf className="text-white fs-1" />
                        <h2 className="fw-bold m-0">Catalogo Libri</h2>
                    </div>
                    {/* Contatore risultati */}
                    {!loading && filtrati.length > 0 && (
                        <span
                            className="badge rounded-pill px-3 py-2"
                            style={{
                                background: 'rgba(25,135,84,.15)',
                                border: '1px solid rgba(25,135,84,.3)',
                                color: '#6dba96',
                                fontSize: '.75rem',
                                letterSpacing: '.12em',
                                fontFamily: "'DM Mono', monospace"
                            }}
                        >
                            {filtrati.length} {filtrati.length === 1 ? 'LIBRO' : 'LIBRI'}
                        </span>
                    )}
                </div>

                {/* SEARCH WRAPPER */}
                <div className="mb-4 d-flex justify-content-center">
                    <div className="position-relative w-100 w-md-50">
                        <FaSearch
                            className="position-absolute text-white-50"
                            style={{
                                top: '50%',
                                left: '12px',
                                transform: 'translateY(-50%)'
                            }}
                        />
                        <input
                            className="form-control bg-dark text-white border border-secondary ps-5 py-2 rounded-3"
                            value={ricerca}
                            onChange={e => setRicerca(e.target.value)}
                            placeholder="Cerca per titolo o autore..."
                            style={{ maxWidth: '600px' }}
                        />
                    </div>
                </div>
            </div>

            {loading && <Spinner />}
            {error && <p className="text-danger">{error}</p>}

            {!loading && filtrati.length === 0 && (
                <p className="text-white-50 text-center fs-5 mt-5">
                    Nessun libro trovato
                </p>
            )}

            {/* GRID */}
            {!loading && libriPagina.length > 0 && (
                <>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {libriPagina.map(libro => (
                            <div key={libro.id} className="col">
                                <LibroCard
                                    libro={libro}
                                    onPrestito={onPrestito}
                                    isAdmin={isAdmin}
                                    onElimina={onElimina}
                                />
                            </div>
                        ))}
                    </div>

                    <Paginazione
                        paginaCorrente={paginaCorrente}
                        totalePagine={totalePagine}
                        onCambia={cambiaPagina}
                    />
                </>
            )}
        </section>
    )
}