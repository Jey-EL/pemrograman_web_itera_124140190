// 1 & 2. Class Product dengan inheritance (DigitalProduct & PhysicalProduct) + Getter & Setter
export class Product {
  constructor(name, basePrice) {
    this.name = name;
    this._price = basePrice;
    this._discount = 0; // dalam persen (0 - 100)
  }

  // Getter & Setter untuk price dengan validasi
  get price() {
    return this._price;
  }

  set price(newPrice) {
    if (newPrice < 0) {
      throw new Error("Harga produk tidak boleh negatif!");
    }
    this._price = newPrice;
  }

  // Getter & Setter untuk discount
  get discount() {
    return this._discount;
  }

  set discount(percent) {
    if (percent < 0 || percent > 100) {
      throw new Error("Diskon harus di antara 0% hingga 100%!");
    }
    this._discount = percent;
  }

  // Getter computed untuk harga akhir setelah diskon
  get finalPrice() {
    return this._price - (this._price * this._discount) / 100;
  }

  getSummary() {
    return `${this.name} | Harga Awal: Rp${this._price.toLocaleString("id-ID")} | Diskon: ${this._discount}% | Harga Akhir: Rp${this.finalPrice.toLocaleString("id-ID")}`;
  }
}

export class DigitalProduct extends Product {
  constructor(name, basePrice, fileSizeMB, downloadUrl) {
    super(name, basePrice);
    this.fileSizeMB = fileSizeMB;
    this.downloadUrl = downloadUrl;
  }

  getSummary() {
    return `[DIGITAL] ${super.getSummary()} | Ukuran: ${this.fileSizeMB} MB | Link: ${this.downloadUrl}`;
  }
}

export class PhysicalProduct extends Product {
  constructor(name, basePrice, weightKg, shippingCost = 15000) {
    super(name, basePrice);
    this.weightKg = weightKg;
    this.shippingCost = shippingCost;
  }

  get totalWithShipping() {
    return this.finalPrice + this.shippingCost;
  }

  getSummary() {
    return `[FISIK] ${super.getSummary()} | Berat: ${this.weightKg} kg | Total + Ongkir: Rp${this.totalWithShipping.toLocaleString("id-ID")}`;
  }
}

export function demoProductInheritance() {
  const ebook = new DigitalProduct("E-Book Mastering ES6+", 150000, 25, "https://store.example.com/es6");
  ebook.discount = 20; // Menggunakan setter

  const keyboard = new PhysicalProduct("Mechanical Keyboard", 850000, 1.2, 20000);
  keyboard.price = 800000; // Menggunakan setter
  keyboard.discount = 10;

  return {
    digitalInfo: ebook.getSummary(),
    digitalFinalPrice: ebook.finalPrice,
    physicalInfo: keyboard.getSummary(),
    physicalTotalWithShipping: keyboard.totalWithShipping,
    isDigitalInstanceOfProduct: ebook instanceof Product,
    isPhysicalInstanceOfProduct: keyboard instanceof Product
  };
}

// 3. Computed property names untuk membuat object dengan dynamic keys
export function demoComputedDynamicKeys(entity = "mahasiswa", id = 190) {
  const fieldNama = `${entity}_nama`;
  const fieldNim = `${entity}_nim`;
  const fieldStatus = `${entity}_aktif`;

  return {
    [fieldNama]: "Jundi Lamtara",
    [fieldNim]: `124140${id}`,
    [fieldStatus]: true,
    [`kode_unik_${id}`]: `IF-${id}-2026`
  };
}

// 4. Menggabungkan default parameters dengan destructuring dalam parameter fungsi
export function buatKonfigurasiApp({
  appName = "SI PANDA",
  environment = "production",
  port = 8080,
  features: { auth = true, darkMode = false } = {}
} = {}) {
  return {
    appName,
    environment,
    port,
    features: { auth, darkMode },
    url: `http://localhost:${port}`
  };
}