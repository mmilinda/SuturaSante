import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Enregistrement du Service Worker PWA (Offline-First DPGA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('[Sutura PWA] Service Worker actif (Mode Hors-Ligne Prêt) :', reg.scope);
      })
      .catch((err) => {
        console.debug('[Sutura PWA] Service Worker info:', err);
      });
  });
}

