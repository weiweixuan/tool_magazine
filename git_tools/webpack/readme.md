- 项目使用的依赖包统一都放在外层目录下

1. 直接使用 webpack 命令打包 ： webpack ./src/index.js -o ./build/built.js --mode=development (development / production)

2. webpack 解析 css

- 新建 webpack.config.js 配置文件
- 添加 loader
  ```
   {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
  ```

3.  解析 less 文件

- 添加 loader (依赖需要安装 less ： npm i less less-loader -D)

```
 {
      test: /\.less$/,
      use: ["style-loader", "css-loader",'less-loader'],
    },
```
