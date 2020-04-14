# 用户登录鉴权项目

全局安装 nodemon 启动程序

全过程：

1. 首先用户注册，把信息提交到后台接口，把用户信息，密码加密 写入数据库，密码加密用的是 bcrypt 库，加密 require('bcrypt').hashSync(val,'加密等级'=10); 2.用户登录：首先拿到登录名判断是否有此用户，然后把用户的密码和数据库的加密密码做判断是否一样，用的是 require('bcrypt).compareSync(明文，密文)，返回一个 Boolen；如果为 true，则登录成功，把用户的\_id 映射为 token 返回给服务端，这里用的是 jwt require('jsonwebtoken').sign({id:xxxxxx},'serect'),// serect 是秘钥，一个有意义的字符串 3.服务端拿到 token 后存到 localstronge 里，每次掉接口都写入 header 里（Authorization）带给服务端，服务端拿到后 还是用 jwt 解析 token require('jsonwebtoken').verify(token,'sercet')，拿到解析的对象{id:'xxx'},写进 req.user 里，把解析 token 鉴权封装成一个中间件，

```
  const auth =async (req,res,next)=>{
    const raw = String(req.headers.authorization).split(' ').pop(); // 一般 authorization 会加个标识符，和token 隔开
    const { id } = jwt.verify(raw,Secret);
    req.user = await 根据ID查询数据库内容
    next();
  }

  <!-- 其他需要鉴权的路由先执行auth中间件 -->
  app.get('/list',auth,(req,res)=>{
    ······
  })
```
