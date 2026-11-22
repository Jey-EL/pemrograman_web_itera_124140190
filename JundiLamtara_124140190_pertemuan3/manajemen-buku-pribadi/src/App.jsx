import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <Router>
      {/* Membungkus seluruh aplikasi dengan BookProvider (Context API) */}
      <BookProvider>
        <div className="app-wrapper">
          <header className="app-header">
            <div className="header-inner">
              <h1>Manajemen Buku Pribadi</h1>
              <nav className="app-nav">
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                >
                  Koleksi Buku
                </NavLink>
                <NavLink
                  to="/stats"
                  className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                >
                  Statistik
                </NavLink>
              </nav>
            </div>
          </header>

          {/* Konfigurasi multi-halaman dengan React Router */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </BookProvider>
    </Router>
  );
}

export default App;