import { useState, useEffect } from 'react';

/**
 * Custom hook #1: state yang otomatis tersinkron dengan localStorage.
 * - Nilai awal dibaca sekali (lazy initializer) dari localStorage.
 * - useEffect menyimpan ulang setiap kali nilai berubah.
 * - try/catch melindungi dari JSON rusak atau storage penuh/diblokir.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.warn(`Gagal membaca localStorage "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Gagal menyimpan localStorage "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
