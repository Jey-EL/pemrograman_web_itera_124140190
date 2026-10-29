import PropTypes from 'prop-types';
import { STATUS_LABELS } from '../../constants';
import './BookFilter.css';

const OPTIONS = { semua: 'Semua', ...STATUS_LABELS };

/** Komponen reusable #3: filter status + kolom pencarian judul/penulis. */
export default function BookFilter({ status, search, onStatusChange, onSearchChange }) {
  return (
    <div className="book-filter">
      <div className="book-filter__search">
        <label htmlFor="book-search">Cari judul atau penulis</label>
        <input
          id="book-search"
          type="search"
          value={search}
          placeholder="Ketik untuk mencari…"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div role="group" aria-label="Filter status" className="book-filter__tabs">
        {Object.entries(OPTIONS).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`book-filter__tab${status === value ? ' is-active' : ''}`}
            aria-pressed={status === value}
            onClick={() => onStatusChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  status: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
