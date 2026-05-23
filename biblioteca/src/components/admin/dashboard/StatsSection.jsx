import { FaBook, FaBoxes, FaClock } from 'react-icons/fa'
import StatCard from './StatCard'

export default function StatsSection({ stats }) {
  return (
    <div className="row g-2 g-sm-3 align-items-stretch d-flex justify-content-center">

      <div className="col-12 col-sm-5 col-lg-3">
        <StatCard icon={FaBook} valore={stats.libri} label="Libri" />
      </div>

      <div className="col-12 col-sm-5 col-lg-3">
        <StatCard icon={FaBoxes} valore={stats.volumi} label="Volumi" />
      </div>

      <div className="col-12 col-sm-5 col-lg-3">
        <StatCard icon={FaClock} valore={stats.attivi} label="Attivi" />
      </div>

    </div>
  )
}