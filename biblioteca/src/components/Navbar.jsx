import { NavLink, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { GiBookshelf } from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";

export default function Navbar() {
  const { utente, logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav
      className="navbar navbar-expand-lg bg-success border border-3 border-dark rounded-0"
      style={{
        boxShadow: `
          inset 0 2px 12px rgba(0,0,0,0.35),
          inset 0 -2px 12px rgba(0,0,0,0.25)
        `
      }}
    >
      <div className="container-fluid">
        <div className="w-100 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">

            <div className='navbar-brand d-flex align-items-center m-0'>

              <GiBookshelf className="display-1 mb-2 mb-md-3 text-black" />


              <NavLink to="/" className="navbar-title display-3 fw-bold text-decoration-none text-black">
                Biblioteca
              </NavLink>

            </div>

            <ul className="navbar-nav ms-4 d-none d-lg-flex flex-row align-items-center gap-3">

              <li className='nav-item'>
                <NavLink
                  to="/"
                  className={`nav-link ${isActive('/')
                      ? 'active text-black'
                      : 'text-black-50'
                    }`}
                  style={{ fontSize: '2.2rem' }}
                >
                  Catalogo
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink
                  to="/prestiti"
                  className={`nav-link ${isActive('/prestiti')
                      ? 'active text-black'
                      : 'text-black-50'
                    }`}
                  style={{ fontSize: '2.2rem' }}
                >
                  Prestiti
                </NavLink>
              </li>
            </ul>
          </div>
          <button
            className="navbar-toggler border border-dark border-2 shadow-sm"
            style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample09"
            aria-controls="navbarsExample09"
            aria-expanded="false"
            aria-label="Toggle navigation">

            <span className="navbar-toggler-icon"></span>
          </button>

        </div>


        <div className='collapse navbar-collapse mt-3'
          id='navbarsExample09'>

          <div className="d-flex d-lg-none flex-column align-items-center text-center w-100">

            <ul className="navbar-nav d-flex flex-column align-items-center mb-2">

              <li className='nav-item'>
                <NavLink

                  to="/"
                  className={`nav-link fs-3 ${isActive('/')
                    ? 'active text-black'
                    : 'text-black-50'
                    }`}
                >
                  Catalogo
                </NavLink>
              </li>

              <li className='nav-item'>
                <NavLink
                  to="/prestiti"
                  className={`nav-link fs-3 ${isActive('/prestiti')
                    ? 'active text-black'
                    : 'text-black-50'
                    }`}
                >
                  Prestiti
                </NavLink>
              </li>
            </ul>

            {/* Colonna destra: email sopra, Admin+Esci sotto */}
            <div className="d-flex flex-column align-items-end gap-1 mx-3">

              <span className="user-email user-info fs-4 m-0 text-black">
                {utente?.email}
              </span>

              <div className="d-flex align-items-center gap-3">
                {utente?.ruolo === 'admin' && (
                  <NavLink
                    to="/admin"
                    className={`nav-link d-flex align-items-center gap-2 p-0 ${isActive('/admin') ? 'active text-black' : 'text-black-50'}`}
                  >
                    <span className="fs-3 text-black">Admin</span>
                    <GrUserAdmin className="fs-3 text-black" />
                  </NavLink>
                )}

                <button
                  type="button"
                  className="btn btn-outline-dark fs-5"
                  onClick={logout}
                >
                  Esci
                </button>
              </div>
            </div>
          </div>


          {/* Colonna destra desktop */}
          <div className="d-flex flex-column align-items-end gap-1 mx-3">

            <span className="user-email user-info fs-4 m-0 text-black d-none d-lg-inline">
              {utente?.email}
            </span>

            <div className="d-flex align-items-center gap-3">

              {utente?.ruolo === 'admin' && (
                <NavLink
                  to="/admin"
                  className={`nav-link d-flex align-items-center gap-2 p-0 ${isActive('/admin')
                    ? 'active text-black'
                    : 'text-black-50'
                    }`}
                >
                  <span className="fs-3 text-black d-none d-lg-inline">Admin</span>

                  <GrUserAdmin className="fs-3 text-black d-none d-lg-inline" />
                </NavLink>
              )}

              <button
                type="button"
                className="btn btn-outline-dark fs-5 d-none d-lg-inline"
                onClick={logout}
              >
                Esci
              </button>

            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}