const mongoose = require("./index");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  uname: { type: String, required: true, unique: true },
  upwd: {
    type: String,
    required: true,
  },
  logindate: { type: Date }, //最近登录时间
});

UserSchema.methods.saveData = function (err, data) {
  return new Promise((res) => {
    this.save(function (err, data) {
      if (err) {
        console.log(err, "err");
        res(err);
      } else {
        console.log(data, "data");
        res(0);
      }
    });
  });
};

UserSchema.static("getData", function (data) {
  console.log("调用了吗");
  return new Promise((resolve, reject) => {
    this.find(data, (err, res) => {
      if (err) {
        console.log(err, "查询出错");
        reject(err);
      } else {
        console.log(res, "查询成功");
        resolve(res);
      }
    });
  });
});

// UserSchema.virtual("getAll").get(function() {
//   return this.userName + this.userPwd;
// });

module.exports = mongoose.model("User", UserSchema);
