// JavaScript Next Gen Demo Code

// ----------------------------
// Let dan Const
// ----------------------------
export function demoVariables() {
  // Menggunakan var (cara lama)
  var oldVar = "Old variable";
  {
    var oldVar = "Changed inside block";
  }

  // Menggunakan let (ES6)
  let newLet = "New let variable";
  {
    let newLet = "Different variable inside block";
    console.log("newLet inside block:", newLet);
  }

  // Menggunakan const (ES6)
  const PI = 3.14159;
  const user = { name: "John", age: 30 };
  // PI = 3.15; // Error! Tidak bisa mengubah nilai const
  user.age = 31; // Ini valid! Konten objek const dapat diubah

  return {
    oldVar,
    newLet,
    PI,
    user
  };
}

// ----------------------------
// Arrow Functions
// ----------------------------
export function demoArrowFunctions() {
  // Fungsi reguler
  function regularSum(a, b) {
    return a + b;
  }

  // Arrow function dasar
  const arrowSum = (a, b) => {
    return a + b;
  };

  // Arrow function dengan implicit return
  const shortArrowSum = (a, b) => a + b;

  // Arrow function tanpa parameter
  const sayHello = () => "Hello World!";

  // Arrow function dengan satu parameter (kurung opsional)
  const square = x => x * x;

  return {
    regularSum: regularSum(5, 3),
    arrowSum: arrowSum(5, 3),
    shortArrowSum: shortArrowSum(5, 3),
    sayHello: sayHello(),
    square: square(4)
  };
}

// ----------------------------
// Template Literals
// ----------------------------
export function demoTemplateLiterals() {
  const name = "John";
  const age = 30;

  // String concatenation cara lama
  const oldWay = "Nama saya " + name + " dan umur saya " + age + " tahun.";

  // Template literals (ES6)
  const newWay = `Nama saya ${name} dan umur saya ${age} tahun.`;

  // Template literals multi-baris
  const multiLine = `
    Ini adalah string multi-baris.
    Sangat berguna untuk HTML template.
    Nama: ${name}
    Umur: ${age}
  `;

  // Template literals dengan ekspresi
  const expression = `Tahun lahir: ${new Date().getFullYear() - age}`;

  return {
    oldWay,
    newWay,
    multiLine,
    expression
  };
}