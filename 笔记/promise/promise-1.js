// const PENDING = "pending";
// const FULFILLED = "fulfilled";
// const REJECTED = "rejected";

// class AjPromise {
//   constructor(fn) {
//     // 当前状态
//     this.state = PENDING;
//     // 终值
//     this.value = null;
//     // 拒因
//     this.reason = null;
//     //成功状态回调队列
//     this.onFulfilledCallbacks = [];
//     //拒绝状态回调队列
//     this.onRejectCallbacks = [];

//     //成功状态回调
//     const resolve = (value) => {
//       // 使用macro-task机制(setTimeout),确保onFulfilled异步执行,且在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
//       setTimeout(() => {
//         // 只有在 PENDING状态才能变为 FULFILLED状态
//         if (this.state === PENDING) {
//           this.state = FULFILLED;
//           // 终值赋值
//           this.value = value;
//           console.log('resolve');
//           this.onFulfilledCallbacks.map((cb) => {
//             console.log("cb");
//             this.value = cb(this.value);
//           });
//         }
//       });
//     };
//     const reject = (reason) => {
//       // 使用macro-task机制(setTimeout),确保onRejected异步执行,且在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。 (满足要求 -> 调用时机)
//       setTimeout(() => {
//         if (this.state === PENDING) {
//           // pending(等待态)迁移至 fulfilled(拒绝态),保证调用次数不超过一次。
//           this.state = REJECTED;
//           //拒因
//           this.reason = reason;
//           this.onRejectedCallbacks.map((cb) => {
//             this.reason = cb(this.reason);
//           });
//         }
//       });
//     };

//     try {
//       fn(resolve, reject);
//     } catch (err) {
//       reject(err);
//     }
//   }
//   then(onFulfilled, onRejected) {
//     console.log("then");
//     if (typeof onFulfilled === "function") {
//       this.onFulfilledCallbacks.push(onFulfilled);
//     }
//     if (typeof onRejected === "function") {
//       this.onRejectedCallbacks.push(onRejected);
//     }
//     // 返回this支持then 方法可以被同一个 promise 调用多次
//     return this;
//   }
// }

// new AjPromise((resolve, reject) => {
//   console.log('AjPromise');
//   resolve(1);
// })
//   .then((res) => {
//     // console.log(res, "then-1");
//     return res + 1;
//   })
//   .then((res) => {
//     // console.log(res, "then-2");
//   });


/* 
  1. resolve里的 setTimeout   push进了回调队列中的函数调用到 “宏任务队列”
  2. then中的 new HD又一次调用了 HD类，并且这次的 HD调用又调用了 HD类中的 executor函数
    但是因为在外部的 new HD中 this.status已经改变为 fulfilled 所以此次进入了 this.status == HD.FULFILLED判断
    将 this.parse 推入 “宏任务队列”
  3. 内部 new HD返回的 promise没有改变状态 所以是 pending
  4. 此时进入了第二个 then，又一次调用内部new HD 因为第二个 promise内部 new HD返回的 promise没有改变状态 所以进入 pending判断
  5. 第二个 then将 onFulfilled/onRejected，推入 callbacks等待执行，所返回的 promise仍然是 pending

  6. 此时所有同步人物制定完毕，开始执行 1. 中的回调任务
*/