import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';

// Implementasi localStorage in-memory untuk lingkungan test
class MemoryStorage {
  constructor() {
    this.store = new Map();
  }
  get length() {
    return this.store.size;
  }
  key(i) {
    return Array.from(this.store.keys())[i] ?? null;
  }
  getItem(k) {
    return this.store.has(String(k)) ? this.store.get(String(k)) : null;
  }
  setItem(k, v) {
    this.store.set(String(k), String(v));
  }
  removeItem(k) {
    this.store.delete(String(k));
  }
  clear() {
    this.store.clear();
  }
}

const storage = new MemoryStorage();

Object.defineProperty(window, 'localStorage', {
  value: storage,
  configurable: true,
  writable: true,
});
Object.defineProperty(globalThis, 'localStorage', {
  value: storage,
  configurable: true,
  writable: true,
});

// Bersihkan localStorage setelah setiap test agar test saling independen
afterEach(() => {
  window.localStorage.clear();
});
