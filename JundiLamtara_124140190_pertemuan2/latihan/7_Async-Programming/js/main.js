import {
  fetchDanGabungData,
  fetchWithRetry,
  buatSimulasiApiTidakStabil,
  runWithAsyncBoundary,
  fetchPostsPage,
  debounce,
  searchUsersAsync
} from "./latihan.js";

// 1. Multi-endpoint fetch & gabung hasil
const multiFetchContainer = document.getElementById("multiFetchContainer");

document.getElementById("btnFetchGabungan")?.addEventListener("click", () => {
  runWithAsyncBoundary({
    container: multiFetchContainer,
    taskFn: fetchDanGabungData,
    renderSuccess: (mergedUsers) => `
      <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap">${JSON.stringify(mergedUsers, null, 2)}</pre>
    `
  });
});

// 2. Uji Retry dengan Exponential Backoff
document.getElementById("btnTestRetry")?.addEventListener("click", async () => {
  const logs = [];
  const unstableApi = buatSimulasiApiTidakStabil();

  multiFetchContainer.innerHTML = `<div class="p-3 bg-amber-50 border border-amber-200 rounded text-amber-800 text-xs font-mono">Memulai request ke API tidak stabil...</div>`;

  try {
    const result = await fetchWithRetry(unstableApi, {
      retries: 3,
      baseDelay: 400,
      onRetry: ({ attempt, retries, delay, errorMessage }) => {
        logs.push(`[Retry ${attempt}/${retries}] ${errorMessage} -> menunggu ${delay}ms...`);
        multiFetchContainer.innerHTML = `<pre class="bg-gray-800 text-amber-300 p-3 rounded text-xs font-mono whitespace-pre-wrap">${logs.join("\n")}</pre>`;
      }
    });

    logs.push(`[SUKSES] ${JSON.stringify(result)}`);
    multiFetchContainer.innerHTML = `<pre class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap">${logs.join("\n")}</pre>`;
  } catch (err) {
    logs.push(`[GAGAL TOTAL] ${err.message}`);
    multiFetchContainer.innerHTML = `<pre class="bg-gray-800 text-rose-400 p-3 rounded text-xs font-mono whitespace-pre-wrap">${logs.join("\n")}</pre>`;
  }
});

// 3 & 4. Simulasi Loading State & Error Boundary
const errorBoundaryContainer = document.getElementById("errorBoundaryContainer");

function jalankanSimulasiBoundary(shouldFail) {
  runWithAsyncBoundary({
    container: errorBoundaryContainer,
    taskFn: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error("Koneksi ke server database terputus (Timeout 504)"));
          } else {
            resolve({ status: "OK", waktu: new Date().toLocaleTimeString("id-ID"), pesan: "Data profil berhasil dimuat!" });
          }
        }, 900);
      }),
    renderSuccess: (data) => `
      <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
        <strong>Berhasil:</strong> ${data.pesan} (Pukul ${data.waktu})
      </div>
    `,
    onRetryClick: () => jalankanSimulasiBoundary(false)
  });
}

document.getElementById("btnSimulasiSukses")?.addEventListener("click", () => jalankanSimulasiBoundary(false));
document.getElementById("btnSimulasiError")?.addEventListener("click", () => jalankanSimulasiBoundary(true));

// 5. Async Pagination
let currentPage = 1;
const paginationContainer = document.getElementById("paginationContainer");
const pageIndicator = document.getElementById("pageIndicator");
const btnPrevPage = document.getElementById("btnPrevPage");
const btnNextPage = document.getElementById("btnNextPage");

async function loadPage(page) {
  pageIndicator.textContent = `Halaman ${page}`;
  btnPrevPage.disabled = page <= 1;

  await runWithAsyncBoundary({
    container: paginationContainer,
    taskFn: () => fetchPostsPage(page, 4),
    renderSuccess: ({ page: activePage, totalPages, items }) => {
      pageIndicator.textContent = `Halaman ${activePage} / ${totalPages}`;
      btnNextPage.disabled = activePage >= totalPages;
      return `
        <ul class="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          ${items
            .map(
              item => `
              <li class="p-3 bg-gray-50">
                <span class="font-semibold text-indigo-700">#${item.id} ${item.title}</span>
                <p class="text-xs text-gray-600 mt-1">${item.body}</p>
              </li>`
            )
            .join("")}
        </ul>
      `;
    }
  });
}

btnPrevPage?.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadPage(currentPage);
  }
});

btnNextPage?.addEventListener("click", () => {
  currentPage++;
  loadPage(currentPage);
});

// Muat halaman pertama saat awal dibuka
loadPage(currentPage);

// 6. Debounced Search
const searchInput = document.getElementById("searchInput");
const searchResultContainer = document.getElementById("searchResultContainer");

const handleDebouncedSearch = debounce(async (keyword) => {
  if (!keyword.trim()) {
    searchResultContainer.innerHTML = `<p class="text-xs text-gray-400">Masukkan kata kunci untuk mencari pengguna...</p>`;
    return;
  }

  await runWithAsyncBoundary({
    container: searchResultContainer,
    taskFn: () => searchUsersAsync(keyword),
    renderSuccess: (users) => {
      if (users.length === 0) {
        return `<p class="text-xs text-gray-500">Tidak ada pengguna yang cocok dengan "${keyword}".</p>`;
      }
      return `
        <div class="grid gap-2">
          ${users
            .map(
              u => `
              <div class="p-3 bg-gray-50 border border-gray-200 rounded flex justify-between items-center">
                <div>
                  <div class="font-semibold text-gray-800">${u.name}</div>
                  <div class="text-xs text-gray-500">${u.email}</div>
                </div>
                <span class="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">${u.company.name}</span>
              </div>`
            )
            .join("")}
        </div>
      `;
    }
  });
}, 450);

searchInput?.addEventListener("input", (e) => {
  handleDebouncedSearch(e.target.value);
});