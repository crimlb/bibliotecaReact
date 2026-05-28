import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { GiBookshelf } from "react-icons/gi"

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const destinazione = location.state?.from?.pathname || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errore, setErrore] = useState(null)
  const [caricamento, setCaricamento] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrore(null)
    setCaricamento(true)

    try {
      const token = await authAPI.login(form.email, form.password)
      login(token)
      navigate(destinazione, { replace: true })
    } catch (err) {
      setErrore(err.message)
    } finally {
      setCaricamento(false)
    }
  }

  return (
    <div className="container-fluid min-vh-100 p-0">
      <div className="row g-0 min-vh-100">

        {/* SINISTRA - HERO */}
        <div className="
    col-12
    col-xl-6
    bg-success
    bg-gradient
    text-black
    d-flex
    flex-column
    align-items-center
    justify-content-center
    text-center
    py-4
    px-4
  "
        >
          <GiBookshelf
            className="
           fs-1
           d-xl-none
           "
          />

          <GiBookshelf
            className="
      display-1
      mb-4
      d-none
      d-xl-block
    "
          />
          {/* TITOLO */}
          <h1
            className="
      fw-bold
      fs-1
      d-xl-none
    "
          >
            Biblioteca
          </h1>

          <h1
            className="
      display-1
      fw-bold
      d-none
      d-xl-block
    "
          >
            Biblioteca
          </h1>

          {/* PARAGRAFO */}
          <p
            className="
      text-black
      opacity-75
      fs-6
      mb-0
      d-xl-none
    "
          >
            Crea un account per accedere alla gestione libri
          </p>

          <p
            className="
      text-black
      opacity-75
      fs-3
      mt-2
      d-none
      d-xl-block
    "
          >
            Crea un account per accedere alla gestione libri
          </p>

        </div>


        {/* FORM */}
   <div className="col-12 col-xl-6 bg-dark d-flex align-items-center justify-content-center px-4 px-sm-5 py-4">

    <div
  className="
    w-100
    bg-success
    bg-opacity-75
    rounded-4
    shadow
    text-black
    p-4
    mx-auto
  "
  style={{
    width: '100%',
    maxWidth: 'clamp(420px, 45vw, 620px)',
    backdropFilter: 'blur(10px)'
  }}
>

            {/* HEADER */}
            <div className="text-center mb-2">
              <h2 className="fw-bold">Accedi</h2>
            </div>

            {/* ERRORE */}
            {errore && (
              <div className="alert alert-danger text-center py-2">
                ⚠️ {errore}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <div>
                <label className="form-label" htmlFor="email">Email</label>
                 <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Inserisci email"
                  className="form-control mb-2"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div>       
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="form-control"
                  required
                />
              </div>

              {/* CHECKBOX */}
              <div className="form-check mt-2 mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                />
                <label className="form-check-label text-white" htmlFor="remember">
                  Ricordami
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="btn btn-dark w-100 py-2 fw-semibold"
                disabled={caricamento}
              >
                {caricamento ? 'Accesso in corso…' : 'Accedi'}
              </button>

            </form>

            {/* REGISTER */}
            <p className="text-center mt-3 mb-0">
              Non hai un account?{" "}
              <Link to="/register" className="text-white fw-semibold">
                Registrati
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  )
}