// const express = require('express');

// const router = express.Router();

// const pool = require('./config/db');

// const authMiddleware = require('./middleware')

// router.use(authMiddleware)

// //GET 
// router.get('/', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM libri ORDER BY LOWER(titolo) ASC');
//         res.json(result.rows);

//     } catch (err) {
//         res.status(500).json({ errore: err.message });
//     }
// });


// // POST
// router.post('/', async (req, res) => {
//     const { titolo, autore, isbn, anno_pubblicazione, quantita, genere, disponibile } = req.body;

//     if (!titolo?.trim()) return res.status(400).json({ errore: 'Titolo obbligatorio' });

//     try {
//         const result = await pool.query(
//             `INSERT INTO libri (titolo, autore, isbn, anno_pubblicazione, quantita, genere, disponibile)
//              VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
//             [titolo.trim(), autore, isbn, anno_pubblicazione, quantita, genere, disponibile]
//         );

//         res.status(201).json(result.rows[0]);

//     } catch (err) {
//         res.status(500).json({ errore: err.message });
//     }
// });


// // PATCH 
// router.patch('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { titolo, autore, isbn, anno_pubblicazione, genere, quantita, disponibile } = req.body;

//     try {
//         const result = await pool.query(
//             `UPDATE libri 
//              SET titolo = $1, autore = $2, isbn = $3, anno_pubblicazione = $4,
//                  genere = $5, quantita = $6, disponibile = $7
//              WHERE id = $8 RETURNING *`,
//             [titolo, autore, isbn, anno_pubblicazione, genere, quantita, disponibile, id]
//         );

//         if (result.rowCount === 0) return res.status(404).json({ errore: 'Non trovato' });
//         res.json(result.rows[0]);

//     } catch (err) {
//         res.status(500).json({ errore: err.message });
//     }
// });


// //  DELETE 
// router.delete('/:id', async (req, res) => {
//     try {

//         const result = await pool.query(
//             'DELETE FROM libri WHERE id = $1',
//             [req.params.id]
//         );
//         if (result.rowCount === 0) return res.status(404).json({ errore: 'Non trovato' });
//         res.status(204).end();
//     } catch (err) {
//         res.status(500).json({ errore: err.message });
//     }
// });


// module.exports = router;
















// ============================================================
// models/libri.js — Model della tabella "libri"
//
// Il model si occupa SOLO di comunicare con il database.
// Nessuna logica di business qui: solo query SQL.
// La logica (es. "il libro è disponibile?") appartiene al service.
// ============================================================

const pool = require('../config/db');

// ── Creazione tabella ─────────────────────────────────────────
// Eseguita una volta sola all'avvio (vedi index.js → start()).
// IF NOT EXISTS evita errori se la tabella esiste già.
// quantita CHECK >= 0 impedisce valori negativi a livello database.
// disponibile indica se almeno una copia è disponibile per il prestito.
const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS libri (
    id                  SERIAL       PRIMARY KEY,
    titolo              VARCHAR(255) NOT NULL,
    autore              VARCHAR(255) NOT NULL,
    isbn                VARCHAR(20)  UNIQUE,
    anno_pubblicazione  INTEGER,
    genere              VARCHAR(100),
    quantita            INTEGER NOT NULL DEFAULT 1 CHECK(quantita >= 0),
    disponibile         BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
  );
`;

const init = () => pool.query(CREATE_TABLE);

// ── Query di lettura ──────────────────────────────────────────

// Restituisce tutti i libri in ordine alfabetico per titolo
const findAll = () =>
  pool.query('SELECT * FROM libri ORDER BY titolo');

// Restituisce un singolo libro per id
const findById = (id) =>
  pool.query('SELECT * FROM libri WHERE id = $1', [id]);

// Cerca un libro per codice ISBN (usato per evitare duplicati in fase di inserimento)
const findByIsbn = (isbn) =>
  pool.query('SELECT * FROM libri WHERE isbn = $1', [isbn]);

// ── Query di scrittura ────────────────────────────────────────

// Inserisce un nuovo libro nel catalogo.
// RETURNING * restituisce la riga appena inserita (utile al controller).
const create = ({ titolo, autore, isbn, anno_pubblicazione, genere, quantita, disponibile }) =>
  pool.query(
    `INSERT INTO libri (titolo, autore, isbn, anno_pubblicazione, genere, quantita, disponibile)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [titolo, autore, isbn, anno_pubblicazione, genere, quantita, disponibile]
  );


// Aggiorna i metadati di un libro.
// COALESCE($1, titolo) significa: usa $1 se non è null, altrimenti tieni il valore attuale.
// Questo permette aggiornamenti parziali (PATCH): si manda solo ciò che cambia.
const update = (id, { titolo, autore, isbn, anno_pubblicazione, genere, quantita }) =>
  pool.query(
    `UPDATE libri
     SET titolo             = COALESCE($1, titolo),
         autore             = COALESCE($2, autore),
         isbn               = COALESCE($3, isbn),
         anno_pubblicazione = COALESCE($4, anno_pubblicazione),
         genere             = COALESCE($5, genere),
         quantita             = COALESCE($6, quantita)
     WHERE id = $7
     RETURNING *`,
    [titolo, autore, isbn, anno_pubblicazione, genere, quantita, id]
  );

// ── Gestione disponibilità ────────────────────────────────────

// Decrementa la quantità di 1 quando un libro viene prestato.
// CASE aggiorna anche il flag "disponibile": diventa false se non restano copie.
// ✅ BUG CORRETTO #1 — mancava "return": senza di esso la funzione restituiva
//    undefined invece della Promise, e l'await nel service non funzionava.
const decrementa = (id) =>
  pool.query(
    `UPDATE libri
     SET quantita    = quantita - 1,
         disponibile = CASE WHEN quantita - 1 = 0 THEN false ELSE true END
     WHERE id = $1
     RETURNING *`,
    [id]
  );

// Incrementa la quantità di 1 quando un libro rientra dal prestito.
// Il libro torna disponibile non appena rientra almeno una copia.
// ✅ BUG CORRETTO #1 — stessa correzione: aggiunto "return" implicito
//    usando la forma arrow senza parentesi graffe.
const incrementa = (id) =>
  pool.query(
    `UPDATE libri
     SET quantita    = quantita + 1,
         disponibile = true
     WHERE id = $1
     RETURNING *`,
    [id]
  );

// Elimina un libro dal catalogo per id
const remove = (id) =>
  pool.query('DELETE FROM libri WHERE id = $1 RETURNING id', [id]);

// ── Esportazione ──────────────────────────────────────────────
module.exports = {
  init, findAll, findById, findByIsbn,
  create, update, remove,
  incrementa, decrementa
};

