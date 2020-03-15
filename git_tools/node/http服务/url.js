const http = require('http')
// const qs = require('querystring')
const url = require('url')
/**
 * 创建一个http服务,拿到用户get方法提交的参数，显示在页面上
 * req : 客户端的传递参数
 * res : 给浏览器（客户端）的返回值
 */
http
  .createServer((req, res) => {
    // 设置请求头信息
    res.writeHead(200, { 'Content-type': "text/html;charset='utf-8'" })
    // 设置页面的编码方式
    res.write(`
      <head>
        <meta charset="UTF-8" />
      </head>
    </html>
    `)
    if (req.url != '/favicon.ico') {
      const obj = url.parse(req.url, true).query
      let html = ''
      for (let key in obj) {
        html += `${key}为${obj[key]} `
      }
      return res.end(html)
    }
    res.end('Penny, 今晚吃啥？')
  })
  .listen(5260)
