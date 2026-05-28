# 📚 Biblioteca — Sistema di gestione biblioteca full-stack

Web app full-stack per la gestione di un catalogo librario e sistema di prestiti con ruoli (Utente/Admin), autenticazione JWT e dashboard amministrativa.

**Stack:** React · Node.js · Express · PostgreSQL

---

## 🚀 Demo

- 🌐 Frontend: https://biblioteca-react-nine.vercel.app/login

---

## 📸 Preview

- Login e registrazione utenti
  
<img width="1919" height="859" alt="1 loginPage-biblioteca" src="https://github.com/user-attachments/assets/aa4ebec3-27ff-4317-a3ba-24ec9f6c9cee" />
<img width="1917" height="861" alt="2 registerPage" src="https://github.com/user-attachments/assets/00486ef9-d8f8-4aa1-ac8f-934f74734318" />

- Catalogo libri con ricerca e disponibilità
  
<img width="1897" height="861" alt="3 HomePageUtente-catalogo" src="https://github.com/user-attachments/assets/184e3712-9741-4e30-b3c6-dc5bbc15c1cb" />

- Sistema di prestiti
  
<img width="1919" height="869" alt="4 modalePrestitoLibri" src="https://github.com/user-attachments/assets/86f0708d-50ca-4a97-9b2c-3749ee30579c" />

- Dashboard utente con storico prestiti
  
<img width="1895" height="861" alt="5 dashboardPrestitiUtente1" src="https://github.com/user-attachments/assets/08e4fe1d-6fdf-4192-80cf-ae36f1494f91" />
<img width="1893" height="727" alt="6 dashboardPrestitiUtente2" src="https://github.com/user-attachments/assets/f4d2c96b-17ac-410c-aea2-3aabc77f65b0" />
<img width="1902" height="866" alt="7 dashboardPrestitiUtenti3" src="https://github.com/user-attachments/assets/236c06e6-b780-4009-a8ad-240ebcf672c7" />

- Dashboard admin per gestione catalogo e utenti
  
<img width="1902" height="870" alt="8 HomePageAdmin-catalogo" src="https://github.com/user-attachments/assets/c111bbe0-eb5c-42f0-902e-52292de1f4b0" />
<img width="1897" height="867" alt="9 dashboardAdmin1" src="https://github.com/user-attachments/assets/6e7b1563-3be7-4a0a-8242-117567dada93" />
<img width="1892" height="865" alt="10 dashboardAdmin2" src="https://github.com/user-attachments/assets/5473d916-19ae-479d-8f36-45109b3ed94e" />

---

## 🧠 Overview del progetto

Biblioteca è una piattaforma full-stack per la gestione digitale di una biblioteca.

Il sistema consente agli utenti di:
- registrarsi e autenticarsi
- consultare il catalogo libri
- richiedere prestiti
- visualizzare lo storico personale

Gli amministratori possono invece:
- gestire il catalogo libri (CRUD completo)
- monitorare tutti i prestiti
- gestire gli utenti registrati

Il progetto simula un’applicazione reale con architettura scalabile, autenticazione sicura e separazione delle responsabilità tra frontend e backend.

---

## ✨ Funzionalità principali

### 🔐 Autenticazione & Sicurezza
- Registrazione e login utenti
- Autenticazione JWT
- Hash password con bcrypt
- Protezione route frontend e backend
- Sistema di ruoli (USER / ADMIN)

---

### 📖 Catalogo libri
- Visualizzazione completa catalogo
- Ricerca in tempo reale (titolo / autore)
- Indicatori di disponibilità
- Paginazione lato UI
- Badge per genere

---

### 🔄 Sistema prestiti
- Richiesta prestito libri disponibili
- Storico prestiti per utente
- Aggiornamento automatico disponibilità copie
- Dashboard admin per monitoraggio globale

---

### 🛠 Area Admin
- Creazione, modifica e cancellazione libri
- Visualizzazione utenti registrati
- Gestione completa prestiti attivi
- Interfaccia dedicata e protetta

---

## 🧱 Architettura

```text
Frontend (React)
   ↓
API REST (Express)
   ↓
Service Layer
   ↓
Model Layer (PostgreSQL)
