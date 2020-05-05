const fs = require("fs");
const url = require("url");
const routers = require("./otherRoute");

const App = () => {
  const R = this;
  this.get = {};
  this.post = {};

  const router = (req, res) => {
    // icon 放行
    if (req.url === "/favicon.ico") return;

    let pathname = url.parse(req.url).pathname;
    const method = req.method.toLocaleLowerCase();
    // 路由格式化
    if (!pathname.startsWith("/")) {
      pathname = "/" + pathname;
    }
    if (!pathname.endsWith("/")) {
      pathname = pathname + "/";
    }
    if (pathname === "/") {
      pathname = "/main/";
    }
    if (R[method][pathname]) {
      if (method === "post") {
        let str = "";
        req.on("data", thunk => {
          str += thunk;
        });
        req.on("end", () => {
          req.paramsBody = str;
          R.post[pathname](req, res);
        });
      } else {
        R[method][pathname](req, res);
      }
    } else {
      R.get["/notFound/"](req, res);
    }
  };

  router.get = (path, cb) => {
    if (!R.get[path]) {
      R.get[path] = cb;
    }
  };

  router.post = (path, cb) => {
    if (!R.post[path]) {
      R.post[path] = cb;
    }
  };

  // 注册模块
  console.log(routers, "routers");
  Object.keys(routers).forEach(path => {
    router.get(path, routers[path]);
    router.post(path, routers[path]);
  });

  return router;
};

module.exports = App();
