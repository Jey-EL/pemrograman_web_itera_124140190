import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <Header
        title="404 - Halaman Tidak Ditemukan"
        description="Alamat yang Anda tuju tidak tersedia"
      />

      <main className="container">
        <div className="not-found-content">
          <h2>404</h2>
          <p>
            Maaf, halaman yang Anda cari tidak ditemukan atau sudah dipindahkan.
          </p>
          <Link to="/" className="not-found-link">Kembali ke Beranda</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;