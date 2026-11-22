import React from 'react';
import Header from '../../components/Header/Header';
// === LATIHAN MANDIRI (Submodul 6): Import useTasks ===
import { useTasks } from '../../context/TaskContext';
// === END LATIHAN MANDIRI ===

function About() {
  // === LATIHAN MANDIRI (Submodul 6): Ambil stats dari Context ===
  const { stats } = useTasks();
  // === END LATIHAN MANDIRI ===

  return (
    <div className="about">
      <Header
        title="Tentang Aplikasi"
        description="Informasi mengenai React Task Manager"
      />

      <main className="container">
        <div
          style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            lineHeight: '1.6',
          }}
        >
          <h2>React Task Manager</h2>
          <p style={{ marginTop: '0.5rem', color: '#475569' }}>
            Aplikasi manajemen tugas sederhana yang dibangun menggunakan React,
            React Router, Custom Hooks, dan Context API.
          </p>

          {/* === LATIHAN MANDIRI (Submodul 6): Tampilkan Statistik Tugas === */}
          <p
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              backgroundColor: '#f0f9ff',
              borderLeft: '4px solid #0284c7',
              borderRadius: '4px',
              color: '#0f172a',
              fontWeight: 500,
            }}
          >
            Saat ini Anda memiliki total <strong>{stats.total}</strong> tugas yang tersimpan di sistem.
          </p>
          {/* === END LATIHAN MANDIRI === */}
        </div>
      </main>
    </div>
  );
}

export default About;