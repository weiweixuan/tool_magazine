var express = require("express");
var router = express.Router();
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let User = require("../models/user");

// 例如密钥
const SERCET = "SERCET";
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/layout", function (req, res, next) {
  let arr = Array.from({ length: 100 }, (a, _) => ({ title: _ + "xxx" }));
  res.send(arr);
});

// 注册接口
router.post("/register", function (req, res, next) {
  console.log(req.body, "req222");
  const { uname, upwd } = req.body;
  if (!uname || !upwd) {
    res.send({ __code__: 1, message: "参数错误", data: {} });
    return;
  }
  let u = new User({
    uname,
    upwd: bcrypt.hashSync(upwd, 10),
    logindate: +new Date(),
  });
  u.saveData().then((d) => {
    res.send({
      __code__: d ? 1 : 0,
      message: d || "注册成功！",
      data: {},
    });
  });
});

// // 登录接口
router.post("/login", function (req, res) {
  console.log(req.body, "reqiiii[[[[[i");
  const { uname, upwd } = req.body;
  if (!uname || !upwd) {
    res.send({ __code__: 1, message: "参数错误", data: {} });
    return;
  }
  User.getData({ uname })
    .then((data) => {
      if (!!data.length) {
        const item = data[0];
        // 验证密码
        if (bcrypt.compareSync(upwd, item.upwd)) {
          res.send({
            __code__: 0,
            message: "登录成功",
            data: {},
            token: jwt.sign({ id: item._id }, SERCET),
          });
        } else {
          res.send({ __code__: 1, message: "密码错误", data: {} });
        }
      } else {
        res.send({ __code__: 1, message: "该用户没有注册", data: {} });
      }
    })
    .catch((err) => {
      res.send({ __code__: 1, message: "网络错误", data: {} });
    });
});

module.exports = router;
