export default function LibroCard({ libro, onPrestito, isAdmin, onElimina }) {
    const disponibile = libro.quantita > 0;

    return (
        <div
            className={`position-relative h-100 d-flex flex-column overflow-hidden rounded-4 border ${
                disponibile
                    ? 'border-success border-opacity-25'
                    : 'border-secondary border-opacity-25'
            }`}
            style={{
                background: '#0d0d0d',
                minHeight: '480px',
                fontFamily: "'DM Mono', monospace",
                transition: 'all .35s ease',
                boxShadow: disponibile
                    ? '0 20px 45px rgba(25,135,84,.08)'
                    : '0 20px 45px rgba(255,255,255,.03)'
            }}
        >
            {/* bordo luminoso */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                style={{
                    padding: '1px',
                    background: disponibile
                        ? 'linear-gradient(145deg, rgba(25,135,84,.35), transparent, rgba(25,135,84,.08))'
                        : 'linear-gradient(145deg, rgba(255,255,255,.08), transparent, rgba(255,255,255,.03))',
                    WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    pointerEvents: 'none'
                }}
            />

            {/* HEADER — altezza fissa, il testo si adatta dentro */}
            <div
                className="position-relative px-4 pt-4 pb-3 overflow-hidden"
                style={{ height: '210px', flexShrink: 0 }}
            >
                <div
                    className="position-absolute start-50 translate-middle-x rounded-pill"
                    style={{
                        top: '88px',
                        width: '85%',
                        height: '18px',
                        background: disponibile
                            ? 'rgba(40, 157, 103, 0.45)'
                            : 'rgba(134, 223, 188, 0.25)',
                        filter: 'blur(25px)',
                        opacity: 0.7,
                        pointerEvents: 'none',
                        zIndex: 0
                    }}
                />

                <div className="position-relative z-1 h-100 d-flex flex-column">
                    {libro.genere && (
                        <span
                            className={`badge rounded-pill px-3 py-2 border fw-normal ${
                                disponibile
                                    ? 'bg-success bg-opacity-10 text-success border-success border-opacity-25'
                                    : 'bg-secondary bg-opacity-10 text-secondary border-secondary border-opacity-25'
                            }`}
                            style={{ fontSize: '0.8rem', letterSpacing: '.14em', alignSelf: 'flex-start' }}
                        >
                            {libro.genere.toUpperCase()}
                        </span>
                    )}

                    {/* area titolo + autore: occupa lo spazio rimanente e centra verticalmente */}
                    <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center mt-2">
                        <h2
                            className="text-white fw-bold mb-3"
                            style={{
                                fontSize: '2rem',
                                lineHeight: 1.15,
                                fontFamily: "'Playfair Display', serif",
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {libro.titolo}
                        </h2>

                        <div
                            className="d-flex gap-2 justify-content-center"
                            style={{ alignItems: 'flex-start' }}
                        >
                            <div
                                className={`rounded-circle flex-shrink-0 ${
                                    disponibile ? 'bg-success' : 'bg-secondary'
                                }`}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    marginTop: 'calc((1.3 * 1rem - 8px) / 2)'
                                }}
                            />
                            <span
                                className={`${
                                    disponibile
                                        ? 'text-success text-opacity-75'
                                        : 'text-secondary text-opacity-75'
                                }`}
                                style={{
                                    fontSize: '1rem',
                                    letterSpacing: '.08em',
                                    lineHeight: 1.3,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textAlign: 'left'
                                }}
                            >
                                {libro.autore}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* linea — sempre alla stessa posizione */}
            <div
                className="mx-4"
                style={{
                    height: '1px',
                    flexShrink: 0,
                    background: disponibile
                        ? 'linear-gradient(90deg, transparent, rgba(25,135,84,.7), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(108,117,125,.7), transparent)'
                }}
            />

            {/* CONTENUTO */}
            <div className="px-4 py-4 flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                    <div
                        className="rounded-4 p-4 border border-white border-opacity-10"
                        style={{
                            background:
                                'linear-gradient(180deg, rgba(255,255,255,.04) 0%, rgba(255,255,255,.015) 100%)',
                            backdropFilter: 'blur(12px)'
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <div
                                    className="text-white text-opacity-50 mb-2"
                                    style={{ fontSize: '.68rem', letterSpacing: '.18em' }}
                                >
                                    DISPONIBILITÀ
                                </div>
                                <div
                                    className={`fw-semibold ${
                                        disponibile ? 'text-success' : 'text-danger'
                                    }`}
                                    style={{ fontSize: '1rem' }}
                                >
                                    {disponibile
                                        ? 'Disponibile ora'
                                        : 'Momentaneamente non Disponibile'}
                                </div>
                            </div>
                            <div className="text-end">
                                <div
                                    className="text-white text-opacity-50 mb-1"
                                    style={{ fontSize: '.65rem', letterSpacing: '.18em' }}
                                >
                                    COPIE
                                </div>
                                <div
                                    className={`fw-bold ${
                                        disponibile ? 'text-white' : 'text-danger opacity-50'
                                    }`}
                                    style={{ fontSize: '3rem', lineHeight: 1 }}
                                >
                                    {libro.quantita ?? 0}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex gap-2 mt-4">
                        <div
                            className={`rounded-pill ${disponibile ? 'bg-success' : 'bg-secondary'}`}
                            style={{ width: '55px', height: '4px', opacity: 0.85 }}
                        />
                        <div
                            className="rounded-pill bg-white bg-opacity-25"
                            style={{ width: '18px', height: '4px' }}
                        />
                    </div>
                </div>

                {/* FOOTER — ancorato in basso da justify-content-between */}
                <div className="d-flex gap-2 mt-4">
                    <button
                        className={`btn flex-grow-1 rounded-4 py-3 fw-semibold ${
                            disponibile ? 'btn-success' : 'btn-outline-secondary'
                        }`}
                        style={{ letterSpacing: '.14em', fontSize: '.76rem' }}
                        onClick={() => onPrestito(libro)}
                        disabled={!disponibile}
                    >
                        PRESTITO
                    </button>

                    {isAdmin && (
                        <button
                            className="btn btn-outline-danger rounded-4 px-4"
                            onClick={() => onElimina(libro.id)}
                            title="Elimina libro"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1z"/>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}