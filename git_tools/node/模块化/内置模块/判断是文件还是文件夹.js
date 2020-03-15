const fs = require('fs')

fs.stat('./demo', (err, data) => {
  if (err) {
    console.log(err, 'err')
    return
  }
  // 拿到文件信息，开始判断
  if (data.isFile()) {
    console.log('我是文件')
  } else if (data.isDirectory()) {
    console.log('我是文件夹')
  }
})

fs.unlink('./css/temp/other.css', err => {
  if (err) {
    console.log(err, 'err')
    return
  }
})
