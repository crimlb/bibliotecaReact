import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useHomePage } from '../hooks/useHomePage'
import { prestitiAPI } from '../services/api'


import CatalogoLibri from '../components/home/CatalogoLibri'
import ModalPrestito from '../components/home/ModalPrestito'
import Toast from '../components/home/Toast'

export default function HomePage() {
  const { utente } = useAuth()
  const isAdmin = utente?.ruolo === 'admin'

  // tutta la logica API è in un hook
  const {
    libri,
    setLibri,
    prestiti,
    setPrestiti,
    loadingLibri,
    loadingPrestiti,
    erroreLibri,
    errorePrestiti,
     fetchLibri
  } = useHomePage(utente, isAdmin)

  // UI state locale
  const [ricerca, setRicerca] = useState('')
  const [libroSelezionato, setLibroSelezionato] = useState(null)
  const [toast, setToast] = useState(null)

  return (
    <>
    <div className='bg-black'>
      {/* Toast globale */}
      {toast && (
        <Toast
          messaggio={toast.messaggio}
          tipo={toast.tipo}
          onClose={() => setToast(null)}
        />
      )}

      {/* Catalogo libri */}
     <CatalogoLibri
  libri={libri}
  ricerca={ricerca}
  setRicerca={setRicerca}
  loading={loadingLibri}
  error={erroreLibri}
  isAdmin={isAdmin}
  onPrestito={setLibroSelezionato}
  setLibri={setLibri}
  onElimina={(id) => setLibri(prev => prev.filter(l => l.id !== id))}
/>


      {/* Modal prestito */}
      {libroSelezionato && (
  <ModalPrestito
    libro={libroSelezionato}

    onConferma={async (id, data) => {
      try {

        // crea prestito
        const nuovoPrestito = await prestitiAPI.crea(
           id,
           data
        )

        // aggiorna libri
        setLibri(prev =>
          prev.map(l =>
            l.id === id
              ? {
                  ...l,
                  quantita: l.quantita - 1,
                  disponibile: l.quantita - 1 > 0
                }
              : l
          )
        )

        // aggiorna lista prestiti
        setPrestiti(prev => [nuovoPrestito, ...prev])

        // chiude modal
        setLibroSelezionato(null)

        // toast
        setToast({
          messaggio: 'Prestito creato con successo',
          tipo: 'successo'
        })

      } catch (err) {

        setToast({
          messaggio: err.message,
          tipo: 'errore'
        })
      }
    }}

    onAnnulla={() => setLibroSelezionato(null)}
  />
)}
      </div>
    </>
  )
}