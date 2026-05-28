export default function StatCard({ icon: Icon, valore, label }) {
  return (
    <div className="card bg-black border border-success border-opacity-25 rounded-4 shadow-lg h-100 overflow-hidden">
      <div className="card-body d-flex flex-column justify-content-between p-3">

        {/* TOP */}
        <div className="d-flex justify-content-between align-items-start gap-2">

          {/* TESTO */}
          <div style={{ minWidth: 0, flex: '1 1 0' }}>
            <p
              className="text-secondary mb-1 text-truncate"
              style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.875rem)' }}
            >
              {label}
            </p>

            <h2
              className="fw-bold text-light mb-0"
              style={{
                fontSize: 'clamp(1rem, 5vw, 1.5rem)',
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
                lineHeight: 1.2,
              }}
            >
              {valore}
            </h2>
          </div>

          {/* ICONA */}
          <div
            className="bg-success bg-opacity-10 rounded-3 d-flex justify-content-center align-items-center flex-shrink-0"
            style={{ width: 40, height: 40, minWidth: 40 }}
          >
            <Icon className="text-success" style={{ fontSize: '1.1rem' }} />
          </div>

        </div>

        {/* PROGRESS */}
        <div className="progress bg-dark mt-3" style={{ height: 4 }}>
          <div className="progress-bar bg-success" style={{ width: '70%' }} />
        </div>

      </div>
    </div>
  )
}