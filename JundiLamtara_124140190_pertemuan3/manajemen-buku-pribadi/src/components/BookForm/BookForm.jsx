import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

function BookForm({ onAddBook, onUpdateBook, editingBook, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('milik');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setStatus(editingBook.status);
      setErrors({});
    } else {
      setTitle('');
      setAuthor('');
      setStatus('milik');
      setErrors({});
    }
  }, [editingBook]);

  // Validasi kolom wajib isi dan feedback visual
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Judul buku wajib diisi.';
    }
    if (!author.trim()) {
      newErrors.author = 'Nama penulis wajib diisi.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingBook) {
      onUpdateBook({
        ...editingBook,
        title: title.trim(),
        author: author.trim(),
        status,
      });
    } else {
      onAddBook({
        title: title.trim(),
        author: author.trim(),
        status,
      });
    }

    setTitle('');
    setAuthor('');
    setStatus('milik');
    setErrors({});
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h3>{editingBook ? 'Edit Data Buku' : 'Tambah Buku Baru'}</h3>

      <div className="form-group">
        <label htmlFor="book-title">Judul Buku *</label>
        <input
          id="book-title"
          type="text"
          placeholder="Contoh: Clean Code"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors({ ...errors, title: '' });
          }}
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="book-author">Penulis *</label>
        <input
          id="book-author"
          type="text"
          placeholder="Contoh: Robert C. Martin"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
            if (errors.author) setErrors({ ...errors, author: '' });
          }}
          className={errors.author ? 'input-error' : ''}
        />
        {errors.author && <span className="error-text">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="book-status">Status Buku</label>
        <select
          id="book-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="milik">Sudah Dimiliki (Milik)</option>
          <option value="baca">Sedang Dibaca (Baca)</option>
          <option value="beli">Ingin Dibeli (Beli)</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {editingBook && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancelEdit}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onAddBook: PropTypes.func.isRequired,
  onUpdateBook: PropTypes.func.isRequired,
  editingBook: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }),
  onCancelEdit: PropTypes.func.isRequired,
};

BookForm.defaultProps = {
  editingBook: null,
};

export default BookForm;