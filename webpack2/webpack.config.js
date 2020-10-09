const path = require("path"); // 从nodejs中引入path变量
const htmlPlugin = require("html-webpack-plugin"); // html模板 plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 删除 dist的 plugin
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 提取css
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/m.js",
    // sub: "./src/index.js",
  }, // 从哪一个文件开始打包
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    // publicPath: '/',
    filename: "[name].js", // 打包后生成的文件的名字
    path: path.resolve(__dirname, "dist"), // 打包到哪个文件夹下面 __dirname 当前文件夹的一个路径
  },
  // modules: true,
  module: {
    // 模块打包配置
    rules: [
      // 新增规则 可以有很多，数组，loader就是一个打包方案
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // options: {
          // presets: [
          //   [
          //     "@babel/preset-env",
          //     {
          //       useBuiltIns: "usage",
          //     },
          //   ],
          // ],
          // plugins: [
          //   [
          //     "@babel/plugin-transform-runtime",
          //     {
          //       absoluteRuntime: false,
          //       corejs: 2,
          //       helpers: true,
          //       regenerator: true,
          //       useESModules: false,
          //       version: "7.0.0-beta.0",
          //     },
          //   ],
          // ],
        // },
      },
      {
        test: /\.(jpg|jpeg)$/, // 检测文件是jpg结尾的
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash].[ext]",
            publicPath: "./img/",
            outputPath: "img/",
            limit: 1024 * 20,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // 检测文件是vue结尾的
        use: {
          loader: "file-loader",
          options: {
            outputPath: "./fonts/",
          },
        },
      },
      {
        test: /\.scss$/, // 检测文件是scss结尾的
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2, // 通过import引入的scss文件，也要走下面两个loader
              modules: true, //开启 css 模块化   import style from './index.scss'
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new htmlPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(), //热更新
  ],
  optimization: {
    usedExports: true
  },
  devServer: {
    // webpack-dev-server
    contentBase: path.join(__dirname, "dist"),
    host: "127.0.0.1",
    compress: true,
    port: 9000,
    hot: true,
    // hotOnly: true, //只在HMR成功时更新，HMR失效的时候不作任何处理
  },
};
