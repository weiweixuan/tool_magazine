const http = require('http')
/**
 * 创建一个http服务
 * req : 客户端的传递参数
 * res : 给浏览器（客户端）的返回值
 */
http
  .createServer((req, res) => {
    console.log(req.url, 'url')
    // 设置请求头信息
    res.writeHead(200, { 'Content-type': "text/html;charset='utf-8'" })
    // 设置页面的编码方式
    res.write(`
      <head>
        <meta charset="UTF-8" />
      </head>
      <body>
       <h2>hello node js! </h2>
       <h2>你好 nodejs </h2>
      </body>
    </html>
    `)
    res.end('Penny, 今晚吃啥？')
  })
  .listen(5260)
