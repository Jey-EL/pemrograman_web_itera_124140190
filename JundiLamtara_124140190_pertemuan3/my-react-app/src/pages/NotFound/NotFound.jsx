import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '4rem', color: '#0284c7', marginBottom: '0.5rem' }}>404</h1>
      <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>Halaman Tidak Ditemukan</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
        Maaf, halaman yang Anda cari tidak tersedia atau alamat URL salah.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '0.65rem 1.25rem',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}

export default NotFound;