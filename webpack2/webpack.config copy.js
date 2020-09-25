const path = require("path"); // 从nodejs中引入path变量

module.exports = {
  entry: {
    main: "./src/index.js",
  }, // 从哪一个文件开始打包
  mode: "development",
  output: {
    filename: "[name].js", // 打包后生成的文件的名字
    path: path.resolve(__dirname, "dist"), // 打包到哪个文件夹下面 __dirname 当前文件夹的一个路径
  },
  // modules: true,
  module: {
    // 模块打包配置
    rules: [
      // 新增规则 可以有很多，数组
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
        test: /\.scss$/, // 检测文件是scss结尾的
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2, // 通过import引入的scss文件，也要走下面两个loader
            },
          },
          "sass-loader",
          "postcss-loader",
        ],
      },
    ],
  },
};
