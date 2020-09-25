const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config.js");
const complier = webpack(config); // webpack编译器

const app = express();
app.use(
  webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath, //重新运行后的路径就是 config里的 publicPath
  })
);

app.listen(3001, () => {
  console.log("server is go");
});
