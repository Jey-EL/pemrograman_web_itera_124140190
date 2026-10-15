// js/latihan.js
// Latihan mandiri: classes, getter/setter, computed property names, default params + destructuring

import { addOutput } from "./main.js";
import { formatRupiah, capitalize } from "./modules/utils.js";

// Latihan 1: Class Product dengan inheritance ke DigitalProduct dan PhysicalProduct
export class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getInfo() {
    return `${this.name} - ${formatRupiah(this.price)}`;
  }

  getDiscountedPrice(discount) {
    return this.price * (1 - discount);
  }
}

export class DigitalProduct extends Product {
  constructor(name, price, fileSizeMB) {
    super(name, price); // wajib dipanggil sebelum memakai this
    this.fileSizeMB = fileSizeMB;
  }

  // Override method
  getInfo() {
    return `${super.getInfo()} | Digital, ${this.fileSizeMB} MB`;
  }

  download() {
    return `Mengunduh ${this.name}...`;
  }
}

export class PhysicalProduct extends Product {
  constructor(name, price, weightKg) {
    super(name, price);
    this.weightKg = weightKg;
  }

  getInfo() {
    return `${super.getInfo()} | Fisik, ${this.weightKg} kg`;
  }

  shippingCost(perKg = 10000) {
    return this.weightKg * perKg;
  }
}

export function latihanProduct() {
  const umum = new Product("Stiker", 5000);
  const ebook = new DigitalProduct("E-Book JavaScript", 99000, 12);
  const laptop = new PhysicalProduct("Laptop Gaming", 15000000, 2.5);

  const hasil = [
    `Product         : ${umum.getInfo()}`,
    `DigitalProduct  : ${ebook.getInfo()}`,
    `  ${ebook.download()}`,
    `PhysicalProduct : ${laptop.getInfo()}`,
    `  Ongkir        : ${formatRupiah(laptop.shippingCost())}`,
    `  Diskon 10%    : ${formatRupiah(laptop.getDiscountedPrice(0.1))}`,
    ``,
    `ebook instanceof DigitalProduct  -> ${ebook instanceof DigitalProduct}`,
    `ebook instanceof Product         -> ${ebook instanceof Product}`,
    `laptop instanceof DigitalProduct -> ${laptop instanceof DigitalProduct}`
  ].join("\n");

  addOutput(
    "1. Latihan: Class & Inheritance",
    "Product -> DigitalProduct dan PhysicalProduct",
    hasil
  );
}

// Latihan 2: Getter dan setter dalam class
class Suhu {
  #celsius = 0; // private field, hanya bisa diakses lewat getter/setter

  constructor(celsius) {
    this.celsius = celsius; // memanggil setter
  }

  get celsius() {
    return this.#celsius;
  }

  set celsius(nilai) {
    if (typeof nilai !== "number" || nilai < -273.15) {
      throw new RangeError("Suhu tidak valid (minimal -273.15 °C)");
    }
    this.#celsius = nilai;
  }

  // Getter turunan (dihitung otomatis)
  get fahrenheit() {
    return (this.#celsius * 9) / 5 + 32;
  }

  // Setter yang mengubah nilai internal dari satuan lain
  set fahrenheit(f) {
    this.celsius = ((f - 32) * 5) / 9;
  }
}

export function latihanGetterSetter() {
  const log = [];
  const suhu = new Suhu(25);
  log.push(`new Suhu(25)        -> ${suhu.celsius} °C = ${suhu.fahrenheit} °F`);

  suhu.celsius = 100; // setter
  log.push(`suhu.celsius = 100  -> ${suhu.fahrenheit} °F`);

  suhu.fahrenheit = 32; // setter fahrenheit
  log.push(`suhu.fahrenheit = 32 -> ${suhu.celsius} °C`);

  try {
    suhu.celsius = -500;
  } catch (e) {
    log.push(`suhu.celsius = -500 -> ${e.name}: ${e.message}`);
  }

  addOutput(
    "2. Latihan: Getter & Setter",
    "Akses properti terkontrol dengan validasi",
    log.join("\n")
  );
}

// Latihan 3: Computed property names untuk membuat object dengan dynamic keys
export function latihanComputedKeys() {
  const prefix = "user";
  const id = 7;
  const bahasa = ["JavaScript", "Python", "C++"];

  // a. Key dari template literal
  const userData = {
    [`${prefix}_id`]: id,
    [`${prefix}_name`]: "alice",
    [`${prefix}_${id}_active`]: true
  };

  // b. Key dibuat dari loop (skill_1, skill_2, ...)
  const skills = {};
  bahasa.forEach((b, i) => {
    skills[`skill_${i + 1}`] = b;
  });

  // c. Key dihitung dari array lewat Object.fromEntries
  const skillsLiteral = Object.fromEntries(
    bahasa.map((b, i) => [`skill_${i + 1}`, b])
  );

  // d. Fungsi yang membuat object dengan key dinamis
  const buatField = (namaField, nilai) => ({ [namaField]: nilai });

  const hasil = [
    `a. userData       = ${JSON.stringify(userData)}`,
    `b. skills (loop)  = ${JSON.stringify(skills)}`,
    `c. skillsLiteral  = ${JSON.stringify(skillsLiteral)}`,
    `d. buatField("email", "a@mail.com") = ${JSON.stringify(buatField("email", "a@mail.com"))}`,
    `   buatField("umur", 20)            = ${JSON.stringify(buatField("umur", 20))}`
  ].join("\n");

  addOutput(
    "3. Latihan: Computed Property Names",
    "Nama properti ditentukan saat runtime lewat [ ]",
    hasil
  );
}

// Latihan 4: Gabungkan default parameters dengan destructuring di parameter function
export function latihanDefaultDestructuring() {
  // Destructuring object di parameter + default tiap properti + default seluruh argumen ({})
  const buatUser = ({ name = "Tamu", role = "user", active = true } = {}) =>
    `${capitalize(name)} | role: ${role} | aktif: ${active}`;

  // Destructuring + default + rest
  const buatOrder = ({ product, quantity = 1, price = 0, ...extra } = {}) => ({
    product,
    quantity,
    total: price * quantity,
    extra
  });

  // Destructuring array di parameter dengan default
  const koordinat = ([x = 0, y = 0] = []) => `(${x}, ${y})`;

  const hasil = [
    `buatUser()                         -> ${buatUser()}`,
    `buatUser({ name: "alice" })        -> ${buatUser({ name: "alice" })}`,
    `buatUser({ name: "bob", role: "admin", active: false })`,
    `                                   -> ${buatUser({ name: "bob", role: "admin", active: false })}`,
    ``,
    `buatOrder({ product: "Laptop", quantity: 2, price: 1000000, catatan: "kado" })`,
    `  -> ${JSON.stringify(buatOrder({ product: "Laptop", quantity: 2, price: 1000000, catatan: "kado" }))}`,
    `buatOrder({ product: "Mouse" })    -> ${JSON.stringify(buatOrder({ product: "Mouse" }))}`,
    ``,
    `koordinat()        -> ${koordinat()}`,
    `koordinat([3])     -> ${koordinat([3])}`,
    `koordinat([3, 4])  -> ${koordinat([3, 4])}`
  ].join("\n");

  addOutput(
    "4. Latihan: Default Parameters + Destructuring",
    "Parameter object/array dengan nilai bawaan",
    hasil
  );
}

// Jalankan semua latihan
export function runLatihan() {
  latihanProduct();
  latihanGetterSetter();
  latihanComputedKeys();
  latihanDefaultDestructuring();
}