// components/admin/libri/FormLibro.jsx

import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const ANNO_CORRENTE = new Date().getFullYear()

const FORM_VUOTO = {
  titolo: '',
  autore: '',
  isbn: '',
  anno_pubblicazione: '',
  genere: '',
  quantita: 1,
}

export default function FormLibro({
  iniziale,
  onSalva,
  onAnnulla
}) {

  const [form, setForm] = useState(iniziale || FORM_VUOTO)
  const [errore, setErrore] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const isModifica = !!iniziale?.id

  const set = (campo, valore) => {
    setForm(prev => ({
      ...prev,
      [campo]: valore
    }))
  }

  function validate(form) {
    const newErrors = {}

    if (!form.titolo.trim()) {
      newErrors.titolo = 'Titolo obbligatorio'
    }

    if (!form.autore.trim()) {
      newErrors.autore = 'Autore obbligatorio'
    }

    if (!form.isbn.trim()) {
      newErrors.isbn = 'ISBN obbligatorio'
    }

    if (!form.anno_pubblicazione) {
      newErrors.anno_pubblicazione = 'Anno obbligatorio'
    } else {
      const anno = parseInt(form.anno_pubblicazione)

      if (isNaN(anno)) {
        newErrors.anno_pubblicazione = 'Anno non valido'
      }

      if (anno > ANNO_CORRENTE) {
        newErrors.anno_pubblicazione = 'Anno non può essere futuro'
      }

      if (anno < 0) {
        newErrors.anno_pubblicazione = 'Anno non valido'
      }
    }

    return newErrors
  }

  const submit = async (e) => {
    e.preventDefault()

    const validationErrors = validate(form)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setErrore(null)
    setLoading(true)

    try {

      const payload = {
        titolo: form.titolo,
        autore: form.autore,

        ...(form.isbn && {
          isbn: form.isbn
        }),

        ...(form.anno_pubblicazione && {
          anno_pubblicazione: parseInt(form.anno_pubblicazione)
        }),

        ...(form.genere && {
          genere: form.genere
        }),

        ...(form.quantita && {
          quantita: parseInt(form.quantita)
        }),

        disponibile: true
      }

      await onSalva(payload)

      if (!isModifica) {
        setForm(FORM_VUOTO)
      }

    } catch (err) {

      setErrore(
        err?.response?.data?.errore ||
        err.message ||
        'Errore'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="text-light">

      {errore && (
        <div className="alert alert-danger">
          {errore}
        </div>
      )}

      <div className="row g-3">

        {/* TITOLO */}
        <div className="col-12 col-lg-6">
          <label className="form-label">Titolo*</label>

          <input
            className={`form-control bg-dark text-light border-success ${errors.titolo ? 'is-invalid' : ''}`}
            value={form.titolo}
            onChange={(e) => set('titolo', e.target.value)}
          />

          {errors.titolo && (
            <div className="invalid-feedback">
              {errors.titolo}
            </div>
          )}
        </div>

        {/* AUTORE */}
        <div className="col-12 col-lg-6">
          <label className="form-label">Autore*</label>

          <input
            className={`form-control bg-dark text-light border-success ${errors.autore ? 'is-invalid' : ''}`}
            value={form.autore}
            onChange={(e) => set('autore', e.target.value)}
          />

          {errors.autore && (
            <div className="invalid-feedback">
              {errors.autore}
            </div>
          )}
        </div>

        {/* ISBN */}
        <div className="col-12 col-md-6">
          <label className="form-label">ISBN*</label>

          <input
            className={`form-control bg-dark text-light border-success ${errors.isbn ? 'is-invalid' : ''}`}
            value={form.isbn}
            onChange={(e) => set('isbn', e.target.value)}
          />

          {errors.isbn && (
            <div className="invalid-feedback">
              {errors.isbn}
            </div>
          )}
        </div>

        {/* ANNO */}
        <div className="col-6 col-md-3">
          <label className="form-label">Anno*</label>

          <input
            type="number"
            className={`form-control bg-dark text-light border-success ${errors.anno_pubblicazione ? 'is-invalid' : ''}`}
            value={form.anno_pubblicazione}
            onChange={(e) => set('anno_pubblicazione', e.target.value)}
            max={ANNO_CORRENTE}
          />

          {errors.anno_pubblicazione && (
            <div className="invalid-feedback">
              {errors.anno_pubblicazione}
            </div>
          )}
        </div>

        {/* QUANTITÀ */}
        <div className="col-6 col-md-3">
          <label className="form-label">Quantità</label>

          <input
            type="number"
            min={1}
            className="form-control bg-dark text-light border-success"
            value={form.quantita}
            onChange={(e) => set('quantita', e.target.value)}
          />
        </div>

        {/* GENERE */}
        <div className="col-12">
          <label className="form-label">Genere</label>

          <input
            className="form-control bg-dark text-light border-success"
            value={form.genere}
            onChange={(e) => set('genere', e.target.value)}
          />
        </div>

      </div>

      {/* BOTTONI */}
      <div className="d-flex justify-content-end gap-2 mt-4">

        {onAnnulla && (
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={onAnnulla}
          >
            Annulla
          </button>
        )}

        <button
          className="btn btn-success"
          disabled={loading}
        >
          <FaPlus className="me-2" />

          {loading
            ? 'Caricamento...'
            : isModifica
              ? 'Salva'
              : 'Aggiungi'}
        </button>

      </div>

    </form>
  )
}