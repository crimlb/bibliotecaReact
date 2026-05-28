// ============================================================
// main.jsx — Punto di ingresso dell'applicazione React
// ============================================================
// Questo è il primo file che viene eseguito quando il browser
// carica l'app. Il suo unico compito è "montare" React
// sull'elemento HTML con id="root" definito in index.html.
// ============================================================

// StrictMode è un wrapper speciale di React che, solo in
// sviluppo, attiva controlli extra e avvisi utili.
// Non aggiunge nulla all'interfaccia visibile.

// import { StrictMode } from 'react';


import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
