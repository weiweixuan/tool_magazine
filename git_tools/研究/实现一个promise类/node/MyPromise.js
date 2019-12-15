/*
      首先定义一个类，初始化入参为一个函数，
      */
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
// 判断变量否为function
const isFunction = variable => typeof variable === "function";

function resolvePromise(p1, x, resolve, reject) {
  if (p1 === x) {
    throw TypeError("循环引用啦");
  }
  let called;
  if ((typeof x !== "object" && x !== null) || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          function(y) {
            if (called) {
              return;
            }
            called = true;
            resolvePromise(p1, y, resolve, reject);
          },
          function(r) {
            if (called) {
              return;
            }
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
}
module.exports = class MyPromise {
  constructor(fn) {
    if (!isFunction(fn)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.resolveList = [];
    this.rejectList = [];
    var resolve = val => {
      if (this.state === PENDING) {
        this.state = RESOLVED;
        this.value = val;
        this.resolveList.map(cb => cb(val));
      }
    };
    var reject = reason => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.rejectList.map(cb => cb(reason));
      }
    };
    try {
      fn(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  // then方法
  then(res, rej) {
    res = typeof res === "function" ? res : v => v;
    rej =
      typeof rej === "function"
        ? rej
        : e => {
            throw e;
          };
    let p1 = new MyPromise((resolve, reject) => {
      // 如果是异步函数，把函数加入订阅数组
      if (this.state === PENDING) {
        this.resolveList.push(() => {
          setTimeout(() => {
            try {
              let x = res(this.value);
              resolvePromise(p1, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.rejectList.push(() => {
          setTimeout(() => {
            try {
              let x = rej(this.reason);
              resolvePromise(p1, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
      if (this.state === RESOLVED) {
        setTimeout(() => {
          try {
            let x = res(this.value);
            resolvePromise(p1, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = rej(this.reason);
            resolvePromise(p1, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
    });
    return p1;
  }
};
