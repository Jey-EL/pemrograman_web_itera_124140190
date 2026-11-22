import React from 'react';
import { useBooks } from '../../context/BookContext';
import './Stats.css';

function Stats() {
  // Mengambil statistik otomatis dari Context (via custom hook useBookStats)
  const { stats, books } = useBooks();

  const calculatePercentage = (count) => {
    if (stats.total === 0) return 0;
    return Math.round((count / stats.total) * 100);
  };

  return (
    <main className="stats-container">
      <div className="stats-header">
        <h2>Ringkasan Koleksi Buku</h2>
        <p>Statistik otomatis berdasarkan status buku yang tercatat di sistem.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <span className="stat-label">Total Buku</span>
          <strong className="stat-value">{stats.total}</strong>
        </div>

        <div className="stat-card milik">
          <span className="stat-label">Sudah Dimiliki</span>
          <strong className="stat-value">{stats.owned}</strong>
          <span className="stat-percent">{calculatePercentage(stats.owned)}%</span>
        </div>

        <div className="stat-card baca">
          <span className="stat-label">Sedang Dibaca</span>
          <strong className="stat-value">{stats.reading}</strong>
          <span className="stat-percent">{calculatePercentage(stats.reading)}%</span>
        </div>

        <div className="stat-card beli">
          <span className="stat-label">Ingin Dibeli</span>
          <strong className="stat-value">{stats.wishlist}</strong>
          <span className="stat-percent">{calculatePercentage(stats.wishlist)}%</span>
        </div>
      </div>

      <div className="recent-section">
        <h3>Daftar Ringkas Buku ({books.length})</h3>
        {books.length === 0 ? (
          <p className="empty-stats-msg">
            Belum ada data buku tersimpan. Silakan tambahkan buku di halaman Koleksi.
          </p>
        ) : (
          <ul className="recent-list">
            {books.map((book) => (
              <li key={book.id}>
                <span>
                  <strong>{book.title}</strong> — {book.author}
                </span>
                <span className={`tag tag-${book.status}`}>{book.status.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default Stats;