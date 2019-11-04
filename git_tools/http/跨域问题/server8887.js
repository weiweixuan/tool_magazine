const http = require('http')
const fs = require('fs')
http
  .createServer((request, response) => {
    let html = fs.readFileSync('./client.html', 'utf8')
    response.end(html)
  })
  .listen(8887)

console.log('server 8887 start!')
