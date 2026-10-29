import PropTypes from 'prop-types';
import BookItem, { bookShape } from '../BookItem/BookItem';
import './BookList.css';

/** Daftar buku dengan tampilan kosong yang memberi arahan ke user. */
export default function BookList({ books, isFiltered = false, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <p className="book-list__empty">
        {isFiltered
          ? 'Tidak ada buku yang cocok. Coba ubah kata kunci atau filter status.'
          : 'Belum ada buku. Isi form tambah buku untuk mencatat buku pertamamu.'}
      </p>
    );
  }
  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  isFiltered: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

