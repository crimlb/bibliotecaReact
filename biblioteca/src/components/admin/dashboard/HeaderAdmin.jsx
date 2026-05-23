import { FaCog } from 'react-icons/fa'

export default function HeaderAdmin() {
  return (
    <div className=" m-1 mb-3 mb-lg-5 px-0 px-sm-2 px-md-3 d-flex row justify-content-center">

      <div className="card bg-black border border-2 border-success border-opacity-75 rounded-4 shadow-lg overflow-hidden" style={{ maxWidth: 700 }}>

        <div className="card-body p-3 p-md-3 p-lg-4">

          <div className="d-flex flex-column align-items-center text-center">

            {/* ICONA */}
            <div
              className="bg-success bg-opacity-10 rounded-4 d-flex justify-content-center align-items-center"
              style={{ width: 60, height: 60, minWidth: 60 }}
            >
              <FaCog className="text-success" style={{ fontSize: 'clamp(1.25rem, 5vw, 1.75rem)' }} />
            </div>

            {/* TESTO */}
            <div style={{ maxWidth: '100%', overflowWrap: 'anywhere' }}>
              <h1
                className="fw-bold mb-2"
                style={{ fontSize: 'clamp(1.25rem, 6vw, 2rem)', lineHeight: 1.2 }}
              >
                Admin Dashboard
              </h1>

              <p
                className="text-secondary mb-0"
                style={{ fontSize: 'clamp(0.8rem, 3vw, 1rem)' }}
              >
                Gestione completa della Biblioteca
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}