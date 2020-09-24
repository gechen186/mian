const path = require('path'); // 从nodejs中引入path变量

module.exports = {
  entry: './index.js', // 从哪一个文件开始打包
  output: {
    filename: 'bundle.js',  // 打包后生成的文件的名字
    path: path.resolve(__dirname, 'bundle'), // 打包到哪个文件夹下面 __dirname 当前文件夹的一个路径
  }
}