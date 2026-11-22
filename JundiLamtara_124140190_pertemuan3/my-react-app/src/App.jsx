import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
// === LATIHAN MANDIRI: Import Halaman NotFound ===
import NotFound from './pages/NotFound/NotFound';
// === END LATIHAN MANDIRI ===
import './App.css';

function App() {
  return (
    <Router>
      <TaskProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* === LATIHAN MANDIRI: Rute Fallback 404 === */}
            <Route path="*" element={<NotFound />} />
            {/* === END LATIHAN MANDIRI === */}
          </Routes>
        </div>
      </TaskProvider>
    </Router>
  );
}

export default App;

// ==========================================================
//        Uji Coba 1: Number State (Counter Sederhana)
// ==========================================================

// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div className="App" style={{ textAlign: 'center', padding: '3rem' }}>
//       <h2>Eksplorasi State: Counter Sederhana</h2>
//       <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Total Hitungan: {count}</p>
//       <button
//         onClick={() => setCount(count + 1)}
//         style={{ padding: '0.6rem 1.2rem', marginRight: '0.5rem', cursor: 'pointer' }}
//       >
//         Tambah (+1)
//       </button>
//       <button
//         onClick={() => setCount(count - 1)}
//         style={{ padding: '0.6rem 1.2rem', cursor: 'pointer' }}
//       >
//         Kurang (-1)
//       </button>
//     </div>
//   );
// }

// export default App;

// ==========================================================
//  Uji Coba 2: Array State (Penambahan & Penghapusan Item)
// ==========================================================

// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [items, setItems] = useState([]);

//   const addItem = (name) => {
//     // Immutability: buat array baru dengan spread operator
//     setItems([...items, { id: Date.now(), name }]);
//   };

//   const removeItem = (id) => {
//     setItems(items.filter(item => item.id !== id));
//   };

//   return (
//     <div className="App" style={{ maxWidth: '480px', margin: '2rem auto', padding: '1rem' }}>
//       <h2>Eksplorasi State: Array State</h2>
//       <button
//         onClick={() => addItem(`Tugas Baru ke-${items.length + 1}`)}
//         style={{ padding: '0.6rem 1.2rem', margin: '1rem 0', cursor: 'pointer' }}
//       >
//         Tambah Item
//       </button>
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {items.map(item => (
//           <li
//             key={item.id}
//             style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #e2e8f0' }}
//           >
//             <span>{item.name}</span>
//             <button
//               onClick={() => removeItem(item.id)}
//               style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}
//             >
//               Hapus
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;