# node 笔记

- 安装 node 提示插件 （Node Snippets）

- 安装 node 文件自动更新工具
  - npm install -g supervisor
  - 后面启动用 supervisor 文件名即可

# Commonjs 模块化

- 可以自定义一些方法向外暴露，其他模块可以引入使用

  ```javascript
  // exports导出

  // a.js
  exports.name = 'xiaoming'
  exports.age = 12
  // b.js
  const data = require('a.js')
  data // {name:'xiaoming',age:12}

  // modules.export导出

  // a.js
  modules.export = {
    name: 'xiaoming',
    age: 12
  }
  //b.js
  const data = require('a.js')
  data // {name:'xiaoming',age:12}
  ```

- npm init -y 可以创建 package.json 文件，可以指定该目录访问的主文件

# http 模块

```javascript

 response.writeHead(statusCode[, statusMessage][, headers])

//  向请求发送响应头。 状态码是一个 3 位的 HTTP 状态码，如 404。 最后一个参数 headers 是响应头。 可以可选地将用户可读的 statusMessage 作为第二个参数。
//  返回对 ServerResponse 的引用，以便可以链式调用。
 const body = 'hello world';
response
 .writeHead(200, {
   'Content-Length': Buffer.byteLength(body),
   'Content-Type': 'text/plain'
 })
 .end(body);
```

# fs 模块

- 判断一个文件是文件夹还是文件：
  ```javascript
  fs.stat('./xxx', (err, data) => {
    if (data.isFile()) {
      console.log('我是文件')
    } else if (data.isDirectory()) {
      console.log('我是文件夹')
    }
  })
  ```
- 创建一个文件夹

  ```javascript
  fs.mkdir('./css', err => {
    if (err) {
      console.log(err)
      return
    }
  })
  ```

- 创建一个文件，并写入内容(如果文件不存在直接创建并写入，如果存在，直接替换内容)

  ```javascript
  fs.writeFile('./index.html', '你好，我是HTML', err => {
    if (err) {
      console.log(err, 'err')
      return
    }
  })
  ```

- 创建一个文件，并追加内容(如果文件不存在直接创建并写入，如果存在，直接追加写入内容)

  ```javascript
  fs.appendFile('./css/base.css', 'body{color:red;}', err => {
    if (err) {
      console.log(err, 'err')
      return
    }
  })
  ```

- 读取一个文件内容

  ```javascript
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      console.log(err, 'err')
      return
    }
    console.log(data, 'data') // buffer
    console.log(data.toString())
  })
  ```

- 读取一个文件夹内容

  ```javascript
  fs.readdir('./css', (err, data) => {
    if (err) {
      console.log(err, 'err')
      return
    }
    console.log(data, 'data')
  })
  ```

- 重命名一个文件名字(或者移动一个文件)

  ```javascript
  // 也可以newPath指定为要移动到的位置
  // oldPath , newPath , cb
  fs.rename('./css/base.css', './css/temp/other.css', err => {
    if (err) {
      console.log(err, 'err')
      return
    }
  })
  ```

- 删除一个文件
  ```javascript
  fs.unlink('./css/temp/other.css', err => {
    if (err) {
      console.log(err, 'err')
      return
    }
  })
  ```
- 删除一个文件夹（如果文件夹里有内容，先需要把文件夹内容都删除掉才可以删除文件夹）
  ```javascript
  fs.rmdir('./css', err => {
    if (err) {
      console.log(err, 'err')
      return
    }
  })
  ```
