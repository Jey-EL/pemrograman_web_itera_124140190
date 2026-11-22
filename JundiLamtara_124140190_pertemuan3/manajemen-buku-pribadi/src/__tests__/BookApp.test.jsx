import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import App from '../App';

describe('Aplikasi Manajemen Buku Pribadi', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('1. Menampilkan pesan error validasi jika form disubmit dalam keadaan kosong', () => {
    render(<App />);

    const submitButton = screen.getByRole('button', { name: /Tambah Buku/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Judul buku wajib diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/Nama penulis wajib diisi/i)).toBeInTheDocument();
  });

  test('2. Menambahkan buku baru dan menampilkannya di daftar buku', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'Clean Code' },
    });
    fireEvent.change(screen.getByLabelText(/Penulis/i), {
      target: { value: 'Robert C. Martin' },
    });
    fireEvent.change(screen.getByLabelText(/Status Buku/i), {
      target: { value: 'milik' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    expect(screen.getByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText(/Penulis: Robert C. Martin/i)).toBeInTheDocument();
  });

  test('3. Mengedit data buku yang sudah ada', () => {
    render(<App />);

    // Tambah buku terlebih dahulu
    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'Atomic Habits' },
    });
    fireEvent.change(screen.getByLabelText(/Penulis/i), {
      target: { value: 'James Clear' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    // Klik tombol Edit
    fireEvent.click(screen.getByRole('button', { name: /^Edit$/i }));

    // Ubah judul lalu simpan
    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'Atomic Habits (Edisi Revisi)' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Simpan Perubahan/i }));

    expect(screen.getByText('Atomic Habits (Edisi Revisi)')).toBeInTheDocument();
    expect(screen.queryByText(/^Atomic Habits$/)).not.toBeInTheDocument();
  });

  test('4. Menghapus buku dari daftar', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'The Pragmatic Programmer' },
    });
    fireEvent.change(screen.getByLabelText(/Penulis/i), {
      target: { value: 'Andrew Hunt' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    expect(screen.getByText('The Pragmatic Programmer')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^Hapus$/i }));

    expect(screen.queryByText('The Pragmatic Programmer')).not.toBeInTheDocument();
  });

  test('5. Memfilter buku berdasarkan status (Milik, Sedang Dibaca, Ingin Dibeli)', () => {
    render(<App />);

    // Buku 1: Milik
    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'Buku Milik Saya' },
    });
    fireEvent.change(screen.getByLabelText(/Penulis/i), {
      target: { value: 'Penulis A' },
    });
    fireEvent.change(screen.getByLabelText(/Status Buku/i), {
      target: { value: 'milik' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    // Buku 2: Ingin Dibeli
    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'Buku Wishlist' },
    });
    fireEvent.change(screen.getByLabelText(/Penulis/i), {
      target: { value: 'Penulis B' },
    });
    fireEvent.change(screen.getByLabelText(/Status Buku/i), {
      target: { value: 'beli' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    // Klik filter "Ingin Dibeli"
    fireEvent.click(screen.getByRole('button', { name: /Ingin Dibeli/i }));

    expect(screen.getByText('Buku Wishlist')).toBeInTheDocument();
    expect(screen.queryByText('Buku Milik Saya')).not.toBeInTheDocument();
  });

  test('6. Mencari buku berdasarkan judul atau nama penulis', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'Laskar Pelangi' },
    });
    fireEvent.change(screen.getByLabelText(/Penulis/i), {
      target: { value: 'Andrea Hirata' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    fireEvent.change(screen.getByLabelText(/Judul Buku/i), {
      target: { value: 'Bumi Manusia' },
    });
    fireEvent.change(screen.getByLabelText(/Penulis/i), {
      target: { value: 'Pramoedya Ananta Toer' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Tambah Buku/i }));

    // Cari berdasarkan penulis "Andrea"
    const searchInput = screen.getByLabelText(/Pencarian buku/i);
    fireEvent.change(searchInput, { target: { value: 'Andrea' } });

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.queryByText('Bumi Manusia')).not.toBeInTheDocument();
  });
});