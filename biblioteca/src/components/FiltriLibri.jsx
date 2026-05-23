
function FiltriLibri({ filtroAttivo, onCambiaFiltro }) {

  const filtri = ['tutti', 'disponibili' , 'terminati'];

  return (
    <>
      <div className="filtri-libri">

        {filtri.map(filtro => (
          <button
            key={filtro}
            onClick={() => onCambiaFiltro(filtro)}
            className={filtroAttivo === filtro ? 'attivo' : ''}
          >
            {filtro}
          </button>
        ))}

      </div>
    </>
  );
}

export default FiltriLibri;
