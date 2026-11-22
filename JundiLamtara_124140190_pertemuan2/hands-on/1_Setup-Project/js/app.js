// Kumpulan fungsi demonstrasi fitur-fitur ES6+ yang akan diekspor ke main.js
import { sampleUsers, sampleProducts } from "./modules/data.js";
import { formatRupiah, capitalize } from "./modules/utils.js";

export function runSetupDemo() {
  const userSummary = sampleUsers
    .map((u) => `- ${u.name} (${capitalize(u.role)}) - ${u.active ? "Active" : "Inactive"}`)
    .join("\n");

  const productSummary = sampleProducts
    .map((p) => `- [${p.id}] ${p.name}: ${formatRupiah(p.price)}`)
    .join("\n");

  return `Daftar Users:\n${userSummary}\n\nDaftar Produk:\n${productSummary}`;
}