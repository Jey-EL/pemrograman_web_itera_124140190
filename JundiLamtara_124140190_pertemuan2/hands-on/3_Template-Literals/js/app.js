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