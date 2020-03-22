let events = require("events");
let fs = require("fs");

// 实例化事件对象
let eventMimi = new events.EventEmitter();

// 读取文件方法

function read_File(path) {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data.toString(), "data");

    // 2s掉一次
    setInterval(() => {
      eventMimi.emit("get_file", data.toString());
    }, 2000);
    // return data;
  });
}

// let res = read_File("./index.html");
// console.log("拿到数据了吗？", res);

read_File("./index.html");
eventMimi.on("get_file", data => {
  console.log(data, "拿到数据了吗？");
});
