const fs = require("fs");
function formatErr(err) {
  if (err) {
    console.log("err", err);
  } else {
    console.log("ok");
  }
}
function cb(err, data) {
  formatErr(err);
  console.log(data, "data");
}

// 创建文件，写入内容（替换）
fs.writeFile("a.txt", "hello!", cb);
// 创建文件，写入内容（追加）
fs.appendFile("a.txt", " hi!", cb);
// 读文件内容
fs.readFile("a.txt", "utf8", cb);
// 修改文件名
fs.rename("a.txt", "b.txt", cb);
// 删除文件
setTimeout(() => {
  fs.unlink("b.txt", cb);
}, 3000);
