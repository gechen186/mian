// function test() {
//   var a = 100;
//   return function () {
//     console.log(a);
//   };
// }
// var a = 200;

// let test2 = test();
// test2();

// // function print(fn) {
// //   let a = 200;
// //   fn();
// // }
// // let a = 100;
// // function test() {
// //   console.log(a);
// // }
// // print(test);

function fun(n, o) {
  console.log(arguments.slice(''));
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    },
  };
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3);
// var b = fun(0).fun(1).fun(2).fun(3);

// var c1 = fun(0);
// console.log(c1);
// var c2 = c1.fun(1)
// var c3 = c2.fun(2)
// var c4 = c2.fun(3)

function fn() {
  var a = 2;
  return function (){
    console.log(a);
  }
}
var b = fn()
b()

// console.log(c1, c2 ,c3, c4)
// c.fun(2);
// c.fun(3);
