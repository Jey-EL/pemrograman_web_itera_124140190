// ----------------------------
// Modern Array Methods dan Higher-Order Functions
// ----------------------------
export function demoArrayMethods() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const users = [
    { id: 1, name: "John", age: 25, active: true },
    { id: 2, name: "Jane", age: 30, active: false },
    { id: 3, name: "Bob", age: 22, active: true },
    { id: 4, name: "Alice", age: 28, active: true },
    { id: 5, name: "Charlie", age: 35, active: false }
  ];

  const doubled = numbers.map(num => num * 2);
  const evenNumbers = numbers.filter(num => num % 2 === 0);
  const activeUsers = users.filter(user => user.active);
  const userJane = users.find(user => user.name === "Jane");
  const hasAdult = users.some(user => user.age >= 18);
  const allAdults = users.every(user => user.age >= 18);

  const sum = numbers.reduce((total, num) => total + num, 0);
  const oldest = users.reduce((oldest, user) =>
    user.age > oldest.age ? user : oldest, users[0]);

  const activeUsersNames = users
    .filter(user => user.active)
    .map(user => user.name);

  const totalActiveAge = users
    .filter(user => user.active)
    .reduce((sum, user) => sum + user.age, 0);

  return {
    map: doubled,
    filter: {
      evenNumbers,
      activeUsers: activeUsers.length
    },
    find: userJane,
    some: hasAdult,
    every: allAdults,
    reduce: {
      sum,
      oldest: oldest.name
    },
    chaining: {
      activeUsersNames,
      totalActiveAge
    }
  };
}

// ----------------------------
// Array Destructuring dan Spread Lanjutan
// ----------------------------
export function demoAdvancedArrays() {
  const numbers = [1, 2, 3, 4, 5];

  const numbersCopy = [...numbers];
  const moreNumbers = [...numbers, 6, 7, 8];
  const combinedArrays = [...numbers, ...[6, 7, 8, 9]];

  const fromIterable = Array.from("hello");
  const withMapFn = Array.from(numbers, n => n * n);
  const newArray = Array.of(1, "two", { three: 3 });

  const nestedArrays = [1, [2, 3], [[4, 5], 6]];
  const flattened = nestedArrays.flat();
  const deepFlattened = nestedArrays.flat(2);
  const flatMapped = numbers.flatMap(n => [n, n * 2]);

  const hasThree = numbers.includes(3);

  return {
    clone: numbersCopy,
    concat: {
      moreNumbers,
      combinedArrays
    },
    arrayFrom: {
      fromIterable,
      withMapFn
    },
    arrayOf: newArray,
    flatAndFlatMap: {
      flattened,
      deepFlattened,
      flatMapped
    },
    includes: hasThree
  };
}