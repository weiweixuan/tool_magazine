const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const connection = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "",
  database: "mynode" //连接后要进入的数据库
});
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false //不使用第三方的qs模块解析为对象，而是使用querystring这个核心模块
  })
);
const port = 3000;
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.redirect("/login");
  // res.sendFile(__dirname + "/public/login.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/rejester", (req, res) => {
  res.sendFile(__dirname + "/public/rejester.html");
});
// 注册
app.post("/rejester/submit", (req, res) => {
  console.log(req.body, "xxx");
  const { dname, dpwd } = req.body;
  const addInfoSql = `INSERT INTO userinfo ( dname, dpwd) VALUES (?, ?)`;
  connection.query(addInfoSql, [dname, dpwd], (err, data) => {
    if (err) {
      console.log(err, "新增数据失败");
      return;
    }
    if (data.affectedRows) {
      console.log("新增数据成功！");
    }
    res.sendFile(__dirname + "/public/login.html");
  });
});

// 登录
app.post("/login/submit", (req, res) => {
  const { dname, dpwd } = req.body;
  console.log(dname, dpwd, " dname, dpwd");
  const selectInfoSql = `SELECT * FROM userinfo WHERE dname=? && dpwd=? `;
  connection.query(selectInfoSql, [dname, dpwd], (err, data) => {
    if (err) {
      console.log(err, "查询数据失败");
      return;
    }
    if (data.length > 0) {
      console.log(data, "查到数据了！");
      return res.redirect("/main");
    }
    res.send("查询失败");
  });
});

// 首页数据
app.get("/main", (req, res) => {
  const getListSql = `SELECT * FROM list `;
  connection.query(getListSql, (err, data) => {
    if (err) {
      console.log(err, "查询数据失败");
      return res.send("查询失败！");
    }
    if (data.length > 0) {
      console.log(data, "查到数据了！");
      return res.send(data.map(child => JSON.stringify(child)));
    }
    res.send("没有拿到数据！");
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
