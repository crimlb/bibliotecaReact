export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <div
        className="spinner-border text-primary"
        role="status"
        aria-label="Caricamento"
      />
    </div>
  )
}