// ============================================================
// src/api/libri.js — Funzioni di comunicazione con il backend
// ============================================================
// Questo file centralizza tutte le chiamate HTTP verso l'API.
// Ogni funzione corrisponde a un endpoint del backend:
//
//   getlibri()           → GET    /libri
//   createlibro(testo)    → POST   /libri
//   updatelibro(id, flag) → PATCH  /libri/:id
//   deletelibro(id)       → DELETE /libri/:id
//
// Tenere le fetch qui (invece che direttamente in App.jsx)
// ha un vantaggio: se l'URL del backend cambia, lo modifichiamo
// in un solo posto invece che in tutto il progetto.
// ============================================================

// URL base del backend. Tutte le funzioni lo usano come prefisso.
const BASE = 'http://localhost:3000';

function getHeaders(){
    const token =  sessionStorage.getItem('token')
    return{
        'Content-Type' : 'application/json',
        ...(token && { 'Authorization' : `Bearer ${token}`})
    }
}

// ── GET /libri ───────────────────────────────────────────────
// Recupera tutte le task dal database.
// Restituisce una Promise che si risolve con l'array di task.
export async function getLibri() {
    // fetch() fa una richiesta HTTP GET (melibro di default)
    const res = await fetch(`${BASE}/api/libri` , { headers: getHeaders() });

    // res.ok è true se lo status HTTP è tra 200 e 299.
    // Se il server risponde con 500 o 404, lanciamo un errore
    // che verrà catturato dal .catch() in App.jsx.
    if (!res.ok) throw new Error(`ERRORE: ${res.status}`);

    // res.json() legge il corpo della risposta e lo converte
    // da stringa JSON a oggetto/array JavaScript
    return res.json();
}


// ── POST /libri ──────────────────────────────────────────────
// Invia una nuova task al backend per salvarla nel DB.
// Restituisce la task creata (con id e created_at generati dal DB).
export async function createLibro(dati) {
    const res = await fetch(`${BASE}/api/libri/`, {
        method: 'POST',

        // Diciamo al server che stiamo inviando dati in formato JSON
        headers: getHeaders(), //{ 'Content-Type': 'application/json' },

        // JSON.stringify converte l'oggetto JavaScript in stringa JSON
        // { testo } è shorthand per { testo: testo }
        body: JSON.stringify({ titolo:dati.titolo, autore:dati.autore, isbn:dati.isbn, anno_pubblicazione:dati.anno_pubblicazione, quantita:dati.quantita, genere:dati.genere, disponibile:dati.disponibile })
    });


    if (!res.ok) throw new Error(`ERRORE: ${res.status}`);
    return res.json();
}


// ── PATCH /libri/:id ─────────────────────────────────────────
// Aggiorna il campo `completato` di una task specifica.
//   id         → quale task modificare (va nell'URL)
//   completato → nuovo valore booleano (va nel corpo JSON)
export async function updateLibro(id, titolo, autore, isbn, anno_pubblicazione, genere, quantita, disponibile) {
    const res = await fetch(`${BASE}/api/libri/${id}`, {
        method: 'PATCH',
        headers: getHeaders(), //headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titolo, autore, isbn, anno_pubblicazione, genere, quantita, disponibile })
    });

    // const testo = await res.text();

    if (!res.ok) throw new Error(`ERRORE: ${res.status}`);

    // Restituiamo la task aggiornata così App.jsx può
    // aggiornare lo stato locale con i dati reali del DB
    return res.json();
}


// ── DELETE /libri/:id ────────────────────────────────────────
// Elimina una task dal database.
// Non restituisce nulla (il backend risponde con HTTP 204).
export async function deleteLibro(id) {
    const res = await fetch(`${BASE}/api/libri/${id}`, { method: 'DELETE', headers: getHeaders() });

    if (!res.ok) throw new Error(`ERRORE: ${res.status}`);

    // Nessun return: DELETE restituisce 204 No Content,
    // quindi non c'è un corpo JSON da leggere
}
