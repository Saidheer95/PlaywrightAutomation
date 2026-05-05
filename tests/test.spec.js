import { test } from '@playwright/test';

// function checkmarks(marks){
//     if (marks>=40){
//         console.log("Pass");
//     } else {
//         console.log("Fail");
//     }
// }

// test('Sample Test', async () => {
//     const marks = 14; // Example marks
//     checkmarks(marks);
// })

let name="John Doe";
let age=30;
let user="Student";
console.log(name);
console.log(age);
console.log(user);  

console.log(`Name: ${name}, Age: ${age}, User: ${user}`);


console.log(19 % 3);
console.log(10 == 3);
console.log(10 !== "10");
console.log(2 < "10");
console.log("5" > 2);
console.log((false && true) || false);

let colors = ["Red", "Green", "Blue"];
console.log(colors[0]);
console.log(colors.length);
colors.push("black");
console.log(colors);
colors.shift();
[colors[0], colors[1]] = [colors[1], colors[0]];    
console.log(colors);
colors.unshift("Yellow");
console.log(colors);
