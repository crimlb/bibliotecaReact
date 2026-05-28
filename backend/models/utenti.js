
const pool = require('../config/db');

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS utenti (
    id            SERIAL        PRIMARY KEY,
    nome          VARCHAR(100)  NOT NULL,
    cognome       VARCHAR(255)  NOT NULL,
    email         VARCHAR(255)  UNIQUE NOT NULL,
    password      VARCHAR(255)  NOT NULL,
    ruolo         VARCHAR(20)   NOT NULL DEFAULT 'utente'
                  CHECK (ruolo IN ('admin', 'utente')),

    -- 🔒 FIX #1 — token_version è un contatore intero che viene incluso
    -- nel payload JWT al momento del login. Ad ogni richiesta autenticata,
    -- il middleware verifica che il valore nel token corrisponda a quello
    -- nel database. Se un utente viene eliminato o cambia password,
    -- il contatore viene incrementato (o la riga sparisce), rendendo
    -- immediatamente invalidi tutti i token precedenti.
    token_version INTEGER       NOT NULL DEFAULT 0
  );
`;

const init = () => pool.query(CREATE_TABLE);

const findAll = () =>
    pool.query(
        'SELECT id, nome, cognome, email, ruolo, token_version FROM utenti ORDER BY id'
    );

// Restituisce un singolo utente per id (senza password)
const findById = (id) =>
    pool.query(
        'SELECT id, nome, cognome, email, ruolo, token_version FROM utenti WHERE id = $1',
        [id]
    );

// Restituisce un utente per email — include la password perché serve al login
const findByEmail = (email) =>
    pool.query('SELECT * FROM utenti WHERE email = $1', [email]);

// Inserisce un nuovo utente.
// RETURNING esclude la password dalla risposta.
const create = ({ nome, cognome, email, password, ruolo = 'utente' }) =>
    pool.query(
        `INSERT INTO utenti (nome, cognome, email, password, ruolo)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, nome, cognome, email, ruolo`,
        [nome, cognome, email, password, ruolo]
    );


const update = (id, { nome, cognome, email, ruolo }) =>
    pool.query(
        `UPDATE utenti
    SET nome    = COALESCE($1, nome),
    cognome = COALESCE($2, cognome),
    email   = COALESCE($3, email),
    ruolo   = COALESCE($4, ruolo)
    WHERE id = $5
    RETURNING id, nome, cognome, email, ruolo`,
        [nome, cognome, email, ruolo, id]
    );


const updatePassword = (id, hashedPassword) =>
    pool.query(
    `UPDATE utenti
    SET password  = $1,
    token_version = token_version + 1
    WHERE id = $2
    RETURNING id`,
    [hashedPassword, id]
    );


const remove = (id) =>
    pool.query('DELETE FROM utenti WHERE id = $1 RETURNING id', [id]);

// ── Esportazione ──────────────────────────────────────────────
module.exports = {
    init, findAll, findById, findByEmail,
    create, update, updatePassword, remove
};
