import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { GiBookshelf } from "react-icons/gi"

export default function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: '',
    cognome: '',
    email: '',
    password: ''
  })

  const [errore, setErrore] = useState(null)
  const [caricamento, setCaricamento] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrore(null)
    setCaricamento(true)

    try {
      await authAPI.registra(
        form.nome,
        form.cognome,
        form.email,
        form.password
      )

      const token = await authAPI.login(form.email, form.password)
      login(token)

      navigate('/', { replace: true })
    } catch (err) {
      setErrore(err.message)
    } finally {
      setCaricamento(false)
    }
  }

  return (
    <div className="container-fluid min-vh-100 p-0">

      <div className="row g-0 min-vh-100">

        {/* HERO */}
        <div
          className="
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
  "
        >

          {/* ICONA */}
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
        <div
          className="
        col-12
        col-xl-6
        bg-dark
        d-flex
        align-items-center
        justify-content-center
        px-3
        py-4
      "
        >

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
            <div className="text-center mb-4">
              <h2 className="fw-bold">Crea account</h2>

              <p className="text-black opacity-75">
                Registrati per iniziare
              </p>
            </div>

            {/* ERRORE */}
            {errore && (
              <div className="alert alert-danger text-center py-2">
                ⚠️ {errore}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* NOME */}
              <div>
                <label className="form-label mb-0" htmlFor="nome">Nome</label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  className="form-control mb-3"
                  id="nome"
                  placeholder="Inserisci nome"
                  required
                />
              </div>

              {/* COGNOME */}
              <div>
                <label className="form-label mb-0" htmlFor="cognome">Cognome</label>
                <input
                  type="text"
                  name="cognome"
                  value={form.cognome}
                  onChange={handleChange}
                  className="form-control mb-3"
                  id="cognome"
                  placeholder="Inserisci cognome"
                  required
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="form-label mb-0" htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control mb-3"
                  id="email"
                  placeholder="Inserisci email"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="form-label mb-0" htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control"
                  id="password"
                  placeholder="********"
                  required
                />
              </div>

              {/* BUTTON */}
              <div className='d-flex justify-content-center'>
                <button
                  type="submit"
                  className="btn btn-dark w-75 py-2 mt-4 fw-semibold"
                  disabled={caricamento}
                >
                  {caricamento
                    ? 'Registrazione in corso…'
                    : 'Crea account'}
                </button>
              </div>
            </form>

            {/* FOOTER */}
            <p className="text-center mt-3 mb-0">
              Hai già un account?{" "}
              <Link
                to="/login"
                className="text-white fw-semibold"
              >
                Accedi
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  )
}