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

12. js 代码检查 eslint 配置

- eslint 我们使用 开源社区的 airbnb 的语法规则来校验 eslint-config-airbnb(含有 react 校验规则) 和 eslint-config-airbnb-base(es6 语法，我们使用这个库)
- 安装的依赖有 eslint-loader eslint , airbnb 的依赖有 eslint-config-airbnb-base eslint-plugin-import

```javascript
   // 配置loader
    {
       test: /\.js$/,
       exclude: /node_modules/, // 排除node_modules文件夹检验
       loader: "eslint-loader",
       options: {
         // 自动修复错误
         fix: true,
       },
     },

   // 增加 .eslintrc.js 文件
   // 配置继承插件
   module.exports = {
     extends: "airbnb-base",
     rules: {
      quotes: [1, "double"], // `` "" ''引号类型
    }
   }
```

13. js 代码兼容

```javascript
   /*
      js兼容性处理：babel-loader @babel/core
        1. 基本js兼容性处理 --> @babel/preset-env
          问题：只能转换基本语法，如promise高级语法不能转换
        2. 全部js兼容性处理 --> @babel/polyfill
          问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
        3. 需要做兼容性处理的就做：按需加载  --> core-js
    */

    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        // 预设：指示babel做怎么样的兼容性处理
        presets: [
          [
            "@babel/preset-env",
            {
              // 按需加载
              useBuiltIns: "usage",
              // 指定core-js版本
              corejs: {
                version: 3,
              },
              // 指定兼容性做到哪个版本浏览器
              targets: {
                chrome: "60",
                firefox: "60",
                ie: "9",
                safari: "10",
                edge: "17",
              },
            },
          ],
        ],
      },
    },
```

14. js 代码压缩

- 默认生产环境是对代码压缩的，所以只需要把 mode:'production'即可

15. html 压缩

- 只需要在 HtmlWebpackPlugin 插件里加配置项即可

```javascript
new HtmlWebpackPlugin({
  template: "./src/index.html",
  // 压缩html代码
  minify: {
    // 移除空格
    collapseWhitespace: true,
    // 移除注释
    removeComments: true,
  },
});
```

16. 构建删除 build/ dist 目录

- npm install clean-webpack-plugin --save-dev

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 删除打包目录
 new CleanWebpackPlugin(),
```

17. 配置多页应用

- 首先需要多入口来打包
- 其次需要配置多入口 html

```javascript

   entry: { index: "./src/index.js", login: "./src/login.js" }, // 入口用对象形式 key为 html文件名

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "login.html", //打包输出html文件名称
      template: "./src/login.html", //打包html模版的路径和文件名称
    }),
```

## 前端项目优化

1.  HMR (热模块更新)

```javascript
/*
 HMR: hot module replacement 热模块替换 / 模块热替换
   作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
     极大提升构建速度

     样式文件：可以使用HMR功能：因为style-loader内部实现了~
     js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
       注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。
     html文件: 默认不能使用HMR功能.同时会导致问题：html文件不能热更新了~ （不用做HMR功能）
       解决：修改entry入口，将html文件引入
*/
 devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重新webpack服务
    hot: true
  }
```

2. source-map

```javascript
/*
  source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

    source-map：外部
      错误代码准确信息 和 源代码的错误位置
    inline-source-map：内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误位置
    hidden-source-map：外部
      错误代码错误原因，但是没有错误位置
      不能追踪源代码错误，只能提示到构建后代码的错误位置
    eval-source-map：内联
      每一个文件都生成对应的source-map，都在eval
      错误代码准确信息 和 源代码的错误位置
    nosources-source-map：外部
      错误代码准确信息, 但是没有任何源代码信息
    cheap-source-map：外部
      错误代码准确信息 和 源代码的错误位置 
      只能精确的行
    cheap-module-source-map：外部
      错误代码准确信息 和 源代码的错误位置 
      module会将loader的source map加入

    内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

    开发环境：速度快，调试更友好
      速度快(eval>inline>cheap>...)
        eval-cheap-souce-map
        eval-source-map
      调试更友好  
        souce-map
        cheap-module-souce-map
        cheap-souce-map

      --> eval-source-map  / eval-cheap-module-souce-map

    生产环境：源代码要不要隐藏? 调试要不要更友好
      内联会让代码体积变大，所以在生产环境不用内联
      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

      --> source-map / cheap-module-souce-map
*/
// 改 devtool 配置
{
  devtool: "eval-source-map";
}
```

3.oneOf (解决文件会被多个 loader 循环遍历，编译时间长问题)

```javascript
    {
      module: {
      rules: [
        {
          // 在package.json中eslintConfig --> airbnb
          test: /\.js$/,
          exclude: /node_modules/,
          // 优先执行
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        },
        {
          // 以下loader只会匹配一个
          // 注意：不能有两个配置处理同一种类型文件
          oneOf: [
            {
              test: /\.css$/,
              use: [...commonCssLoader]
            },
            {
              test: /\.less$/,
              use: [...commonCssLoader, 'less-loader']
            },
            /*
              正常来讲，一个文件只能被一个loader处理。
              当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                先执行eslint 在执行babel
            */
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      useBuiltIns: 'usage',
                      corejs: {version: 3},
                      targets: {
                        chrome: '60',
                        firefox: '50'
                      }
                    }
                  ]
                ]
              }
            },
            {
              test: /\.(jpg|png|gif)/,
              loader: 'url-loader',
              options: {
                limit: 8 * 1024,
                name: '[hash:10].[ext]',
                outputPath: 'imgs',
                esModule: false
              }
            },
            {
              test: /\.html$/,
              loader: 'html-loader'
            },
            {
              exclude: /\.(js|css|less|html|jpg|png|gif)/,
              loader: 'file-loader',
              options: {
                outputPath: 'media'
              }
            }
          ]
        }
      ]
    },
  }

```

4.缓存

```javascript
/*
  缓存：
    babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
    文件资源缓存
      hash: 每次wepack构建时会生成一个唯一的hash值。
        问题: 因为js和css同时使用一个hash值。
          如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
      chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题: js和css的hash值还是一样的
          因为css是在js中被引入的，所以同属于一个chunk
      contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样
      --> 让代码上线运行缓存更好使用
*/

// loader
 {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: { version: 3 },
            targets: {
              chrome: '60',
              firefox: '50'
            }
          }
        ]
      ],
      // 开启babel缓存
      // 第二次构建时，会读取之前的缓存
      cacheDirectory: true
    }
  },

  // 路径
  {filename: 'css/built.[contenthash:10].css'}
```

5. 代码分割

```javascript
   /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  /*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
*/
  import(/* webpackChunkName: 'test' */'./test')
    .then(({ mul, count }) => {
      // 文件加载成功~
      // eslint-disable-next-line
      console.log(mul(2, 5));
    })
    .catch(() => {
      // eslint-disable-next-line
      console.log('文件加载失败~');
    });

```
