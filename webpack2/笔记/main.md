## webpack 的主要作用

![avatar](../../笔记/img/webpack-dian.png)

### Tree shaking（删除无用模块）

### 懒加载

### 代码分割

### webpack 打包输出的含义

![avatar](../../笔记/img/webpack-hanyi-2.png)
![avatar](../../笔记/img/webpack-hanyi.png)

# 第二章主要介绍了

webpack.config.js 的基础配置

# 第三章 loader && plugins

#### loader是在编译打包时对不同类型的文件做一些操作

```
url-loader 打包图片
"style-loader",{
loader: "css-loader",
options: {
    importLoaders: 2, // 通过 import 引入的 scss 文件，也要走下面两个 loader
    // modules:true, //开启 css 模块化 import style from './index.scss'
  },
},
"sass-loader",
"postcss-loader",
```
#### plugins 可以再 webpack 运行到某一时刻时帮我做一些事情

#### SourceMap
- cheap-source-map 只精确到某行的错误，不会精确到列
- cheap-eval-source-map 只精确到某行的错误，不会精确到列，只会管业务代码
- cheap-module-eval-source-map 只精确到某行的错误，不会精确到列，会 loader 等三方代码 dev 环境最好
- cheap-module-source-map 只精确到某行的错误，不会精确到列，会 loader 等三方代码 线上可用
- eval 是性能最好的，但是提示不全面


#### 热模块 不会刷新页面，只替换代码

new webpack.HotModuleReplacementPlugin() 热模块
```
hot: true,   开启后改动css不会影响页面刷新
hotOnly: true, 
<!-- 手动热模块配置 -->
if(module.hot){ //当 number.js 更新后执行回调 主要目的是一些比较小众的文件 loader 
没有内置这个方法
module.hot.accept('./number',()=>{
//当 number.js 更新后 先删除之前的节点
  document.body.removeChild(document.getElementById('number'))
  //然后创建新节点
  number()
  })
}
```
#### babel
```
npm install --save-dev babel-loader @babel/core

webpack.config.js
rules: [
  { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
]

npm install @babel/preset-env --save-dev babel 的 es6=>es5 规则 
让 babel-loader 以这个规则翻译

.babelrc
{
"presets": [
    [
    "@babel/preset-env",
    "targets": {
    "chrome": ">67" 表示打包后将运行在 >67 的版本里，让 babel 自行判断是否需要进行 polyfill},
    {
    "useBuiltIns": "usage" 这行表示@babel/preset-env 根据业务代码来加相关的 polyfill
    }]
  ]
}

使用 polyfill 将 promise map 这些翻译
npm install --save @babel/polyfill //这种方式会进行全局注入 适合业务代码
使用的话 可以将在 js 文件中 import "@babel/polyfill" 
但是会默认将所有的 polyfill 转义进去 造成文件过大

这种方式更适合组件库或者类库
npm install --save-dev @babel/plugin-transform-runtime

plugins: [
[
"@babel/plugin-transform-runtime",
{
absoluteRuntime: false,
corejs: 2,
helpers: true,
regenerator: true,
useESModules: false,
version: "7.0.0-beta.0",
},
],
```
# 第四章
### tree-shaking   就是将导入但是无用的模块删除
 - tree-shaking只支持 es6 import xxx from 'xxxx' ,因为 es6 引入是静态引入
 - 开启方式
 - 开发环境下开启 tree-shaking 其实无用，只有在生产环境才会真正删除无用代码
  ```
  在开发环境中的webpack.config.js中加入（生产环境不需要配置webpack.config.js）
  optimization: {
    usedExports: true
  }
  并且在package.json中添加
  "sideEffects": fasle, 对所有模块进行 tree-shaking
  对于不希望被 tree-shaking的文件应该添加进数组中
  "sideEffects": ["*.css","*.scss"],
  ```
### 通过 webpack-merge进行 生产环境和开发环境的公共配置提取

### 同步代码分割： 比如 lodash这种公共库，可以使用 lodash-es 然后按需提取后注册进window或者vue全局中
若是无法按需加载的公共库可以提取出一个全局js文件，这样用户就可以加载一次后便有缓存了

webpack.common.js下配置
```
optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
```

### 代码切割异步加载
- 需要安装 babel插件  npm install --save-dev @babel/plugin-syntax-dynamic-import
<!-- 但是这个插件不是官方的，所以不支持异步引入，如果需要异步引入则需要将其删除 -->
// .babelrc
{
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```
function test(params) {
  return import('lodash').then(({default: _})=>{
    var element = document.createElement('div')
    element.innerHTML = _.join(['a','b','c'], '-')
    return element
  })
}
test().then((element)=>{
  document.body.appendChild(element)
})
```

### 代码分割 splitChunksPlugin配置

```
optimization: {
    splitChunks: {
      chunks: 'async', // all 不区分  async 只对异步代码生效
      minSize: 30000, // 打包最小30000字节我才去分割
      minRemainingSize: 0, 
      maxSize: 0, // 一般配置 50000 就相当于能拆分成几个50kb左右的
      minChunks: 1, // 最少使用一次
      maxAsyncRequests: 6, // 同时加载的模块数最多6个
      maxInitialRequests: 4, // 入口文件也会拆分 但是最多4个 超过了就不分分割了
      automaticNameDelimiter: '~',  // 名字和组的拼接符 vendors~lodash
      cacheGroups: { // 拆分分组
        vendors: { // 默认分组
          test: /[\\/]node_modules[\\/]/, // 如果是node_modules中的我们就到vendors这个组
          priority: -10, // 优先级， 和下面default 同时满足条件 打包到优先级高的里面
          // filename: 'vendor.js' 可以自己取名字
        },
        default: {
          minChunks: 2,
          priority: -20, 
          reuseExistingChunk: true // 比如之前引用了a代码，就不会打包a到common.js，会复用
          // filename: 'common.js' 可以自己取名字
        }
      }
    }
  },



  网上其他分割方案

  splitChunks: {
          name: true, // 自动处理文件名
          chunks: 'all',
          minChunks: 1, // 至少 import 1 次的即需要打包
          automaticNameDelimiter: '-', //生成名称的隔离符
          cacheGroups: {
            vendors: {
              test: /vue|vue-router|lodash|jquery|element-ui/, // 将这两个第三方模块单独提取打包
              chunks: 'initial',
            }
          }
        }
```


### webpack其实是希望我们通过 按需+异步加载的形式实现代码分割，但是我们可以通过

```
/*webpackPrefetch: true */来优化
来使代码再页面加载完，网络等待空闲的时候去预加载异步代码
document.addEventListener('click', () => {
  import(/* webpackChunkName: "test", webpackPrefetch: true */ './click.js').then(({ default: fn }) => {
    fn()
  })
})
```



###  Css代码分割

```
npm install --save-dev mini-css-extract-plugin
// webpack.prod.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

plugins: [new MiniCssExtractPlugin()],
rules: [{
      test: /\.css$/, // 检测文件是css结尾的
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    },
      {
        test: /\.scss$/, // 检测文件是scss结尾的
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 通过import引入的scss文件，也要走下面两个loader
              // modules: true
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }]
```
因为 style-loader会将css代码插入进head标签中所以
然后我们之前使用的style-loader就不能用了，他给我们提供了一个loader,我们将style-loader替换成他的loader，然后还要将css区分开线上与开发环境。

```


