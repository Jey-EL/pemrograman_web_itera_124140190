// JavaScript Next Gen Demo Code

// ----------------------------
// Let dan Const
// ----------------------------
export function demoVariables() {
  var oldVar = "Old variable";
  {
    var oldVar = "Changed inside block";
  }

  let newLet = "New let variable";
  {
    let newLet = "Different variable inside block";
    console.log("newLet inside block:", newLet);
  }

  const PI = 3.14159;
  const user = { name: "John", age: 30 };
  user.age = 31;

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
  function regularSum(a, b) {
    return a + b;
  }

  const arrowSum = (a, b) => {
    return a + b;
  };

  const shortArrowSum = (a, b) => a + b;
  const sayHello = () => "Hello World!";
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

  const oldWay = "Nama saya " + name + " dan umur saya " + age + " tahun.";
  const newWay = `Nama saya ${name} dan umur saya ${age} tahun.`;

  const multiLine = `
    Ini adalah string multi-baris.
    Sangat berguna untuk HTML template.
    Nama: ${name}
    Umur: ${age}
  `;

  const expression = `Tahun lahir: ${new Date().getFullYear() - age}`;

  return {
    oldWay,
    newWay,
    multiLine,
    expression
  };
}

// ----------------------------
// Destructuring
// ----------------------------
export function demoDestructuring() {
  const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john@example.com",
    address: {
      city: "Jakarta",
      postalCode: "12345"
    }
  };

  const { firstName, lastName } = person;
  const { firstName: fName, lastName: lName } = person;
  const { hobby = "coding" } = person;
  const { address: { city, postalCode } } = person;

  const colors = ["red", "green", "blue", "yellow", "purple"];
  const [firstColor, secondColor] = colors;
  const [, , thirdColor] = colors;
  const [primary, secondary, ...restColors] = colors;

  let a = 1;
  let b = 2;
  [a, b] = [b, a];

  return {
    objectBasic: { firstName, lastName },
    objectRenamed: { fName, lName },
    objectDefault: hobby,
    objectNested: { city, postalCode },
    arrayBasic: { firstColor, secondColor },
    arraySkipped: thirdColor,
    arrayRest: { primary, secondary, restColors },
    swapped: { a, b }
  };
}

// ----------------------------
// Spread dan Rest Operators
// ----------------------------
export function demoSpreadRest() {
  const numbers = [1, 2, 3];
  const moreNumbers = [...numbers, 4, 5];
  const numbersCopy = [...numbers];

  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6];
  const mergedArray = [...array1, ...array2];

  const person = {
    name: "John",
    age: 30
  };

  const personCopy = { ...person };
  const extendedPerson = {
    ...person,
    email: "john@example.com",
    age: 31
  };

  function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }

  function process(first, second, ...rest) {
    return {
      first,
      second,
      rest
    };
  }

  return {
    spreadArray: moreNumbers,
    copyArray: numbersCopy,
    mergedArrays: mergedArray,
    copyObject: personCopy,
    spreadObject: extendedPerson,
    restSum: sum(1, 2, 3, 4, 5),
    restProcess: process("a", "b", "c", "d", "e")
  };
}

// ----------------------------
// Default Parameters
// ----------------------------
export function demoDefaultParams() {
  // Cara lama (ES5)
  function greetOld(name, greeting) {
    name = name || "Guest";
    greeting = greeting || "Hello";
    return `${greeting}, ${name}!`;
  }

  // Dengan default parameters (ES6)
  function greet(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
  }

  // Default parameters dengan ekspresi
  function createUser(name, role = "user", createdAt = new Date().toISOString()) {
    return { name, role, createdAt };
  }

  // Default parameters bisa menggunakan parameter sebelumnya
  function createOrder(product, quantity = 1, price, total = price * quantity) {
    return { product, quantity, price, total };
  }

  return {
    oldWay: greetOld(),
    oldWayParams: greetOld("John", "Hi"),
    newWay: greet(),
    newWayParams: greet("John", "Hi"),
    withExpression: createUser("Alice"),
    usingPrevious: createOrder("Laptop", 2, 1000000)
  };
}

// ----------------------------
// Classes
// ----------------------------
export function demoClasses() {
  // Definisi class
  class User {
    // Constructor
    constructor(name, email) {
      this.name = name;
      this.email = email;
      this.createdAt = new Date();
    }

    // Methods
    getInfo() {
      return `${this.name} (${this.email})`;
    }

    getCreatedDate() {
      return this.createdAt.toLocaleDateString();
    }
  }

  // Inheritance
  class Admin extends User {
    constructor(name, email, role = "admin") {
      // Memanggil constructor parent class
      super(name, email);
      this.role = role;
    }

    // Override method
    getInfo() {
      return `${this.name} (${this.email}) - ${this.role}`;
    }

    // Admin method
    hasAccess(module) {
      return true;
    }
  }

  // Instances
  const user = new User("John Doe", "john@example.com");
  const admin = new Admin("Admin User", "admin@example.com");

  return {
    user: {
      info: user.getInfo(),
      createdDate: user.getCreatedDate()
    },
    admin: {
      info: admin.getInfo(),
      createdDate: admin.getCreatedDate(),
      hasAccess: admin.hasAccess("dashboard")
    },
    isUserInstance: user instanceof User,
    isAdminInstance: admin instanceof User
  };
}

// ----------------------------
// Enhanced Object Literals
// ----------------------------
export function demoObjectLiterals() {
  // Property shorthand
  const name = "John";
  const age = 30;

  // Cara lama
  const oldPerson = {
    name: name,
    age: age,
    sayHello: function() {
      return "Hello!";
    }
  };

  // Object literal modern (ES6)
  const newPerson = {
    name,
    age,
    // Method shorthand
    sayHello() {
      return "Hello!";
    },
    // Computed property names
    ["skill_" + 1]: "JavaScript",
    ["skill_" + 2]: "React"
  };

  // Combining with other features
  const prefix = "user";
  const userData = {
    [`${prefix}_id`]: 123,
    [`${prefix}_name`]: "john_doe",
    [Date.now()]: "timestamp"
  };

  return {
    oldWay: oldPerson,
    newWay: newPerson,
    methods: {
      old: oldPerson.sayHello(),
      new: newPerson.sayHello()
    },
    computedProps: {
      skill1: newPerson.skill_1,
      skill2: newPerson.skill_2
    },
    dynamicProps: userData
  };
}