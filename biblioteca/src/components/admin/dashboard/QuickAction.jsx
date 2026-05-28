import {
    FaBolt,
    FaChartLine,
    FaBook,
    FaClock
} from 'react-icons/fa'
export default function QuickActions({
    libri,
    prestiti,
    ritardi
}) {
    return (
        <div className="card bg-black border border-success border-opacity-25
rounded-4 shadow-lg h-100">
            <div className="card-body p-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <FaBolt className="text-success fs-3" />
                    <div>
                        <h4 className="fw-bold mb-0 text-white">
                            Attività
                        </h4>
                        <p className="text-secondary mb-0">
                            Panoramica rapida
                        </p>
                    </div>
                </div>

            <div className="d-flex flex-column gap-3">

  <div className="bg-dark rounded-4 p-3 border border-success border-opacity-10">
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <FaBook className="text-success" />
        <span className="text-light">Libri catalogati</span>
      </div>
      <span className="badge bg-success rounded-pill px-3 py-2">
        {libri}
      </span>
    </div>
  </div>

  <div className="bg-dark rounded-4 p-3 border border-success border-opacity-10">
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <FaClock className="text-warning" />
        <span className="text-light">Prestiti attivi</span>
      </div>
      <span className="badge bg-warning text-dark rounded-pill px-3 py-2">
        {prestiti}
      </span>
    </div>
  </div>

  <div className="bg-dark rounded-4 p-4 text-center border border-success border-opacity-10 mt-2">
    <FaChartLine className="text-success fs-1 mb-3" />
    <h5 className="fw-bold text-light">
      Biblioteca in crescita
    </h5>
    <p className="text-secondary mb-0">
      {ritardi === 0
        ? 'Nessun ritardo attivo'
        : `${ritardi} prestiti in ritardo`}
    </p>
  </div>

</div>

            </div>
        </div>
    )
}

