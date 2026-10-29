import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

export default function Home() {
  const {
    books, filteredBooks, statusFilter, searchQuery, editingBook,
    setStatusFilter, setSearchQuery, setEditingBook,
    addBook, updateBook, deleteBook,
  } = useBooks();

  // Mode edit jika ada buku terpilih, selain itu tambah buku baru
  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
    } else {
      addBook(data);
    }
  };

  const handleDelete = (book) => {
    if (window.confirm(`Hapus "${book.title}" dari daftar?`)) deleteBook(book.id);
  };

  const isFiltered = statusFilter !== 'semua' || searchQuery.trim() !== '';

  return (
    <div className="home">
      <h1>Daftar Buku</h1>
      <p className="page__intro">
        Catat buku yang kamu miliki, sedang kamu baca, atau ingin kamu beli.
      </p>
      <div className="home__grid">
        <aside>
          {/* key memaksa form di-reset saat berpindah antara mode tambah dan edit */}
          <BookForm
            key={editingBook ? editingBook.id : 'new'}
            initialData={editingBook}
            onSubmit={handleSubmit}
            onCancel={() => setEditingBook(null)}
          />
        </aside>
        <section aria-label="Koleksi buku">
          <BookFilter
            status={statusFilter}
            search={searchQuery}
            onStatusChange={setStatusFilter}
            onSearchChange={setSearchQuery}
          />
          <p className="home__count" aria-live="polite">
            Menampilkan {filteredBooks.length} dari {books.length} buku
          </p>
          <BookList
            books={filteredBooks}
            isFiltered={isFiltered}
            onEdit={setEditingBook}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </div>
  );
}
