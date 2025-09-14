// 1. Hàm greet
let greet = (name, timeOfDay) => {
    console.log(`Good ${timeOfDay}, ${name}!`);
};
greet('Alice', 'morning');
greet('Bob', 'evening');

// 2. Hàm square
let square = num => {
    return num * num;
};
console.log(square(5));
console.log(square(8));

// 3. Hàm sayHello
let sayHello = () => {
    console.log("Hello there!");
};
sayHello();

// 4. Đối tượng person
let person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
    }
};
person.greet();

// 5. Hàm add (arrow function)
let add = (a, b) => a + b;
console.log(add(1, 2));
