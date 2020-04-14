const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/express-auth";

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
let db = mongoose.connection;
db.on("connected", function () {
  console.log("Mongoose connection open to " + DB_URL);
});

/** * 连接异常 */
db.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});

/** * 连接断开 */
db.on("disconnected", function () {
  console.log("Mongoose connection disconnected");
});

module.exports = mongoose;
