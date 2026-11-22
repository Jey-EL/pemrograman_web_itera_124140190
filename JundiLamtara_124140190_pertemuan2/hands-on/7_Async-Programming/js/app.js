// ----------------------------
// Promises
// ----------------------------
export function demoPromises() {
  // Simulasi operasi asinkron dengan Promise
  function fetchData(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id > 0) {
          resolve({ id, name: `User ${id}`, success: true });
        } else {
          reject(new Error("ID tidak valid"));
        }
      }, 1000);
    });
  }

  // Penggunaan Promise dasar
  let basicPromiseResult = "Memuat...";
  fetchData(1)
    .then(data => {
      basicPromiseResult = `Sukses: ${JSON.stringify(data)}`;
      const el = document.getElementById('promise-basic');
      if (el) el.textContent = basicPromiseResult;
    })
    .catch(err => {
      basicPromiseResult = `Error: ${err.message}`;
      const el = document.getElementById('promise-basic');
      if (el) el.textContent = basicPromiseResult;
    });

  // Promise chaining
  let chainResult = "Memuat...";
  fetchData(2)
    .then(user => {
      chainResult = `Dapat user: ${user.name}`;
      return fetchData(3);
    })
    .then(secondUser => {
      chainResult += ` dan ${secondUser.name}`;
      const el = document.getElementById('promise-chain');
      if (el) el.textContent = chainResult;
    })
    .catch(err => {
      chainResult = `Error: ${err.message}`;
      const el = document.getElementById('promise-chain');
      if (el) el.textContent = chainResult;
    });

  // Promise.all
  let allResult = "Memuat...";
  Promise.all([fetchData(4), fetchData(5), fetchData(6)])
    .then(results => {
      allResult = `Semua selesai: ${results.map(r => r.name).join(', ')}`;
      const el = document.getElementById('promise-all');
      if (el) el.textContent = allResult;
    })
    .catch(err => {
      allResult = `Error di salah satu: ${err.message}`;
      const el = document.getElementById('promise-all');
      if (el) el.textContent = allResult;
    });

  // Promise.race
  let raceResult = "Memuat...";
  Promise.race([
    fetchData(7),
    fetchData(8),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), 1500))
  ])
    .then(winner => {
      raceResult = `Pemenang race: ${winner.name}`;
      const el = document.getElementById('promise-race');
      if (el) el.textContent = raceResult;
    })
    .catch(err => {
      raceResult = `Error race: ${err.message}`;
      const el = document.getElementById('promise-race');
      if (el) el.textContent = raceResult;
    });

  // Buat elemen untuk update promise
  const outputDiv = document.createElement('div');
  outputDiv.className = 'promise-outputs space-y-1';

  const createPromiseElement = (id, label) => {
    const el = document.createElement('div');
    el.className = 'promise-result';
    el.innerHTML = `<strong>${label}:</strong> <span id="${id}">Memuat...</span>`;
    outputDiv.appendChild(el);
  };

  createPromiseElement('promise-basic', 'Promise Dasar');
  createPromiseElement('promise-chain', 'Promise Chain');
  createPromiseElement('promise-all', 'Promise.all');
  createPromiseElement('promise-race', 'Promise.race');

  return outputDiv;
}

// ----------------------------
// Async/Await
// ----------------------------
export function demoAsyncAwait() {
  // Simulasi API call
  function fetchUser(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id > 0) {
          resolve({
            id,
            name: `User ${id}`,
            email: `user${id}@example.com`
          });
        } else {
          reject(new Error("ID user tidak valid"));
        }
      }, 1000);
    });
  }

  function fetchUserPosts(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, title: "Post 1", body: "Konten untuk post 1" },
          { id: 2, title: "Post 2", body: "Konten untuk post 2" },
        ]);
      }, 800);
    });
  }

  // Menggunakan async/await
  async function getUserData(id) {
    try {
      const user = await fetchUser(id);
      const posts = await fetchUserPosts(user.id);
      return {
        user,
        posts,
        success: true
      };
    } catch (error) {
      return {
        error: error.message,
        success: false
      };
    }
  }

  // Eksekusi paralel dengan async/await
  async function getMultipleUsers(ids) {
    try {
      const userPromises = ids.map(id => fetchUser(id));
      const users = await Promise.all(userPromises);

      const postPromises = users.map(user => fetchUserPosts(user.id));
      const allPosts = await Promise.all(postPromises);

      return users.map((user, i) => ({
        user,
        posts: allPosts[i]
      }));
    } catch (error) {
      return { error: error.message };
    }
  }

  // Buat elemen untuk menampilkan hasil
  const outputDiv = document.createElement('div');
  outputDiv.className = 'async-outputs space-y-1';

  const basicAsyncResult = document.createElement('div');
  basicAsyncResult.innerHTML = '<strong>User Tunggal:</strong> Memuat...';
  basicAsyncResult.className = 'async-result';
  outputDiv.appendChild(basicAsyncResult);

  const parallelAsyncResult = document.createElement('div');
  parallelAsyncResult.innerHTML = '<strong>Beberapa User:</strong> Memuat...';
  parallelAsyncResult.className = 'async-result';
  outputDiv.appendChild(parallelAsyncResult);

  // Jalankan dan update UI
  getUserData(42).then(result => {
    if (result.success) {
      basicAsyncResult.innerHTML = `<strong>User Tunggal:</strong> ${result.user.name} (${result.user.email}) | Posts: ${result.posts.length}`;
    } else {
      basicAsyncResult.innerHTML = `<strong>Error:</strong> ${result.error}`;
    }
  });

  getMultipleUsers([101, 102, 103]).then(results => {
    if (!results.error) {
      parallelAsyncResult.innerHTML = `<strong>Beberapa User:</strong> ${results.map(r => r.user.name).join(', ')} | Total posts: ${results.reduce((sum, r) => sum + r.posts.length, 0)}`;
    } else {
      parallelAsyncResult.innerHTML = `<strong>Error:</strong> ${results.error}`;
    }
  });

  return outputDiv;
}