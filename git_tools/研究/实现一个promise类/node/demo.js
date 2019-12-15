const MyPromise = require("./MyPromise.js/index.js");
let p1 = new MyPromise(function (resolve, reject) {
  setTimeout(() => {
    resolve("成功");
  }, 1000);
});
p1.then(
  res => {
    console.log(res, "res");
  },
  rej => {
    console.log(rej, "rej");
  }
);
