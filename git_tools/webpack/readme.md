- 项目使用的依赖包统一都放在外层目录下

1. 直接使用 webpack 命令打包 ： webpack ./src/index.js -o ./build/built.js --mode=development (development / production)

2. webpack 解析 css

- 新建 webpack.config.js 配置文件
- 添加 loader
  ```javascript
   {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
  ```

3.  解析 less 文件

- 添加 loader (依赖需要安装 less ： npm i less less-loader -D)

```javascript
 {
      test: /\.less$/,
      use: ["style-loader", "css-loader",'less-loader'],
    },
```

4. 打包 html 文件资源

- 使用到 html-webpack-plugin 插件 plugins （cnpm i html-webpack-plugin -D）

在 webpack.config.js 里的 plugins 数组里配置一下：

```javascript
  // 先引入 插件
  const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包html的插件
  // template 是指定使用的html模板，复制过来，加入打包的资源
   plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
```

5. 打包图片资源

- js 或者 css 里引用的图片资源
  - 使用 url-loader 和 file-loader
  ```javascript
     {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8 * 1024, // 图片8k以内 base64处理
              name:'[hash:10].[ext]' // 保留前十位
            },
          },
        ],
      },
  ```
- html 里引用图片资源
  - 使用 html-loader
  ```javascript
     {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
  ```

6. 打包字体图标资源

- 引入 iconfont.css 文件，配置 file-loader

```javascript
  {
      exclude: /\.(css|less|js|html|jpg|png|gif)$/, // 排除下面的文件类型
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[hash:10].[ext]",
          },
        },
      ],
    },
```

7. 编译热更新

- 依赖 devServer (npm i webpack-dev-server -D)
- 在 webpack.config.js 中增加配置 devServer

```javascript
   devServer: {
  // contentBase: resolve(__dirname, "build"),
  contentBase: join(__dirname, "build"), // 打开文件目录
  compress: true, // 启用gzip压缩
  port: 9000, // 端口号
  open: true, // 打开浏览器
},
```

8. 修改输入文件夹层级

- 分为入口文件和其他文件
  ```javascript
  output: {
    filename: "js/built.js",  // js文件夹下
    path: resolve(__dirname, "build"),
  },
  {
    exclude: /\.(css|less|js|html|jpg|png|gif)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",  // 输出路径
        },
      },
    ],
  },
  ```

9. 生产模式需要把 css 和 js 剥离开来，提升加载速度

- 需要用插件 mini-css-extract-plugin （npm i mini-css-extract-plugin -D)

```javascript
    const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将js 处理的css文件 打包生成一个单独的css文件，link进html中
    // 修改css的loader配置，现在不需要style-loader来生成标签写在header里了，
     {
      test: /\.css$/,
      use: [
        // "style-loader",
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../", // 这个配置是因为下面css filename 在css目录下，所以需要返回上级目录
          },
        },
        "css-loader",
      ],
    },
    // 增加plugin配置
     new MiniCssExtractPlugin({
      filename: "css/built.css",
      }),
```

10. css 兼容性

- 首先要安装 postcss-loader , postcss-preset-env
- 在 loader 中加配置：

```javascript
     // node环境变量默认是生产模式，开发模式需要手动设置一下
     process.env.NODE_ENV = "development"; // 开发环境

     {
       test: /\.css$/,
       use: [
         // "style-loader",
         {
           loader: MiniCssExtractPlugin.loader,
           options: {
             publicPath: "../",
           },
         },
         "css-loader",
         {
           loader: "postcss-loader",
           options: {
             ident: "postcss",
             plugins: () => [require("postcss-preset-env")()],
           },
         },
       ],
     },
   // 同时需要修改 package.json 中的browerslist配置
  "browserslist": {
     // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
     "development": [
       "last 1 chrome version",
       "last 1 firefox version",
       "last 1 safari version"
     ],
     // 生产环境：默认是看生产环境
     "production": [
       ">0.2%",
       "not dead",
       "not op_mini all"
     ]
   }
```

11. css 代码压缩

- 使用的是插件 optimize-css-assets-webpack-plugin
- 使用也很简单 引入 ，实例化即可

```javascript
  const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

   plugins: [
      new OptimizeCssAssetsWebpackPlugin(),
    ],
```
