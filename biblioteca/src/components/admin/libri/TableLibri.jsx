import SearchBar from './SearchBar'
import RigaLibro from './RigaLibro'

export default function TableLibri({
  libri,
  ricerca,
  setRicerca,
  onModifica,
  onElimina,
  onIncrementa,
  onDecrementa,
  loadingCopieId,
  selectedLibroId,
setSelectedLibroId
}) {
  const filtered = libri.filter(l =>
    l.titolo?.toLowerCase().includes(ricerca.toLowerCase()) ||
    l.autore?.toLowerCase().includes(ricerca.toLowerCase())
  )

  return (
    <div className="card bg-black border border-success border-opacity-25 rounded-4 shadow-lg overflow-hidden">
      <div className="card-body p-3 p-md-4">

        {/* HEADER */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-3 mb-md-4">
          <div>
            <h3 className="fw-bold text-success mb-1" style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)' }}>
              Catalogo libri
            </h3>
            <p className="text-secondary mb-0 small">{filtered.length} risultati</p>
          </div>
          <div className="w-100 w-sm-auto" style={{ maxWidth: 320 }}>
            <SearchBar ricerca={ricerca} setRicerca={setRicerca} />
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-dark align-middle mb-0">
            <thead>
              <tr className="border-bottom border-success border-opacity-25">
                {/* freccia expand */}
                <th style={{ width: 32 }} />
                <th className="py-3">Titolo</th>
                <th className="py-3 d-none d-sm-table-cell">Autore</th>
                <th className="py-3 d-none d-md-table-cell">ISBN</th>
                <th className="py-3 text-center d-none d-md-table-cell">Anno</th>
                <th className="py-3 text-center d-none d-sm-table-cell">Qtà</th>
                <th className="py-3 text-center">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map(l => (


                  <RigaLibro
                    key={l.id}
                    libro={l}
                    selectedLibroId={selectedLibroId}
                    onModifica={onModifica}
                    onElimina={onElimina}
                    onIncrementa={onIncrementa}
                    onDecrementa={onDecrementa}
                    loadingCopieId={loadingCopieId === l.id}
                  />


                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-secondary">
                    Nessun libro trovato
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}