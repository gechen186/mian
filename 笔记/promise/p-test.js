class HD {
  // 定义状态值
  static PENDING = "pending";
  static FULFILLED = "fufilled";
  static REJECTED = "rejected";
  constructor(fn) {
    this.status = HD.PENDING;
    // 终值
    this.value = null;
    // 拒因
    this.reason = null;
    // 回调队列
    this.callbacks = [];
    try {
      // 1. new Promise((resolve,reject)=>{}) 内部函数 fn是定义函数 , 此处的 resolve,reject为形参
      // fn(this.resolve.bind(this), this.reject.bind(this)) 为函数调用，并传入了实参
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value) {
    // 先去看 then
    // 因为 promise A+规范，resolve和 reject 状态改变后不可再次改变所以需要判断当前状态是否为 pending状态
    if (this.status === HD.PENDING) {
      // 改变状态
      this.status = HD.FULFILLED;
      // 将 resolve传入的终值赋值给 静态变量
      this.value = value;
      //
      setTimeout(() => {
        this.callbacks.map((cb) => {
          cb.onFulfilled(this.value);
        });
      }, 0);
    }
  }
  reject(reason) {
    if (this.status === HD.PENDING) {
      this.status = HD.REJECTED;
      this.reason = reason;
      setTimeout(() => {
        this.callbacks.map((cb) => {
          cb.onRejected(this.reason);
        });
      }, 0);
    }
  }
  // then应为同步执行，但是 then的回调为异步 所以需要将 then的参数 函数执行放入异步执行，也就是 resolve和 reject内的 cb调用放入异步
  then(onFulfilled, onRejected) {
    // 因为 promise A+规范 then的两个参数必须为函数
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => {};
    }
    if (typeof onRejected !== "function") {
      onRejected = () => {};
    }
    return new HD((resolve, reject) => {
      console.log('return HD');
      // 因为 promise同步内大部分时候可能有异步任务，所以判断当前状态若为 pending的话
      // 将onFulfilled或 onRejected的 定义函数放入回调队列，等待 resolve或 reject后再调用
      if (this.status === HD.PENDING) {
        // 将 then的回调异常抛出
        this.callbacks.push({
          onFulfilled: (value) => {
            try {
              onFulfilled(value);
            } catch (error) {
              onFulfilled(error);
            }
          },
          onRejected: (reason) => {
            try {
              onRejected(reason);
            } catch (error) {
              onRejected(error);
            }
          },
        });
      }
      if (this.status === HD.FULFILLED) {
        // then中为异步所以放入 setTimeout内
        setTimeout(() => {
          try {
            //第一个 then是在外部人为写了 resolve/ reject来改变状态，这里仍然需要改变状态
            let result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            onRejected(error);
          }
        }, 0);
      }
      if (this.status === HD.REJECTED) {
        setTimeout(() => {
          try {
            onRejected(this.reason);
          } catch (error) {
            onRejected(error);
          }
        }, 0);
      }
    });
  }
}
