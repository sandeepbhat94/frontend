# => OPPS IN JS

1. `Objects`:
"At the core of JavaScript's OOP is the concept of objects. Objects are collections of properties, which are key-value pairs. Each property has a name (key) and a value."
```js
const person = {
    name: 'Alice',
    age: 30,
    greet: function () {
        console.log(`Hello, my name is ${this.name}`);
    }
};

person.greet(); // Output: Hello, my name is Alice
```

2. `Classes and Instances`:
ES6 introduced the class syntax, which provides a more familiar and clear way to create objects and handle inheritance.'

``` js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

```
3. `Inheritance`:
"Inheritance allows a class to inherit properties and methods from another class. In JavaScript, you use the extends keyword to create a subclass that inherits from a superclass."

EXAMPLE:
```js
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog('Rex');
dog.speak(); // Output: Rex barks.

```

4. `Encapsulation` :
Encapsulation involves bundling data (properties) and methods (functions) that operate on the data into a single unit or class. JavaScript does not have private properties in the traditional sense, but you can use closures or the new # syntax (from ES2022) for private fields.

Example:
```js
function Person(name, age) {
  let _age = age; // Private property

  this.name = name;

  this.getAge = function() {
    return _age;
  };

  this.setAge = function(age) {
    if (age > 0) {
      _age = age;
    }
  };
}

const person = new Person('Alice', 30);
console.log(person.getAge()); // Output: 30
person.setAge(31);
console.log(person.getAge()); // Output: 31
```

```js
class Person {
  #age; // Private field

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  getAge() {
    return this.#age;
  }

  setAge(age) {
    if (age > 0) {
      this.#age = age;
    }
  }
}

const person = new Person('Alice', 30);
console.log(person.getAge()); // Output: 30
person.setAge(31);
console.log(person.getAge()); // Output: 31
```

5. `Polymorphism`:
Polymorphism allows different classes to be treated as instances of the same class through a common interface. This can be achieved in JavaScript through method overriding.

EXAMPLE: 
```js
class Animal {
  speak() {
    console.log('Animal makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log('Dog barks.');
  }
}

class Cat extends Animal {
  speak() {
    console.log('Cat meows.');
  }
}

const animals = [new Dog(), new Cat()];

animals.forEach(animal => animal.speak());
// Output:
// Dog barks.
// Cat meows.
```

6. `Prototype-Based Inheritance`
Before ES6 classes, JavaScript used prototype-based inheritance. Each object has a prototype object that it inherits methods and properties from.

Example:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, my name is ${this.name}`);
};

const person = new Person('Alice');
person.greet(); // Output: Hello, my name is Alice
```


# Summary

Objects: Fundamental units of JavaScript OOP, consisting of key-value pairs.
Classes and Instances: ES6 introduced class syntax for clearer object creation and inheritance.
Inheritance: Allows classes to inherit properties and methods from other classes.
Encapsulation: Bundles data and methods within a class, with private properties managed through closures or private fields.
Polymorphism: Enables different classes to be used interchangeably through a common interface.
Prototype-Based Inheritance: Pre-ES6 inheritance method, where objects inherit directly from other objects.

# ==================================================================
# SPREAD VS REST
1 => Spread Operator (...): Used to spread elements or properties.
    Arrays: const mergedArray = [...array1, ...array2];
    Objects: const mergedObject = { ...obj1, ...obj2 };
   
2 => Rest Operator (...): Used to gather remaining elements or properties.
    Function Parameters: function sum(...numbers) {...}
    Array Destructuring: const [first, second, ...rest] = array;
    Object Destructuring: const { a, b, ...rest } = obj;

========================================================================

# What is a first class function
In Javascript, functions are first class objects. First-class functions means when functions in that language are treated like any other variable.

EXAMPLE
```js
    const handler = () => console.log("This is a click handler function");
    document.addEventListener("click", handler);
```

=========================================================================

# What is a first order function

A first-order function is a function that doesn’t accept another function as an argument and doesn’t return a function as its return value.

EXAMPLE
```js
    const firstOrder = () => console.log("I am a first order function!");
```

==========================================================================

# What is a higher order function
A higher-order function is a function that accepts another function as an argument or returns a function as a return value or both.

```js
    const firstOrderFunc = () => console.log("Hello, I am a First order function");

    const higherOrder = (ReturnFirstOrderFunc) => ReturnFirstOrderFunc();
    
    higherOrder(firstOrderFunc);
```

===========================================================================

# What is a unary function
A unary function (i.e. monadic) is a function that accepts exactly one argument. It stands for a single argument accepted by a function.

```js
    const unaryFunction = (a) => console.log(a + 10); // Add 10 to the given argument and display the value
```

============================================================================
# What is the currying function
Currying is the process of taking a function with multiple arguments and turning it into a sequence of functions each with only a single argument.

```js
```

=============================================================================

# What are classes in ES6
In ES6, Javascript classes are primarily syntactic sugar over JavaScript’s existing prototype-based inheritance. For example, the prototype based inheritance written in function expression as below,

function Bike(model, color) {
  this.model = model;
  this.color = color;
}

Bike.prototype.getDetails = function () {
  return this.model + " bike has" + this.color + " color";
};

===============================================================================

# Closures in JavaScript

## Overview
A **closure** is a function that retains access to its lexical scope, even when the function is executed outside that scope. This allows the function to remember the variables that were in scope at the time it was created.

## Key Concepts

- **Lexical Scope**: A function's scope is determined by where it is defined, not where it is called.
- **Closure Creation**: When a function is defined inside another function, it forms a closure.

## How Closures Work
When an inner function is created, it retains access to its outer function's variables. This allows the inner function to "close over" these variables, even after the outer function has finished executing.

### Use Cases
Data Privacy: Closures can create private variables.
Function Factories: Generate functions with preset configurations.
Event Handlers: Retain state in asynchronous operations.

### Example
```js
function createCounter() {
    let count = 0; // Private variable

    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // Output: 1
console.log(counter.increment()); // Output: 2
console.log(counter.getCount());  // Output: 2
console.log(counter.decrement());  // Output: 1
```

====================================================================================================
# Promises in JavaScript

## Overview
Promises are objects representing the eventual completion or failure of an asynchronous operation. They allow for cleaner asynchronous code, avoiding the pitfalls of callback hell.

## Promise States
A promise can be in one of three states:
- **Pending**: The initial state, neither fulfilled nor rejected.
- **Fulfilled**: The operation completed successfully.
- **Rejected**: The operation failed, with an associated error.

## Creating a Promise
You can create a promise using the `Promise` constructor:

## Promise.all
Promise.all() takes an iterable of promises and returns a single promise that resolves when all promises resolve or rejects if any promise is rejected.

## Promise.allSettled
Promise.allSettled() takes an iterable of promises and returns a single promise that resolves after all of the promises have settled (each may be either resolved or rejected).

## Promise.race
Promise.race() returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with its result or error.


```javascript
To handle the result of a promise, use .then(), .catch(), and .finally() methods.

const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation
    const success = true; // Simulate success or failure
    if (success) {
        resolve("Operation successful!");
    } else {
        reject("Operation failed.");
    }
});

const promise1 = new Promise((resolve, reject) => setTimeout(resolve, 500, "one"));
const promise2 = new Promise((resolve, reject) => setTimeout(resolve, 100, "two"));
const promise3 = 42;


Promise.all([promise1, promise2, promise3])
  .then(values => {
      console.log(values); // [3, "foo", 42]
  })
  .catch(error => {
      console.error("Error:", error);
  });
  
Promise.allSettled([promise1, promise2, promise3])
    .then(results => {
        console.log(results);
        /*
        [
            { status: 'fulfilled', value: 3 },
            { status: 'rejected', reason: 'Error!' },
            { status: 'fulfilled', value: 42 }
        ]
        */
    });
    
Promise.race([promise1, promise2])
    .then(value => {
        console.log(value); // "two"
    });

```


========================================================================================================

## 1. Prototype
Every JavaScript object has an internal property called [[Prototype]] (accessible through __proto__ or Object.getPrototypeOf()). The prototype is essentially a template object from which the current object can inherit properties and methods.

```js
function Person(name) {
    this.name = name;
}

// Adding a method to the prototype
Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name}`);
};

const john = new Person('John');
john.greet(); // Hello, my name is John

```

## 2. Prototype Chain
The prototype chain is a series of links between objects that allows for property and method inheritance. When you try to access a property or method on an object, JavaScript first checks the object itself.

```js
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};

function Dog(name) {
    Animal.call(this, name); // Call the Animal constructor
}

// Set Dog's prototype to an instance of Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Restore the constructor reference

Dog.prototype.speak = function() {
    console.log(`${this.name} barks.`);
};

const dog = new Dog('Rex');
dog.speak(); // Output: Rex barks.


----------------------------------------------

const a = new Array()
a.__proto__.__proto__.__proto__
a -> array properties -> object properties -> null

```


feature	                           Prototype	                                proto
Access	 | All the function constructors have prototype properties. |	All the objects have __proto__ property
Purpose	 | Used to reduce memory wastage with a single copy of function |	Used in lookup chain to resolve methods, constructors etc.
ECMAScript  |	  Introduced in ES6	                                      | Introduced in ES5
Usage	      | Frequently used	                                          | Rarely used
====================================================================================================

## What is IndexedDB
IndexedDB is a low-level API for client-side storage of larger amounts of structured data, including files/blobs. This API uses indexes to enable high-performance searches of this data.

===================================================================================================
# Set and MAP
```js
// Creating a Set
const uniqueNumbers = new Set();

// Adding values
uniqueNumbers.add(1);
uniqueNumbers.add(2);
uniqueNumbers.add(3);
uniqueNumbers.add(2); // Duplicate, will not be added

console.log(uniqueNumbers); // Output: Set { 1, 2, 3 }

// Checking for existence
console.log(uniqueNumbers.has(2)); // Output: true
console.log(uniqueNumbers.has(4)); // Output: false

// Removing a value
uniqueNumbers.delete(2);
console.log(uniqueNumbers); // Output: Set { 1, 3 }

// Iterating through a Set
uniqueNumbers.forEach(value => {
    console.log(value); // Output: 1, 3
});


// Creating a Map
const userRoles = new Map();

// Adding key-value pairs
userRoles.set('Alice', 'admin');
userRoles.set('Bob', 'editor');
userRoles.set('Charlie', 'viewer');

// Accessing values
console.log(userRoles.get('Alice')); // Output: admin
console.log(userRoles.get('David')); // Output: undefined

// Checking for a key
console.log(userRoles.has('Bob')); // Output: true
console.log(userRoles.has('David')); // Output: false

// Removing a key-value pair
userRoles.delete('Charlie');
console.log(userRoles); // Output: Map { 'Alice' => 'admin', 'Bob' => 'editor' }

// Iterating through a Map
userRoles.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});
// Output:
// Alice: admin
// Bob: editor

```

=======================================================================================================
## What is a higher order function
A higher-order function is a function that accepts another function as an argument or returns a function as a return value or both. The syntactic structure of higher order function will be as follows,

```js
const firstOrderFunc = () =>
  console.log("Hello, I am a First order function");
const higherOrder = (ReturnFirstOrderFunc) => ReturnFirstOrderFunc();
higherOrder(firstOrderFunc);
```

======================================================================================================
## Why do we need callbacks
The callbacks are needed because javascript is an event driven language. That means instead of waiting for a response javascript will keep executing while listening for other events. 

```js
function firstFunction() {
  // Simulate a code delay
  setTimeout(function () {
    console.log("First function called");
  }, 1000);
}
function secondFunction() {
  console.log("Second function called");
}
firstFunction();
secondFunction();

Output;
// Second function called
// First function called
```


=======================================================================================================
# JavaScript: Event Delegation

## What is Event Delegation?

Event delegation is a technique in JavaScript where a single event listener is attached to a parent element instead of attaching multiple listeners to individual child elements. This approach leverages the event bubbling mechanism and enhances performance, particularly in scenarios with dynamic content.

## Benefits of Event Delegation

- **Performance Improvement**: Reduces the number of event listeners, making the application more efficient, especially when dealing with many child elements.
- **Simplified Event Management**: Makes it easier to manage events since only one event listener is needed for multiple elements.
- **Support for Dynamic Content**: Automatically applies to newly added child elements without the need to reattach listeners.

## How It Works

When an event occurs on a child element, it bubbles up to the parent element. By placing the event listener on the parent, you can check which child element was interacted with and handle the event accordingly.

## Example

### HTML Structure

```js
<ul id="itemList">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
<button id="addItem">Add Item</button>

const itemList = document.getElementById('itemList');

// Add a single event listener to the parent element
itemList.addEventListener('click', function(event) {
    // Check if the clicked target is an <li> element
    if (event.target.tagName === 'LI') {
        alert(`You clicked on ${event.target.textContent}`);
    }
});

// Adding dynamic items
const addItemButton = document.getElementById('addItem');

addItemButton.addEventListener('click', function() {
    const newItem = document.createElement('li');
    newItem.textContent = `Item ${itemList.children.length + 1}`;
    itemList.appendChild(newItem);
});

```

======================================================================================================
## COMPARE ARRAY AND OBJECT

# JavaScript: Comparing Arrays and Objects

```javascript
 Array
------
function arraysAreEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

const array1 = [1, 2, 3];
const array2 = [1, 2, 3];
const array3 = [3, 2, 1];

console.log(arraysAreEqual(array1, array2)); // true
console.log(arraysAreEqual(array1, array3)); // false

------

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.slice().sort().every((value, index) => value === arr2.slice().sort()[index]);
}


console.log(arraysAreEqual(array1, array2)); // true


==============================================================
const obj1 = { a: 1, b: 2 };
const obj2 = { a: 1, b: 2 };
const obj3 = { b: 2, a: 1 };

for(let key in obj1){

}

```

=============================================================================================
## What is a polyfill
A polyfill is a piece of JS code used to provide modern functionality on older browsers that do not natively support it. For example, Silverlight plugin polyfill can be used to mimic the functionality of an HTML Canvas element on Microsoft Internet Explorer 7.

There are two main polyfill libraries available,

Core.js: It is a modular javascript library used for cutting-edge ECMAScript features.
Polyfill.io: It provides polyfills that are required for browser needs.

=================================================================================================
## What is tree shaking
Tree shaking is a form of dead code elimination. It means that unused modules will not be included in the bundle during the build process and for that it relies on the static structure of ES2015 module syntax,( i.e. import and export). Initially this has been popularized by the ES2015 module bundler rollup.


======================================================================================================
## NO SCRIPT
You can use the <noscript> tag to detect javascript disabled or not. The code block inside <noscript> gets executed when JavaScript is disabled, and is typically used to display alternative content when the page generated in JavaScript.

```js
<script type="javascript">
    // JS related code goes here
</script>
<noscript>
    <a href="next_page.html?noJS=true">JavaScript is disabled in the page. Please click Next Page</a>
</noscript>
```

====================================================================================================
## What are the differences between freeze and seal methods
If an object is frozen using the Object.freeze() method then its properties become immutable and no changes can be made in them whereas if an object is sealed using the Object.seal() method then the changes can be made in the existing properties of the object.

====================================================================================================
## What are javascript accessors
ECMAScript 5 introduced javascript object accessors or computed properties through getters and setters. Getters uses the get keyword whereas Setters uses the set keyword.

```js
var user = {
  firstName: "John",
  lastName: "Abraham",
  language: "en",
  get lang() {
    return this.language;
  },
  set lang(lang) {
    this.language = lang;
  },
};
console.log(user.lang); // getter access lang as en
user.lang = "fr";
console.log(user.lang); // setter used to set lang as fr
```

================================================================================================
## What is an event loop
The event loop is a process that continuously monitors both the call stack and the event queue and checks whether or not the call stack is empty. If the call stack is empty and there are pending events in the event queue, the event loop dequeues the event from the event queue and pushes it to the call stack. The call stack executes the event, and any additional events generated during the execution are added to the end of the event queue.

## What is call stack FILO
Call Stack is a data structure for javascript interpreters to keep track of function calls(creates execution context) in the program. It has two major actions,

Whenever you call a function for its execution, you are pushing it to the stack.
Whenever the execution is completed, the function is popped out of the stack.

## What is an event queue
The event queue follows the queue data structure. It stores async callbacks to be added to the call stack. It is also known as the Callback Queue or Macrotask Queue.

Whenever the call stack receives an async function, it is moved into the Web API. Based on the function, Web API executes it and awaits the result. Once it is finished, it moves the callback into the event queue (the callback of the promise is moved into the microtask queue).


===============
# JavaScript: Micro Tasks and Macro Tasks

## Overview

In JavaScript, tasks are executed in an event loop. They are categorized into two types: **macro tasks** and **micro tasks**. Understanding the distinction between these two types is crucial for managing asynchronous behavior and ensuring proper execution order in your applications.

## Macro Tasks

### Definition

Macro tasks are larger units of work that the event loop handles. They include operations like:
- I/O operations (e.g., reading files)
- Timers (`setTimeout`, `setInterval`)
- Rendering updates in the browser
  
### Execution Order

1. Execute the currently running script.
2. Process all macro tasks in the queue (one at a time).
3. Update the r

# Micro Tasks
Micro tasks are smaller units of work that are processed after the currently executing script and before the next macro task. They include:
- Promise callbacks (Promise.then, Promise.catch, Promise.finally)
- Mutation Observers
  
# Execution Order
1. Execute the currently running script.
2. Process all micro tasks in the queue (all at once).
3. Process the next macro task.
4. Repeat from step 2.

```js
console.log('Start');

setTimeout(() => {
    console.log('Timeout 1'); // Macro task
}, 0);

Promise.resolve().then(() => {
    console.log('Promise 1'); // Micro task
});

setTimeout(() => {
    console.log('Timeout 2'); // Macro task
}, 0);

Promise.resolve().then(() => {
    console.log('Promise 2'); // Micro task
});

console.log('End');

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Timeout 2
```
===================================================================================================
# List down some of the features of ES6
Below are the list of some new features of ES6,

Support for constants or immutable variables
Block-scope support for variables, constants and functions
Arrow functions
Default parameters
Rest and Spread Parameters
Template Literals
Multi-line Strings
Destructuring Assignment
Enhanced Object Literals
Promises
Classes
Modules

==================================================================================
# What are template literals
Template literals or template strings are string literals allowing embedded expressions. These are enclosed by the back-tick (`) character instead of double or single quotes. In ES6, this feature enables using dynamic expressions as below,

```js
var greeting = `Welcome to JS World, Mr. ${firstName} ${lastName}.`;
```

=======================================================================================

# Pipe in JavaScript

Piping is a programming technique that allows you to chain functions together, where the output of one function becomes the input of the next. This pattern promotes code readability and reusability. While JavaScript doesn't have a built-in pipe function, you can easily implement it or use libraries like Lodash or RxJS.

## Key Concepts

### 1. Basic Pipe Function

A simple implementation of a pipe function in JavaScript can be done as follows:

```javascript
const pipe = (...functions) => (input) => functions.reduce((acc, fn) => fn(acc), input);
  const add = (x) => x + 1;
  const multiply = (x) => x * 2;
  const square = (x) => x * x;

const processNumber = pipe(add, multiply, square);

console.log(processNumber(2)); // Output: 36

```
====================================================================================================
# Types of data binding
There are primarily two types of data binding techniques in React: one-way data binding and two-way data binding.

1. One-way data binding
  One-way means that the binding happens in one direction. In this case, changes in the data automatically update the UI, but changes in the UI do not automatically update the data. That’s why it is referred to as one-way data binding.

  React achieves one-way data binding by using state and props.

# Example:
  Props
  Props (short for properties) are the mechanism by which data is passed from a parent component to its children. They are read-only, meaning that child components cannot modify the data received from their parent components.

2. Two-way data binding
  Two-way data binding allows bidirectional data flow, meaning that changes in the UI automatically update the component’s state, and changes in the state automatically update the UI. In React, two-way data binding is achieved using controlled components.

# Example
  Controlled components
  Controlled components are form elements whose values are controlled by the state. They maintain a consistent, bidirectional data flow between the UI components and the data models.
  ex: Input filed 


=========================================================================================================
## 100. Event delegation
Event delegation is a technique in JavaScript that allows you to handle events at a higher level in the DOM instead of attaching event listeners to individual elements. This approach can improve performance and simplify your code, especially when dealing with dynamic content.

```html
<ul id="myList">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>

<script>
    const list = document.getElementById('myList');

    // Add a single event listener to the parent <ul>
    list.addEventListener('click', function(event) {
        // Check if the clicked element is a <li>
        if (event.target.tagName === 'LI') {
            alert(`You clicked on ${event.target.textContent}`);
        }
    });
</script>

```

========================================================================================================
                                      JS IN BUILT METHODS
========================================================================================================
1) How do you find min and max value in an array
```js
  var marks = [50, 20, 70, 60, 45, 30];
  function findMin(arr) {
    return Math.min.apply(null, arr);
  }
  function findMax(arr) {
    return Math.max.apply(null, arr);
  }

  console.log(findMin(marks));
  console.log(findMax(marks)); 
```



```js
function test(a,b){
  a = 20
  b = 30
  return arguments[0] + arguments[1]
}
test(1,2)

remove dupl and sort
const array = [1,2,3,6,9,4,7,5,2,3,0]



const user = {
  name: "John",
  eat() {
    console.log("1-----------------",this.name);
    var eatFruit = () => {
      console.log("2--------------",this.name);
    };
    eatFruit();
  },
};
user.eat();
```




======================================================================================================
                                      JS PROBLEMS
======================================================================================================
```js
const nums = [2,5,2,10,1,7,3,10,2];
let max = nums[0];
for (const i of nums) {  
    if (i > max)        max = i;
    }
console.log("max:", max);// Output: max: 10

--------------------------------------------------------

const nums = [2,5,2,10,1,7,3,10,2];
let uniqueValues = [];

for (const i of nums) {
    if (!uniqueValues.includes(i))
        uniqueValues.push(i);
}

console.log("uniqueValues:", uniqueValues);

// Output: uniqueValues: [ 2, 5, 10, 1, 7, 3 ]
---------------------------------------------------------

// Sample promise functions for demonstration
const p1 = () => new Promise((resolve) => setTimeout(() => resolve("Result from p1"), 1000));
const p2 = (resultFromP1) => new Promise((resolve) => setTimeout(() => resolve(`Result from p2 using ${resultFromP1}`), 1000));
const p3 = () => new Promise((resolve) => setTimeout(() => resolve("Result from p3"), 1000));
const p4 = () => new Promise((resolve) => setTimeout(() => resolve("Result from p4"), 1000));
const p5 = (resultFromP4) => new Promise((resolve) => setTimeout(() => resolve(`Result from p5 using ${resultFromP4}`), 1000));

// Handle promises
Promise.all([p1(), p3(), p4()])  // Handle independent promises
    .then(([resultFromP1, resultFromP3, resultFromP4]) => {
        console.log(resultFromP3); // Log result from p3

        // Handle dependent promises
        return Promise.all([
            p2(resultFromP1), // p2 depends on p1
            p5(resultFromP4)  // p5 depends on p4
        ]);
    })
    .then(([resultFromP2, resultFromP5]) => {
        console.log(resultFromP2); // Log result from p2
        console.log(resultFromP5); // Log result from p5
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });
```