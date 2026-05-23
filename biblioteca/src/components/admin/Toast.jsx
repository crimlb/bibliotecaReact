import { useEffect } from 'react'

export default function Toast({ messaggio, tipo, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3500)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
   className={`position-fixed top-0 start-50 translate-middle-x mt-4 alert ${
  tipo === 'successo'
    ? 'alert-success border-success'
    : 'alert-danger border-danger'
} shadow-lg`}
      style={{ minWidth: '300px', zIndex: 9999, cursor: 'pointer' }}
      onClick={onClose}
    >
      {messaggio}
    </div>
  )
}