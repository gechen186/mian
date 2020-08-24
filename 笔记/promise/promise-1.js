const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class AjPromise {
  constructor(fn) {
    // 当前状态
    this.state = PENDING;
    // 终值
    this.value = null;
    // 拒因
    this.reason = null;
    //成功状态回调队列
    this.onFulfilledCallbacks = [];
    //拒绝状态回调队列
    this.onRejectCallbacks = [];

    //成功状态回调
    const resolve = (value) => {
      // 使用macro-task机制(setTimeout),确保onFulfilled异步执行,且在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
      setTimeout(() => {
        // 只有在 PENDING状态才能变为 FULFILLED状态
        if (this.state === PENDING) {
          this.state = FULFILLED;
          // 终值赋值
          this.value = value;
          console.log('resolve');
          this.onFulfilledCallbacks.map((cb) => {
            console.log("cb");
            this.value = cb(this.value);
          });
        }
      });
    };
    const reject = (reason) => {
      // 使用macro-task机制(setTimeout),确保onRejected异步执行,且在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。 (满足要求 -> 调用时机)
      setTimeout(() => {
        if (this.state === PENDING) {
          // pending(等待态)迁移至 fulfilled(拒绝态),保证调用次数不超过一次。
          this.state = REJECTED;
          //拒因
          this.reason = reason;
          this.onRejectedCallbacks.map((cb) => {
            this.reason = cb(this.reason);
          });
        }
      });
    };

    try {
      fn(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    console.log("then");
    if (typeof onFulfilled === "function") {
      this.onFulfilledCallbacks.push(onFulfilled);
    }
    if (typeof onRejected === "function") {
      this.onRejectedCallbacks.push(onRejected);
    }
    // 返回this支持then 方法可以被同一个 promise 调用多次
    return this;
  }
}

new AjPromise((resolve, reject) => {
  console.log('AjPromise');
  resolve(1);
})
  .then((res) => {
    // console.log(res, "then-1");
    return res + 1;
  })
  .then((res) => {
    // console.log(res, "then-2");
  });
