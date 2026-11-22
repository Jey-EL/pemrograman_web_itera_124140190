import React from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';

function BookFilter({
  filterStatus,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="book-filter">
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari judul buku atau nama penulis..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Pencarian buku"
        />
      </div>

      <div className="status-tabs">
        {[
          { value: 'semua', label: 'Semua' },
          { value: 'milik', label: 'Milik' },
          { value: 'baca', label: 'Sedang Dibaca' },
          { value: 'beli', label: 'Ingin Dibeli' },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={`filter-btn ${filterStatus === tab.value ? 'active' : ''}`}
            onClick={() => onFilterChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  filterStatus: PropTypes.oneOf(['semua', 'milik', 'baca', 'beli']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default BookFilter;