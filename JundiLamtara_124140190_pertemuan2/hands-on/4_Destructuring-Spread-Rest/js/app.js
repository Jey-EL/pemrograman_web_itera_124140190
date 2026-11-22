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