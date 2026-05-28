import { FaSearch } from 'react-icons/fa'

export default function SearchBar({ ricerca, setRicerca }) {
  return (
    <div className="position-relative w-100">
      <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-success" style={{ pointerEvents: 'none' }} />
      <input
        className="form-control bg-dark border-success text-light ps-5 rounded-4 w-100"
        placeholder="Cerca titolo o autore..."
        value={ricerca}
        onChange={e => setRicerca(e.target.value)}
      />
    </div>
  )
}