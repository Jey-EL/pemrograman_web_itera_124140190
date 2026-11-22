const BASE_URL = "https://jsonplaceholder.typicode.com";

// 1. Fetch data dari beberapa endpoint secara paralel dan gabungkan hasilnya
export async function fetchDanGabungData() {
  const [usersRes, postsRes] = await Promise.all([
    fetch(`${BASE_URL}/users?_limit=4`),
    fetch(`${BASE_URL}/posts?_limit=20`)
  ]);

  if (!usersRes.ok || !postsRes.ok) {
    throw new Error("Gagal mengambil data dari salah satu endpoint");
  }

  const [users, posts] = await Promise.all([
    usersRes.json(),
    postsRes.json()
  ]);

  // Gabungkan setiap user dengan daftar post miliknya
  return users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company.name,
    postsCount: posts.filter(post => post.userId === user.id).length
  }));
}

// 2. Mekanisme retry dengan exponential backoff
export async function fetchWithRetry(asyncFn, { retries = 3, baseDelay = 400, onRetry } = {}) {
  let attempt = 0;

  while (true) {
    try {
      return await asyncFn(attempt + 1);
    } catch (error) {
      attempt++;
      if (attempt > retries) {
        throw new Error(`Gagal setelah ${retries}x percobaan ulang: ${error.message}`);
      }

      const delay = baseDelay * Math.pow(2, attempt - 1); // 400ms, 800ms, 1600ms...
      if (typeof onRetry === "function") {
        onRetry({ attempt, retries, delay, errorMessage: error.message });
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Simulasi endpoint tidak stabil yang gagal 2 kali pertama lalu berhasil pada percobaan ke-3
export function buatSimulasiApiTidakStabil() {
  let counter = 0;
  return async () => {
    counter++;
    await new Promise(resolve => setTimeout(resolve, 250));
    if (counter < 3) {
      throw new Error(`Server sibuk (503) pada percobaan ke-${counter}`);
    }
    return {
      status: "200 OK",
      totalPercobaan: counter,
      data: "Data berhasil diambil setelah exponential backoff!"
    };
  };
}

// 3 & 4. Wrapper Loading State & Async Error Boundary untuk komponen UI
export async function runWithAsyncBoundary({ container, taskFn, renderSuccess, onRetryClick }) {
  // Loading State
  container.innerHTML = `
    <div class="flex items-center gap-3 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-700">
      <span class="inline-block w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
      <span>Memuat data asinkron...</span>
    </div>
  `;

  try {
    const data = await taskFn();
    container.innerHTML = renderSuccess(data);
  } catch (error) {
    // Error Boundary UI
    container.innerHTML = `
      <div class="p-4 bg-rose-50 border border-rose-300 rounded-lg text-rose-800 space-y-2">
        <div class="font-bold">Terjadi Kesalahan Asinkron (Error Boundary)</div>
        <p class="text-xs font-mono">${error.message}</p>
        ${
          onRetryClick
            ? `<button id="boundaryRetryBtn" class="bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded font-medium">Coba Lagi</button>`
            : ""
        }
      </div>
    `;

    if (onRetryClick) {
      container.querySelector("#boundaryRetryBtn")?.addEventListener("click", onRetryClick);
    }
  }
}

// 5. Pagination dengan async/await
export async function fetchPostsPage(page = 1, limit = 4) {
  const response = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Gagal memuat halaman ${page}`);
  }
  const items = await response.json();
  const totalCount = Number(response.headers.get("x-total-count")) || 100;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    page,
    totalPages,
    items
  };
}

// 6. Helper Debounce & Async Search API
export function debounce(fn, delay = 450) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

export async function searchUsersAsync(keyword) {
  const trimmed = keyword.trim();
  if (!trimmed) return [];

  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error("Gagal melakukan pencarian pengguna");
  }

  const users = await response.json();
  const lower = trimmed.toLowerCase();
  return users.filter(
    u => u.name.toLowerCase().includes(lower) || u.email.toLowerCase().includes(lower)
  );
}