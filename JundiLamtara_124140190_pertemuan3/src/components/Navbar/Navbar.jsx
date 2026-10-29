import { NavLink } from 'react-router-dom';
import './Navbar.css';

// Komponen reusable #1: navigasi antar halaman (React Router)
export default function Navbar() {
  const linkClass = ({ isActive }) => (isActive ? 'navbar__link is-active' : 'navbar__link');
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <span className="navbar__brand">Rak Buku Pribadi</span>
        <nav aria-label="Navigasi utama">
          <NavLink to="/" end className={linkClass}>Daftar Buku</NavLink>
          <NavLink to="/stats" className={linkClass}>Statistik</NavLink>
        </nav>
      </div>
    </header>
  );
}
