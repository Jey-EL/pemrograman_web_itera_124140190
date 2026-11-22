import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Mengambil data awal dari localStorage jika tersedia
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Gagal membaca localStorage:', error);
      return initialValue;
    }
  });

  // Menyimpan setiap perubahan state ke localStorage secara otomatis
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Gagal menyimpan ke localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;