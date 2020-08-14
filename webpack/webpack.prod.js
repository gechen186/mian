const webpack = require("webpack");
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.[contenthash].js', //生产环境下加入 hash
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules:[
      {
        test: /\.js$/, //所有.js结尾的都是用这个 babel-loader规则
        loader: ['babel-loader'],
        include: path.join(__dirname, 'src'),  //这个目录下的
        exclude: /node_modeules/ //这个除外
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'), //找到已有的html
      filename: 'index.html'  //产出的文件名，dist里
    })
  ],
  // devServer: {
  //   port: 3000,
  //   contentBase: path.join(__dirname, 'dist') //启动目录
  // }
}