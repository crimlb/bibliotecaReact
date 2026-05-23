import LibroCard from "./LibroCard";

function ListaLibri({ libri, onPrestito, isAdmin, onElimina }) {
  if (libri.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted fs-4">Nessun libro da mostrare</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-4 justify-content-center">
        {libri.map((libro) => (
          <div key={libro.id} className="col d-flex justify-content-center">
            <LibroCard
              libro={libro}
              onPrestito={onPrestito}
              isAdmin={isAdmin}
              onElimina={onElimina}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaLibri;