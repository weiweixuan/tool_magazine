const http = require('http')
const fs = require('fs')
http
  .createServer((request, response) => {
    console.log('request come ===> ', request.url)
    if (request.url === '/') {
      response.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
        // 'Cache-Control': 'max-age=10'
      })
      response.end('123')
    } else if (request.url === '/script') {
      response.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'max-age=10'
      })
      response.end('console.log("text script!!!")')
    }
  })
  .listen(8888)

console.log('server 8888 start!')
