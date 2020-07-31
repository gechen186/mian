// 模拟 bind

//call

Function.prototype.call1 = function(...arg) {
  console.log(arg);
  const t = arg.shift();
  
  t.fn = this;
  const res = arg.length > 0 ? t.fn(...arg) : t.fn();
  return res;
};

Function.prototype.call1 = function (...args) {
  // 将参数拆解为数组
  // const args = Array.prototype.slice.call(arguments)

  // 获取 this（数组第一项）
  let t = args.shift();
  t.fn = this;
  const res = args.length > 0 ? t.fn(...args) : t.fn;
  return res;
  // return function () {
  //   return self.apply(t, args);
  // };
};
// Function.prototype.bind1 = function (...args) {
//     // 将参数拆解为数组
//     // const args = Array.prototype.slice.call(arguments)

//     // 获取 this（数组第一项）
//     const t = args.shift()

//     // fn1.bind(...) 中的 fn1
//     const self = this

//     // 返回一个函数
//     return function () {
//         return self.apply(t, args)
//     }
// }

function fn1(a) {
  console.log("this", this.x);
  console.log(a);
  return "this is fn1";
}

const fn2 = fn1.call1({ x: 100 }, 1);
console.log(fn2);
// const res = fn2();
// console.log(res);
