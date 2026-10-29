import PropTypes from 'prop-types';
import { STATUS_LABELS } from '../../constants';
import './BookItem.css';

// Satu baris buku; warna sisi kiri menandai status (seperti punggung buku)
export default function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className={`book-item book-item--${book.status}`}>
      <div className="book-item__info">
        <h3 className="book-item__title">{book.title}</h3>
        <p className="book-item__author">{book.author}</p>
        <span className={`badge badge--${book.status}`}>{STATUS_LABELS[book.status]}</span>
      </div>
      <div className="book-item__actions">
        <button type="button" className="btn" aria-label={`Edit ${book.title}`} onClick={() => onEdit(book)}>
          Edit
        </button>
        <button type="button" className="btn btn--danger" aria-label={`Hapus ${book.title}`} onClick={() => onDelete(book)}>
          Hapus
        </button>
      </div>
    </li>
  );
}

export const bookShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.keys(STATUS_LABELS)).isRequired,
});

BookItem.propTypes = {
  book: bookShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
