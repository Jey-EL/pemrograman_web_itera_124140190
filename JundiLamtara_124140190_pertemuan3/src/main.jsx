import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { BookProvider } from './context/BookContext.jsx';
import './index.css';

// HashRouter dipilih agar routing tetap jalan di GitHub Pages tanpa konfigurasi server
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <BookProvider>
        <App />
      </BookProvider>
    </HashRouter>
  </StrictMode>
);
