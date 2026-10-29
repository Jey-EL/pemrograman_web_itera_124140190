import { Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import { STATUS_LABELS } from '../../constants';
import './Stats.css';

export default function Stats() {
  const { books } = useBooks();
  const { total, counts, percents } = useBookStats(books);

  return (
    <div className="stats">
      <h1>Statistik Koleksi</h1>
      <p className="page__intro">Ringkasan buku berdasarkan statusnya.</p>
      {total === 0 ? (
        <p className="stats__empty">
          Belum ada data. <Link to="/">Tambah buku</Link> untuk melihat statistik.
        </p>
      ) : (
        <>
          <p className="stats__total" data-testid="stats-total">
            <strong>{total}</strong> buku tercatat
          </p>
          <ul className="stats__list">
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <li key={key} className="stats__row">
                <div className="stats__label">
                  <span>{label}</span>
                  <span>{counts[key]} buku ({percents[key]}%)</span>
                </div>
                <div className="stats__bar" role="presentation">
                  <div className={`stats__fill stats__fill--${key}`} style={{ width: `${percents[key]}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
