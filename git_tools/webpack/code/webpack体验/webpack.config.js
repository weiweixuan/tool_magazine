/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
// webpack 是基于node 运行打包的 配置文件里 遵循 CommonJs规范

const { resolve, join } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包html的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将js 处理的css文件 打包生成一个单独的css文件，link进html中
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); // 将css 文件压缩
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 删除打包目录

process.env.NODE_ENV = "development"; // 开发环境

module.exports = {
  // entry: "./src/index.js",
  entry: { index: "./src/index.js", login: "./src/login.js" },
  output: {
    filename: "js/[name].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
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
      {
        test: /\.less$/,
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
          "less-loader",
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8 * 1024,
              name: "[hash:10].[ext]", // 保留前十位
              outputPath: "images",
            },
          },
        ],
      },
      { test: /\.html$/, loader: "html-loader" },
      {
        exclude: /\.(css|less|js|html|jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash:10].[ext]",
              outputPath: "media",
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules文件夹检验
        loader: "eslint-loader",
        enforce: "pre", // 同时有多个loader 来处理通类型的文件时，需要指定优先执行的loader
        options: {
          // 自动修复错误
          fix: true,
        },
      },
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
          // 开启babel缓存
          // 第二次构建时，会读取之前的缓存
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      // minify: {
      //   // 移除空格
      //   collapseWhitespace: true,
      //   // 移除注释
      //   removeComments: true,
      // },
    }),
    new HtmlWebpackPlugin({
      filename: "login.html", // 打包html模版的路径和文件名称
      template: "./src/login.html", // 打包html模版的路径和文件名称
      // minify: {
      //   //对html文件进行压缩
      //   removeAttributeQuotes: true, //去掉属性的双引号
      //   removeComments: true, //去掉注释
      //   collapseWhitespace: true, //去掉空白
      // },
      // inject:true,
      // hash:true, //避免缓存js。
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css", // 生成的文件路径
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "development",
  devServer: {
    // contentBase: resolve(__dirname, "build"),
    contentBase: join(__dirname, "build"),
    compress: true,
    port: 9000,
    open: true,
  },
};
