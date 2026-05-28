import { useEffect } from 'react'

export default function Toast({ messaggio, tipo, onClose }) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3500)

    return () => clearTimeout(timer)
  }, [onClose])

   return (
    <>
      {/* BACKDROP soft */}
      {/* <div
        className="modal-backdrop fade show"
        onClick={onClose}
        style={{ opacity: 0.25 }}
      /> */}

      {/* TOAST CARD */}
      <div
        className="position-fixed top-50 start-50 translate-middle shadow-lg rounded-4 overflow-hidden"
        style={{
          minWidth: '380px',
          zIndex: 99999,
          cursor: 'pointer'
        }}
        onClick={onClose}
      >
        {/* HEADER COLORATO stile Bootstrap */}
        <div
          className={`px-3 py-2 text-white fw-semibold ${
            tipo === 'successo' ? 'bg-success' : 'bg-danger'
          }`}
          style={{ letterSpacing: '.3px' }}
        >
          {tipo === 'successo' ? 'Operazione completata' : 'Attenzione'}
        </div>

        {/* BODY */}
        <div className="bg-white px-4 py-4 fs-6 text-dark">
          {messaggio}
        </div>

        {/* FOOTER piccolo hint */}
        <div className="bg-light px-3 py-2 text-muted small text-end">
          chiudi
        </div>
      </div>
    </>
  )
}