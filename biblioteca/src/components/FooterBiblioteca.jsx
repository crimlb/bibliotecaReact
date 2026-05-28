import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import {
  FaClock,
  FaMapMarkerAlt,
  FaChevronRight,
  FaBookOpen,
  FaInfoCircle,
  FaEnvelope,
  FaPhoneAlt
} from 'react-icons/fa'

import { GrUserAdmin } from 'react-icons/gr'

export default function Footer() {
  const { utente } = useAuth()

  return (
  <footer
  className="bg-success border-top border-3 border-dark mt-auto pt-4"
  style={{
    boxShadow: `
      inset 0 8px 18px rgba(0,0,0,0.35)
    `
  }}
>

      <div className="container-fluid py-3 px-lg-5">

        <div className="row gy-4">

          {/* BRAND */}
          <div className="col-lg-3 col-md-6">

            <div className="d-flex align-items-center gap-2 mb-2">

              <div>
                <h5 className="fw-bold text-black mb-0">
                  Biblioteca
                </h5>

                <small className="text-black-50">
                  Dashboard prestiti
                </small>
              </div>

            </div>

            <small className="text-black">
              Sistema digitale per gestione catalogo e prestiti.
            </small>

          </div>

          {/* NAVIGAZIONE */}
          <div className="col-lg-3 col-md-6">

            <h6 className="fw-bold text-black mb-2 text-uppercase">
              Navigazione
            </h6>

            <div className="d-flex flex-column gap-1">

              <NavLink
                to="/"
                className="nav-link text-black d-flex align-items-center gap-2 p-0 small"
              >
                <FaChevronRight />
                <FaBookOpen />
                Catalogo
              </NavLink>

              <NavLink
                to="/prestiti"
                className="nav-link text-black d-flex align-items-center gap-2 p-0 small"
              >
                <FaChevronRight />
                <FaInfoCircle />
                Prestiti
              </NavLink>

              {utente?.ruolo === 'admin' && (
                <NavLink
                  to="/admin"
                  className="nav-link text-black d-flex align-items-center gap-2 p-0 small"
                >
                  <FaChevronRight />
                  <GrUserAdmin />
                  Admin
                </NavLink>
              )}

            </div>

          </div>

          {/* CONTATTI */}
          <div className="col-lg-3 col-md-6">

            <h6 className="fw-bold text-black mb-2 text-uppercase">
              Contatti
            </h6>

            <div className="d-flex flex-column gap-2 small text-black">

              <div className="d-flex align-items-center gap-2">
                <FaMapMarkerAlt />
                Via della Conoscenza 12
              </div>

              <div className="d-flex align-items-center gap-2">
                <FaClock />
                Lun - Ven · 09:00 - 18:00
              </div>

              <div className="d-flex align-items-center gap-2">
                <FaEnvelope />
                assistenza@biblioteca.it
              </div>

            </div>

          </div>

          {/* SUPPORTO */}
          <div className="col-lg-3 col-md-6">

            <h6 className="fw-bold text-black mb-2 text-uppercase">
              Supporto
            </h6>

            <div className="d-flex flex-column gap-2 small text-black">

              <div className="d-flex align-items-center gap-2">
                <FaPhoneAlt />
                +39 06 12345678
              </div>

              <div className="small text-black-50">
                Assistenza disponibile durante gli orari di apertura.
              </div>

              <div className="mt-1 text-black">
                <span className="fw-semibold">
                  Utente:
                </span>{' '}
                {utente?.email}
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="position-relative mt-3 pt-3 text-center">
<div
  style={{
    position: 'absolute',
    top: 0,
    width: '99%',
    height: '1px',
    background:
      'linear-gradient(to right, transparent, rgba(0,0,0,0.6), rgba(0,0,0,0.9), rgba(0,0,0,0.6), transparent)'
  }}
/>
          <small className="text-black-50">
            Biblioteca Dashboard © 2026 · Tutti i diritti riservati
          </small>

        </div>

      </div>

    </footer>
  )
}