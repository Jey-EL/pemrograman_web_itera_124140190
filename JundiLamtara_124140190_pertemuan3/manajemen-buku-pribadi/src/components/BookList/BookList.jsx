import React from 'react';
import PropTypes from 'prop-types';
import './BookList.css';

const STATUS_LABELS = {
  milik: { text: 'Milik', className: 'badge-milik' },
  baca: { text: 'Sedang Dibaca', className: 'badge-baca' },
  beli: { text: 'Ingin Dibeli', className: 'badge-beli' },
};

function BookList({ books, onEditBook, onDeleteBook }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>Tidak ada buku yang ditemukan. Tambahkan buku baru atau ubah kata kunci pencarian.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => {
        const badge = STATUS_LABELS[book.status] || STATUS_LABELS.milik;
        return (
          <div key={book.id} className="book-card">
            <div className="book-info">
              <div className="book-header">
                <h4>{book.title}</h4>
                <span className={`status-badge ${badge.className}`}>
                  {badge.text}
                </span>
              </div>
              <p className="book-author">Penulis: {book.author}</p>
            </div>

            <div className="book-actions">
              <button
                type="button"
                className="btn-edit"
                onClick={() => onEditBook(book)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn-delete"
                onClick={() => onDeleteBook(book.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    })
  ).isRequired,
  onEditBook: PropTypes.func.isRequired,
  onDeleteBook: PropTypes.func.isRequired,
};

export default BookList;