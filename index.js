// function a() {
//   console.log('enter a');
//   b();
//   console.log('exit a');
// }
// function b() {
//   console.log('enter b');
//   c();
//   console.log('exit b');
// }
// function c() {
//   console.log('in c');
// }
// a();

console.log(x); // undefined (var is hoisted)
var x = 1;
console.log(x); // 1

console.log(y); // ReferenceError (let/const not accessible yet)
let y = 2;

sayHi(); // "hi" — works (function declaration hoisted)
function sayHi() { console.log('hi'); }

sayHello(); // TypeError: sayHello is not a function
var sayHello = function() { console.log('hello'); };