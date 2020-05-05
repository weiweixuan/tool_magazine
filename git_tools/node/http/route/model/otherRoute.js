module.exports = {
  "/login/": function(req, res) {
    res.writeHead(200, 'Content-Type:text/html;charset="utf-8"');
    res.end(`
        <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <form action="doLogin" method="POST">
          <input type="text" name="user" />
          <input type="password" name="mm" />
          <input type="submit" value="提交" />
        </form>
      </body>
    </html>
`);
  },
  "/doLogin/": function(req, res) {
    // req.paramsBody 拿到 传递过来的值
    console.log(req.paramsBody, "req.params.body,");
    res.writeHead(200, 'Content-Type:text/html;charset="utf-8"');
    res.end("main");
  },
  "/main/": function(req, res) {
    res.writeHead(200, 'Content-Type:text/html;charset="utf-8"');
    res.end("main");
  },
  "/setting/": function(req, res) {
    res.writeHead(200, 'Content-Type:text/html;charset="utf-8"');
    res.end("setting");
  },
  "/notFound/": function(req, res) {
    res.writeHead(200, 'Content-Type:text/html;charset="utf-8"');
    res.end("404");
  }
};
