class Person {
  constructor(name, age) {
    this.name = "John";
    this.age = 30;
  }
  greeting() {
    console.log(`Hello my ${this.name} and I am ${this.age} years old`);
  }
}

module.exports = Person;
