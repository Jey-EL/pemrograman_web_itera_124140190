import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';

function NotFound() {
  return (
    <section>
      <h1>Halaman tidak ditemukan</h1>
      <p>
        Alamat yang kamu buka tidak ada. <Link to="/">Kembali ke daftar buku</Link>
      </p>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
