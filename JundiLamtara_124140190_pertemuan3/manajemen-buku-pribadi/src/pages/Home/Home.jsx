import React from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import './Home.css';

function Home() {
  // Mengambil state global dan fungsi CRUD buku dari BookContext
  const {
    filteredBooks,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    editingBook,
    setEditingBook,
    addBook,
    updateBook,
    deleteBook,
  } = useBooks();

  return (
    <main className="home-container">
      {/* Form untuk menambah buku baru atau mengedit data buku */}
      <BookForm
        onAddBook={addBook}
        onUpdateBook={updateBook}
        editingBook={editingBook}
        onCancelEdit={() => setEditingBook(null)}
      />

      {/* Komponen filter status dan pencarian */}
      <BookFilter
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Daftar buku yang sudah difilter */}
      <BookList
        books={filteredBooks}
        onEditBook={setEditingBook}
        onDeleteBook={deleteBook}
      />
    </main>
  );
}

export default Home;