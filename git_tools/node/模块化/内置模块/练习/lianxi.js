// 1. 判断服务器（./fwq）上有没有upload目录，如果没有，创建，如果有不做处理

const fs = require('fs')
function DoSomeHomeWork(path = './', dirName = '') {
  const allPath = path + '/' + dirName
  fs.stat(allPath, async (err, data) => {
    if (err) {
      console.log(err, '不存在' + dirName + '文件夹')
      // 不存在文件夹，创建
      createDir(allPath)
      return
    }
    // 存在文件名相同的文件或者文件夹，做判断
    if (data.isFile()) {
      console.log('是个文件')
      let res = await delFile(allPath)
      if (!res) {
        createDir(allPath)
      }
    } else if (data.isDirectory()) {
      console.log('是个文件夹')
    }
  })
}
// 创建一个文件夹
function createDir(allPath) {
  fs.mkdir(allPath, err => {
    if (err) {
      console.log(err, '创建文件错误')
      return
    }
    console.log('创建成功！')
  })
}
function delFile(path) {
  return fs.unlinkSync(path)
}

// DoSomeHomeWork('./fwq', 'upload')

// 第三方模块开发
const mkdirp = require('mkdirp')
mkdirp('./fwq/upload').then(made =>
  console.log(`made directories, starting with ${made}`)
)
