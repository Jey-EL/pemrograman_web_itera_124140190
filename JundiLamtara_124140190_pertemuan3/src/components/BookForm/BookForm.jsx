import { useState } from 'react';
import PropTypes from 'prop-types';
import { STATUS_LABELS } from '../../constants';
import './BookForm.css';

const EMPTY = { title: '', author: '', status: 'milik' };

// Validasi: judul & penulis wajib diisi (spasi saja dianggap kosong)
export function validate(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = 'Judul buku wajib diisi.';
  if (!values.author.trim()) errors.author = 'Nama penulis wajib diisi.';
  return errors;
}

/**
 * Komponen reusable #2: form tambah / edit buku.
 * Jika `initialData` ada, form berjalan dalam mode edit.
 */
export default function BookForm({ initialData = null, onSubmit, onCancel = () => {} }) {
  const isEdit = Boolean(initialData);
  const [values, setValues] = useState(
    initialData
      ? { title: initialData.title, author: initialData.author, status: initialData.status }
      : EMPTY
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Hapus pesan error begitu user mulai memperbaiki isian
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const found = validate(values)[name];
    if (found) setErrors((prev) => ({ ...prev, [name]: found }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSubmit({ title: values.title.trim(), author: values.author.trim(), status: values.status });
    if (!isEdit) setValues(EMPTY);
  };

  const renderField = (name, label) => (
    <div className={`field${errors[name] ? ' field--error' : ''}`}>
      <label htmlFor={`book-${name}`}>{label}</label>
      <input
        id={`book-${name}`}
        name={name}
        type="text"
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `book-${name}-error` : undefined}
      />
      {errors[name] && (
        <p id={`book-${name}-error`} className="field__error" role="alert">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate aria-label="Form buku">
      <h2>{isEdit ? 'Edit buku' : 'Tambah buku'}</h2>
      {renderField('title', 'Judul')}
      {renderField('author', 'Penulis')}
      <div className="field">
        <label htmlFor="book-status">Status</label>
        <select id="book-status" name="status" value={values.status} onChange={handleChange}>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div className="book-form__actions">
        <button type="submit" className="btn btn--primary">
          {isEdit ? 'Simpan perubahan' : 'Simpan buku'}
        </button>
        {isEdit && (
          <button type="button" className="btn" onClick={onCancel}>Batal</button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.keys(STATUS_LABELS)).isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

