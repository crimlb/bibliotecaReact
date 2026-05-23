import { useState, useEffect } from 'react';
import {getLibri} from "../api/libri";

const form = {
  titolo: "",
  autore: "",
  isbn: "",
  anno_pubblicazione: "",
  genere: "",
  quantita: "",
  disponibile: false,
};

function getHeaders(){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkB0ZXN0Lml0IiwicnVvbG8iOiJhZG1pbiIsInRva2VuX3ZlcnNpb24iOjMsImlhdCI6MTc3ODM1ODkxOCwiZXhwIjoxNzc4NDQ1MzE4fQ.p88drZA64zGwT6EofwFzvWyHCBKcHg_-NXTpJUP-LcI" //sessionStorage.getItem('token')
    return{
        'Content-Type' : 'application/json',
        ...(token && { 'Authorization' : `Bearer ${token}`})
    }
}



function AggiungiLibro({ onAggiungi, onClose }) {

  const [libro, setLibro] = useState(form);
  const [errore, setErrore] = useState("");
  const [loading, setLoading] = useState(true);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLibro((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrore("");

    if (!libro.titolo || !libro.autore) {
      setErrore("Titolo e autore sono obbligatori.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/libri", {
        method: "POST",
        headers: getHeaders(), //headers: { "Content-Type": "application/json" },
        body: JSON.stringify(libro),
      });
if (res.status === 409) throw new Error(`Libro già presente`);
      if (!res.ok) throw new Error("Errore nella risposta del server");

      const nuovoLibro = await res.json(); // ← il libro con id assegnato dal DB
onAggiungi(nuovoLibro.dati);              // ← aggiorna la lista in App
setLibro(nuovoLibro.dati);
onClose();          
    } catch (err) {
      setErrore("Errore durante l'invio: " + err.message);
    }
  };

  return (
    <form className='formAddLibro' onSubmit={handleSubmit}>
      <input
        type="text"
        name="titolo"
        value={libro.titolo}
        onChange={handleChange}
        placeholder="Titolo*"
      />
      <input
        type="text"
        name="autore"
        value={libro.autore}
        onChange={handleChange}
        placeholder="Autore*"
      />
      <input
        type="text"
        name="isbn"
        value={libro.isbn}
        onChange={handleChange}
        placeholder="ISBN*"
      />
      <input
        type="number"
        name="anno_pubblicazione"
        value={libro.anno_pubblicazione}
        onChange={handleChange}
        placeholder="Anno di pubblicazione"
      />

      <input
        type="number"
        name="quantita"
        value={libro.quantita}
        onChange={handleChange}
        placeholder="Quantità"
        min="0"
      />

      <select className='genereLibro' name="genere" value={libro.genere} onChange={handleChange}>
        <option value="">Seleziona genere</option>
        <option value="romanzo">Romanzo</option>
        <option value="saggistica">Saggistica</option>
        <option value="fantascienza">Fantascienza</option>
        <option value="storico">Storico</option>
        <option value="narrativa">Narrativa</option>
        <option value="poesie">Poesie</option>
      </select>

    <label className="check">
  <input
    type="checkbox"
    name="disponibile"
    checked={libro.disponibile}
    onChange={handleChange}
  />
  Disponibile
</label>

      
      <div className='bottoniForm'>
        <button type="submit">Aggiungi libro</button>
        <button type="button" onClick={() => setLibro(form)}>Reset</button>
      </div>
      {errore && <p className="errore-form">{errore}</p>}
    </form>
  );
}

export default AggiungiLibro;
