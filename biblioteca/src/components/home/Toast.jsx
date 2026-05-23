import { useEffect } from 'react'

export default function Toast({ messaggio, tipo = 'successo', onClose }) {

  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div
      className={`custom-toast toast-${tipo}`}
      onClick={onClose}
    >
      <span className="me-2">
        {tipo === 'successo' ? '✅' : '⚠️'}
      </span>

      {messaggio}
    </div>
  )
}