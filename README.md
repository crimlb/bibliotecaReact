# 📚 Biblioteca — Sistema di Gestione Libreria

> Applicazione web full-stack per la gestione di un catalogo librario e del sistema di prestiti, realizzata con un moderno stack JavaScript e con attenzione all'architettura pulita, al controllo degli accessi basato sui ruoli e a un'interfaccia utente responsive.



## 📸 Screenshot

<img width="1919" height="859" alt="1 loginPage-biblioteca" src="https://github.com/user-attachments/assets/aa4ebec3-27ff-4317-a3ba-24ec9f6c9cee" />
<img width="1917" height="861" alt="2 registerPage" src="https://github.com/user-attachments/assets/00486ef9-d8f8-4aa1-ac8f-934f74734318" />
<img width="1897" height="861" alt="3 HomePageUtente-catalogo" src="https://github.com/user-attachments/assets/184e3712-9741-4e30-b3c6-dc5bbc15c1cb" />
<img width="1919" height="869" alt="4 modalePrestitoLibri" src="https://github.com/user-attachments/assets/86f0708d-50ca-4a97-9b2c-3749ee30579c" />
<img width="1895" height="861" alt="5 dashboardPrestitiUtente1" src="https://github.com/user-attachments/assets/08e4fe1d-6fdf-4192-80cf-ae36f1494f91" />
<img width="1893" height="727" alt="6 dashboardPrestitiUtente2" src="https://github.com/user-attachments/assets/f4d2c96b-17ac-410c-aea2-3aabc77f65b0" />
<img width="1902" height="866" alt="7 dashboardPrestitiUtenti3" src="https://github.com/user-attachments/assets/236c06e6-b780-4009-a8ad-240ebcf672c7" />
<img width="1902" height="870" alt="8 HomePageAdmin-catalogo" src="https://github.com/user-attachments/assets/c111bbe0-eb5c-42f0-902e-52292de1f4b0" />
<img width="1897" height="867" alt="9 dashboardAdmin1" src="https://github.com/user-attachments/assets/6e7b1563-3be7-4a0a-8242-117567dada93" />
<img width="1892" height="865" alt="10 dashboardAdmin2" src="https://github.com/user-attachments/assets/5473d916-19ae-479d-8f36-45109b3ed94e" />

## 🧠 Il Progetto

**Biblioteca** è una piattaforma completa per la gestione di una biblioteca che consente agli utenti di sfogliare il catalogo, richiedere prestiti e consultare il proprio storico. Gli amministratori dispongono di privilegi estesi per gestire il catalogo e monitorare tutti i prestiti attivi nel sistema.

Il progetto è stato sviluppato come esercizio full-stack coprendo l'intero ciclo di sviluppo: progettazione del database, architettura REST, flussi di autenticazione e frontend curato — tutto all'interno di un unico monorepo.



## ✨ Funzionalità Principali

### 👤 Autenticazione e Autorizzazione
- Autenticazione basata su JWT con login e registrazione
- Controllo degli accessi per ruolo: **Utente** e **Admin**
- Route protette sia su frontend che su backend
- Persistenza della sessione tramite `localStorage`

### 📖 Catalogo Libri
- Navigazione completa del catalogo con ricerca in tempo reale (per titolo e autore)
- Monitoraggio della disponibilità con conteggio copie aggiornato
- Vista a griglia paginata (9 libri per pagina)
- Badge di genere e indicatori visivi di disponibilità

### 🔄 Gestione Prestiti
- Gli utenti possono richiedere prestiti sui libri disponibili
- Storico prestiti per utente
- Gli amministratori possono visualizzare e gestire tutti i prestiti attivi

### 🛡️ Pannello Admin
- Aggiunta ed eliminazione di libri dal catalogo
- Visibilità completa su tutti i prestiti e gli utenti
- Route e elementi UI riservati all'amministratore

---

# Stack Tecnologico

# Frontend

|    Tecnologia       |                   Utilizzo                      |
|---------------------|-------------------------------------------------|
| **React**           |    Framework UI con architettura a componenti   |
| **React Router v6** |       Routing lato client e route protette      |
| **Bootstrap 5**     |          Layout responsive e utility CSS        |
| **React Icons**     |               Libreria di icone                 |
| **Context API**     |  Gestione globale dello stato di autenticazione |

# Backend

|     Tecnologia      |                  Utilizzo                       |
|---------------------|-------------------------------------------------|
| **Node.js**         |             Ambiente di runtime                 |
| **Express.js**      |              Server API RESTful                 |
| **PostgreSQL**      |             Database relazionale                |
| **JWT**             |       Token di autenticazione stateless         |
| **bcrypt**          |           Hashing delle password                |


## 🗂️ Struttura del Progetto

```
biblioteca/
│
├── frontend/                          # Applicazione React
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── QuickAction.jsx
│   │   │   │   │   ├── StatCard.jsx
│   │   │   │   │   └── StatsSection.jsx
│   │   │   │   ├── layout/
│   │   │   │   │   └── MainContent.jsx
│   │   │   │   ├── libri/
│   │   │   │   │   ├── FormLibro.jsx
│   │   │   │   │   ├── RigaLibro.jsx
│   │   │   │   │   ├── SearchBar.jsx
│   │   │   │   │   └── TableLibri.jsx
│   │   │   │   └── Toast.jsx
│   │   │   ├── home/
│   │   │   │   ├── CatalogoLibri.jsx
│   │   │   │   ├── LibroCard.jsx
│   │   │   │   ├── ListaPrestiti.jsx
│   │   │   │   ├── ModalPrestito.jsx
│   │   │   │   ├── PrestitoCard.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   └── Toast.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useHomePage.js
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/
│   │   │   ├── AdminPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── PrestitiPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── backend/                           # Server Node.js / Express
    ├── config/
    │   └── db.js
    ├── controller/
    │   ├── libri.controller.js
    │   ├── prestiti.controller.js
    │   └── utente.controller.js
    ├── middleware/
    │   ├── auth.js
    │   ├── errorHandler.js
    │   └── validate.js
    ├── models/
    │   ├── libri.js
    │   ├── prestiti.js
    │   └── utenti.js
    ├── routes/
    │   ├── libri.routes.js
    │   ├── prestiti.routes.js
    │   └── utenti.routes.js
    ├── services/
    │   ├── libri.services.js
    │   ├── prestiti.services.js
    │   └── utenti.services.js
    ├── .env
    ├── .gitignore
    ├── index.js
    └── package.json
```

---

## ⚙️ Installazione e Avvio

### Prerequisiti
- Node.js >= 18
- PostgreSQL >= 14
- npm

### 1. Clona il repository
```bash
git clone  https://github.com/crimlb/bibliotecaReact.git
cd biblioteca
```

### 2. Configura e avvia il backend
```bash
cd backend
cp .env.example .env
```

Modifica `.env` con i tuoi valori:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=biblioteca
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

```bash
npm install
npm run dev
```

### 3. Configura e avvia il frontend
```bash
cd ../frontend
cp .env.example .env
```

Modifica `.env`:
```env
VITE_API_URL=http://localhost:3000
```

```bash
npm install
npm run dev
```

L'app sarà disponibile su `http://localhost:5173`.

---

## 🔌 Riferimento API

### Autenticazione
| Metodo | Endpoint | Descrizione | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Registra un nuovo utente | ❌ |
| `POST` | `/api/auth/login` | Login e ricezione JWT | ❌ |

### Libri
|   Metodo  |      Endpoint     |       Descrizione       |    Auth   |
|-----------|-------------------|-------------------------|-----------|
| `GET`     | `/api/libri`      |  Ottieni tutti i libri  | ✅ Utente |
| `POST`    | `/api/libri`      |    Aggiungi un libro    | ✅ Admin  |
| `PATCH`   | `/api/libri/:id`  |    Modifica un libro    | ✅ Admin  |
| `DELETE`  | `/api/libri/:id`  |     Elimina un libro    | ✅ Admin  |

### Prestiti
| Metodo  |      Endpoint       |           Descrizione         |     Auth   |
|---------|---------------------|-------------------------------|------------|
| `GET`   | `/api/prestiti`-    | Prestiti dell'utente corrente | ✅ Utente  |
| `POST`  | `/api/prestiti`     |      Richiedi un prestito     | ✅ Utente  |
| `GET`   | `/api/prestiti/all` |        Tutti i prestiti       | ✅ Admin   |

### Utenti
| Metodo  |    Endpoint     |      Descrizione      |   Auth   |
|---------|-----------------|-----------------------|----------|
| `GET`   |   `/api/utenti` |      Lista utenti     | ✅ Admin |

---

## 🔐 Controllo Accessi per Ruolo

```
Pubblico          →  Login, Registrazione
Autenticato       →  Sfoglia catalogo, richiedi prestiti, storico personale
Admin             →  Tutto il precedente + gestione catalogo, tutti i prestiti, lista utenti
```

---

## 💡 Cosa ho imparato / Punti tecnici salienti

- Progettato e implementato uno **schema PostgreSQL relazionale** da zero con vincoli di chiave esterna e tracking delle quantità
- Costruito un backend con **architettura a strati** (routes → controller → service → model) per separazione delle responsabilità e manutenibilità
- Sviluppato un **flusso di autenticazione JWT** end-to-end: generazione del token al login, verifica tramite middleware, storage sicuro lato client
- Implementato il **controllo degli accessi per ruolo** sia a livello API (middleware Express) che a livello UI (route protette React)
- Realizzato un **catalogo paginato e ricercabile** con filtro client-side e gestione dello stato tramite React hooks
- Utilizzato il **Context API** di React per la gestione globale dello stato di autenticazione
- Strutturato il progetto come **monorepo** con netta separazione tra frontend e backend



## 👩‍💻 Autrice

**[Cristina Buffone]**
- GitHub: [@crimlb](https://github.com/crimlb)
- LinkedIn: [linkedin.com/in/cristina-buffone-576893316/](https://www.linkedin.com/in/cristina-buffone-576893316/)
- Email: crimlb87@gmail.com



## 📄 Licenza

Questo progetto è a scopo didattico e di portfolio. Non è consentito il riutilizzo del codice senza autorizzazione.
