require('dotenv').config();


const { Pool } = require('pg');




const pool = new Pool({
    host:     process.env.DB_HOST,      // es. 'localhost'
    port:     process.env.DB_PORT,      // es. 5432 (porta default di PostgreSQL)
    database: process.env.DB_NAME,      // es. 'todoapp'
    user:     process.env.DB_USER,      // es. 'postgres'
    password: process.env.DB_PASSWORD   // es. 'postgres'
});

// Proviamo subito una connessione di test all'avvio del server.
// Questo ci permette di scoprire subito se c'è un problema
// (credenziali errate, database non raggiungibile, ecc.)
// invece di scoprirlo solo quando arriva la prima richiesta.
//
// I tre parametri del callback sono:
//   err     → oggetto Error se qualcosa è andato storto, null altrimenti
//   client  → la connessione concessa dal pool (non la usiamo qui)
//   release → funzione da chiamare per restituire la connessione al pool
pool.connect((err, client, release) => {
    if (err) {
        // Se la connessione fallisce, stampiamo l'errore in console
        console.error('Errore connessione DB: ', err.message);
    } else {
        // Connessione riuscita: 
        // la rilasciamo subito perché non
        // dobbiamo fare nulla
        console.log('Connessione al DB effettuata');
        release();
    }
});

// Esportiamo il pool così gli altri file (todos.js) possono
// usarlo per eseguire query SQL con pool.query(...)
module.exports = pool;
