import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  it('memakai nilai awal bila localStorage kosong', () => {
    const { result } = renderHook(() => useLocalStorage('k', ['a']));
    expect(result.current[0]).toEqual(['a']);
  });

  it('menyimpan perubahan ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('k', 0));
    act(() => result.current[1](5));
    expect(JSON.parse(window.localStorage.getItem('k'))).toBe(5);
  });

  it('membaca data yang sudah tersimpan', () => {
    window.localStorage.setItem('k', JSON.stringify({ x: 1 }));
    const { result } = renderHook(() => useLocalStorage('k', {}));
    expect(result.current[0]).toEqual({ x: 1 });
  });

  it('kembali ke nilai awal bila JSON rusak', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    window.localStorage.setItem('k', '{rusak');
    const { result } = renderHook(() => useLocalStorage('k', 'default'));
    expect(result.current[0]).toBe('default');
  });
});
