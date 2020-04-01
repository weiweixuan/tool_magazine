var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/layout", function(req, res, next) {
  let arr = Array.from({ length: 100 }, (a, _) => ({ title: _ + "xxx" }));
  res.send(arr);
});

router.post("/login", function(req, res, next) {
  console.log(req.body, "req");
  // let arr = Array.from({ length: 100 }, (a, _) => ({ title: _ + "xxx" }));
  res.send(JSON.stringify(req.body));
});

module.exports = router;
