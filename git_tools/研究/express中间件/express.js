const http = require('http');

class LikeExpress {
  constructor() {
    this.router = {
      get: [],
      post: [],
      all: [],
    };
  }

  register(path) {
    let temp = {};
    if (typeof path === 'string') {
      temp.path = path;
      temp.stack = [...arguments].slice(1);
    } else {
      temp.path = '/';
      temp.stack = [...arguments];
    }
    return temp;
  }

  use() {
    let route = this.register.apply(this, arguments);
    this.router.all.push(route);
  }
  get() {
    let route = this.register.apply(this, arguments);
    this.router.get.push(route);
  }
  post() {
    let route = this.register.apply(this, arguments);
    this.router.post.push(route);
  }

  match(url, method) {
    let temp = [].concat(this.router.all).concat(this.router[method]),
      resultList = [];
    temp.forEach((item) => {
      if (url.indexOf(item.path) === 0) {
        resultList.push(...item.stack);
      }
    });
    return resultList;
  }

  handle(req, res, routeList) {
    function next() {
      let current = routeList.shift();
      console.log(current, 'current');
      if (current) {
        current(req, res, next);
      }
    }
    next();
  }

  callback(req, res) {
    // 定义res.json 函数
    res.json = (data) => {
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify(data));
    };
    const url = req.url,
      method = req.method.toLowerCase();
    const routeList = this.match(url, method);
    console.log(routeList, 'aaa');
    this.handle(req, res, routeList);
  }

  listen(...params) {
    http.createServer(this.callback.bind(this)).listen(...params);
  }
}

module.exports = function () {
  return new LikeExpress();
};
