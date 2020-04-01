# 搭建 express 脚手架项目

[点击 express 官网教程](https://www.expressjs.com.cn/starter/generator.html)

> 补充: 因为每次都要动服务器代码, 都需要重启服务器,很烦

               可以全局安装一个模板 nodemon
               1) 全局安装 nodemon
                   cnpm i nodemon -g

               2) 使用nodemon 替代 node 启动项目
                  原来:  node app
                  现在:  nodemon app

> 路由分配:

    1) 在routes下面 新建一个子路由文件
        vip.js

    2) 在主路由文件 app.js里面 改动 两处
        a) 在第8行左右 引入路由
            var vipRouter = require('./routes/vip');

        b) 在25行左右 分配路由  /vip 下面的请求 都交给vip路由处理
            app.use('/vip', vipRouter);

    3) 以上步骤完成, 就可以在vip.js 这个路由里面 接收前端发送的 /vip下面的请求

> res 响应对象(**\***)

    res主要负责 后端向前端 响应(发送)数据(如果接收了请求 不响应,会一直挂起(转圈圈))

    主要方法:
        1) res.send() (*****)  // 万能方法  可以响应JSON 字符串 HTML script
        2) res.json()  // 主要给前端响应 JSON 数据
        3) res.jsonp() // 主要给前端响应 JSON 数据(针对跨域请求)

        4)  数据和模板在后端合并渲染 生成HTML 返回给前端
             res.render('ejs模板文件', {JSON对象格式的数据})
        5) res.download('要下载的文件的路径', '标题')
        6) res.redirect("要跳转到的新的网址url")
        7) res.status(状态码404).render("ejs模板名字", {JSON对象格式的数据})

> req 请求对象(**\***)

    req主要负责 接收前端发送过来的数据(参数)

    主要方法:
        a) 接收 get 方式的请求的参数
            req.query.参数的key值

        b) 接收 post 方式的请求的参数
            req.body.参数的key值

            表单中含有文件上传，那么还是需要使用formidable模块。

        c) 补充:
            req.ip  获取浏览器的ip地址

> favicon.ico 图标配置

```
在 myapp 下的 public/images 添加文件 favicon.ico

打开 myapp 下的 app.js 在其中添加

var favicon = require('serve-favicon');
app.use(favicon(\_\_dirname+'/public/images/favicon.ico'));
然后通过命令行安装 serve-favicon

cnpm install serve-favicon --save
重新启动项目

set DEBUG=myapp & npm start
注意要清除缓存，这样我们就可以在新开的  http://localhost:3000/  中看到图标了
```

> req.cookies：

当使用 cookie-parser 中间件的时候，这个属性是一个对象，其包含了请求发送过来的 cookies。如果请求没有带 cookies，那么其值为{}。如果没有指定 cookie parser,那么保存 cookie 的地址为 req.headers.cookie!很多属性都保存在 req.headers 空间下面
