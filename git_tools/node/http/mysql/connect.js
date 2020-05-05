const mysql = require("mysql");

const connection = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "",
  database: "jd" //连接后要进入的数据库
});

connection.query(
  "INSERT INTO `student`(`id`, `name`, `sex`, `score`) VALUES (?,?,?,?)",
  [22, "xhr", "M", -100],
  (err, data) => {
    if (err) {
      console.log(err, "err");
      return;
    }
    console.log(data, "插入成功");
  }
);

connection.query("SELECT * FROM student", (err, data) => {
  if (err) {
    console.log(err, "err");
    return;
  }
  console.log(data, "连接成功");
});
