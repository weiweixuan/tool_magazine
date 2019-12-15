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
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
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
// 判断是否是promise
let isPromise = val => typeof val.then === "function";

module.exports = class MyPromise {
  static resolve(val) {
    return new MyPromise(resolve => resolve(val));
  }
  static reject(val) {
    return new MyPromise((a, reject) => reject(val));
  }
  static all(arr) {
    return new MyPromise((res, rej) => {
      let temp = [],
        count = 0;
      const processData = (item, key) => {
        temp[key] = item;
        if (++count == arr.length) {
          res(temp);
        }
      };
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (isPromise(item)) {
          item.then(data => processData(data, i));
        } else {
          processData(item, i);
        }
      }
    });
  }
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
      //判断传值是否还是promise
      if (val instanceof MyPromise) {
        return val.then(resolve, reject);
      }
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
  catch(errCallback) {
    return this.then(null, errCallback);
  }
  finally(callback) {
    return this.then(
      data => {
        MyPromise.resolve(callback()).then(i => data);
      },
      err => {
        MyPromise.resolve(callback()).then(() => {
          throw err;
        });
      }
    );
  }
};
