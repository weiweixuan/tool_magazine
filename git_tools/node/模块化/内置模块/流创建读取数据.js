const fs = require('fs')

// let stream = fs.createWriteStream('./stream.txt')

// Array.from({ length: 10000 }).map(_ =>
//   stream.write('我是写入文件，我要写入1000遍', 'UTF8')
// )

// stream.end()

// stream.on('finish', data => {
//   console.log('写入完成', data)
// })

// stream.on('error', err => {
//   console.log('err', err)
// })

let read = fs.createReadStream('./stream.txt')

let temp = '',
  count = 0
read.on('data', thunk => {
  temp += thunk
  count++
  console.log('传输中')
})

read.on('end', data => {
  console.log('data', count)
})
