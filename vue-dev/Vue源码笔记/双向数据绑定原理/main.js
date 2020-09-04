// var MVVM = require('./MVVM.js');

// new MVVM({
//   el: "#app",
//   data: {
//     message: { 
//       a: "jwa" ,
//       c:{
//         e:'呵呵呵'
//       }
//     },
//     b: "MVVM",
//   },
// });

let a = [1,2,3,4,5,6,7,8,9,10]
let b = []
let c = []

function test(arrA, arrB, arrC) {
  let num = arrA.shift()
  if(num === 10){
    arrC.push(num)
  }else{
    arrB.push(num)
  }
  return arrC
}

console.log(test(a,b,c));