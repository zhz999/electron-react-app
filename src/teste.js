

let arr = [1, 2, 3];
let index = 5;
let fillValue = null;

arr = arr.concat(Array(index - arr.length).fill(fillValue));

arr.splice(index, 0, 'element');
console.log(arr); // [1, 2, 3, 0, 0]
