// Daftar status buku: value disimpan di localStorage, label ditampilkan ke user
export const STATUS_LABELS = {
  milik: 'Dimiliki',
  baca: 'Sedang dibaca',
  beli: 'Ingin dibeli',
};

export const STATUS_KEYS = Object.keys(STATUS_LABELS);
export const STORAGE_KEY = 'personal-books';
