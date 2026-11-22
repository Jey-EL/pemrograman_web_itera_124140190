// ----------------------------
// Default Parameters
// ----------------------------
export function demoDefaultParams() {
  function greetOld(name, greeting) {
    name = name || "Guest";
    greeting = greeting || "Hello";
    return `${greeting}, ${name}!`;
  }

  function greet(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
  }

  function createUser(name, role = "user", createdAt = new Date().toISOString()) {
    return { name, role, createdAt };
  }

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
  class User {
    constructor(name, email) {
      this.name = name;
      this.email = email;
      this.createdAt = new Date();
    }

    getInfo() {
      return `${this.name} (${this.email})`;
    }

    getCreatedDate() {
      return this.createdAt.toLocaleDateString();
    }
  }

  class Admin extends User {
    constructor(name, email, role = "admin") {
      super(name, email);
      this.role = role;
    }

    getInfo() {
      return `${this.name} (${this.email}) - ${this.role}`;
    }

    hasAccess(module) {
      return true;
    }
  }

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
  const name = "John";
  const age = 30;

  const oldPerson = {
    name: name,
    age: age,
    sayHello: function() {
      return "Hello!";
    }
  };

  const newPerson = {
    name,
    age,
    sayHello() {
      return "Hello!";
    },
    ["skill_" + 1]: "JavaScript",
    ["skill_" + 2]: "React"
  };

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