let http = require("http");
let fs = require("fs");
let path = require("path");
let url = require("url");
const BASEURL = "static";

function getExtName(params) {
  switch (params) {
    case ".html":
      return "text/html";
      break;
    case ".css":
      return "text/css";
      break;
    case ".js":
      return "text/javascript";
      break;
    default:
      return "text/html";
      break;
  }
}
http
  .createServer((req, res) => {
    // console.log(req.url, "---");
    let url_ = url.parse(req.url).pathname;
    url_ = url_ == "/" ? "/index.html" : url_;
    // 判断请求的路径，返回对应的页面
    if (url_ != "/favicon.ico") {
      console.log(BASEURL + url_, "BASEURL + url");
      fs.readFile(BASEURL + url_, (err, data) => {
        if (err) {
          fs.readFile(BASEURL + "/404.html", (error404, data404) => {
            res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
            res.write(data404);
            res.end();
          });
          return;
        } else {
          let extName = getExtName(path.extname(url_));
          console.log(extName, "extname");
          res.writeHead(200, { "Content-Type": `${extName};charset='utf-8'` });
          res.write(data);
          res.end();
        }
      });
    }
  })
  .listen(8001);
