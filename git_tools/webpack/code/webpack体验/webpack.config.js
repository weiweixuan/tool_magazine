// webpack 是基于node 运行打包的 配置文件里 遵循 CommonJs规范

const { resolve, join } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin"); // 打包html的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将js 处理的css文件 打包生成一个单独的css文件，link进html中
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin"); // 将css 文件压缩

process.env.NODE_ENV = "development"; // 开发环境

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/built.js",
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
          "less-loader",
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  mode: "development",
  devServer: {
    // contentBase: resolve(__dirname, "build"),
    contentBase: join(__dirname, "build"),
    compress: true,
    port: 9000,
    open: true,
  },
};
