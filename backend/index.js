
// const express = require('express');

const cors = require('cors');

// const libriRoutes = require('./libri');
// const authRoutes = require('./auth');

// require('dotenv').config();

// const app = express();

// const PORT = 3000;



// app.use(express.json());

// app.use('/libri', libriRoutes);
// app.use('/auth', authRoutes)

// app.get('/health', (req, res) => res.json({ status: 'ok' }));

// app.listen(PORT, () => console.log(`SERVER IN ASCOLTO SU http://localhost:${PORT}`));





const express      = require('express');
const errorHandler = require('./middleware/errorHandler');
const helmet       = require('helmet');
const rateLimit    = require('express-rate-limit');

require('dotenv').config(); 


const utenteModel   = require('./models/utenti');
const libriModel    = require('./models/libri');
const prestitiModel = require('./models/prestiti');


const utenteRoutes   = require('./routes/utenti.routes');
const libriRoutes    = require('./routes/libri.routes');
const prestitiRoutes = require('./routes/prestiti.routes');

const app  = express();
const port = process.env.PORT;




const limiterGlobale = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { successo: false, errore: 'Troppe richieste, riprova tra qualche minuto' }
});


app.use(express.json());


app.use(helmet());

app.use(cors({ origin: 'http://localhost:5173' }));


app.use(limiterGlobale);


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend avviato: OK', status: '200' });
});


app.use('/api/utente',   utenteRoutes);
app.use('/api/libri',    libriRoutes);
app.use('/api/prestiti', prestitiRoutes);


app.use((req, res) => {
  res.status(404).json({ successo: false, errore: 'Endpoint non trovato' });
});


app.use(errorHandler);


const start = async () => {
  try {
    await utenteModel.init();
    await libriModel.init();
    await prestitiModel.init();

    console.log('✅ Tabelle sincronizzate');

    app.listen(port, () =>
      console.log(`🚀 Server in ascolto su http://localhost:${port}`)
    );
  } catch (err) {
    console.error('❌ Errore di avvio:', err);
    process.exit(1); // Usciamo con codice errore se qualcosa va storto
  }
};

start();
