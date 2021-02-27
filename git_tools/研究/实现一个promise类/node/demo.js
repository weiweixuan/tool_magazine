const MyPromise = require('./MyPromise.js');
let p1 = new MyPromise(function (resolve, reject) {
  setTimeout(() => {
    resolve('成功啦！');
  }, 1000);
});
p1.then(
  (res) => {
    console.log(res, 'res');
    return '我看看';
  },
  (rej) => {
    console.log(rej, 'rej');
    return 000;
  },
).then((res) => {
  console.log(res, '222');
  return 222;
});
