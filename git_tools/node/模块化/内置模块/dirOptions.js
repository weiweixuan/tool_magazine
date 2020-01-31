const fs = require('fs')

function formatErr(err) {
  if (err) {
    console.log('err', err)
  } else {
    console.log('ok')
  }
}
function cb(err, data) {
  formatErr(err)
  console.log(data, 'data')
}
// !创建文件夹
// 异步
// fs.mkdir("demo", err => {
//   if (err) {
//     console.log("err", err);
//   } else {
//     console.log("ok");
//   }
// });
// 同步
// const res = fs.mkdirSync("demoSync");
// if (res) {
//   console.log("err", res);
// } else {
//   console.log("ok");
// }

// !读取文件夹
// fs.readdir("demo", (err, data) => {
//   formatErr(err);
//   console.log(data, "data");
// });

// !更新文件夹名字
// fs.rename("demoSync", "newDemo", cb);

// !删除文件夹(空文件夹)
fs.rmdir('newDemo', cb)
