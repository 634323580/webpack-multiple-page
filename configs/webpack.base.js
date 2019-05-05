const path = require('path')
// 如果我们的文件名或者路径会变化，例如使用 [hash] 来进行命名，那么最好是将 HTML 引用路径和我们的构建结果关联起来，这个时候我们可以使用 html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
var colors = require('colors');

// index: './src/index.js',
// login: './src/login.js'

// new HtmlWebpackPlugin({
//   template: './src/login.html',
//   filename: 'login.html',
//   chunks: ['login']   // 对应关系,login.js对应的是login.html
// })

const appConfig = require('../app.json')

let base = {
  entry: {},

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name][hash:8].js',
  },

  module: {
    // 可以用于配置哪些模块文件的内容不需要进行解析。对于一些不需要解析依赖（即无依赖） 的第三方大型类库等，可以通过这个字段来配置，以提高整体的构建速度。
    // 使用 noParse 进行忽略的模块文件中不能使用 import、require、define 等导入机制。
    // noParse: /jquery|lodash/, // 正则表达式
    rules: [
      {
        enforce: 'pre', // 指定为前置类型,确保在babel-loader处理之前使用
        test: /\.(js|jsx|html|vue)?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.(js|jsx)?/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.(htm|html)$/,
        // use: 'html-withimg-loader',
        use: [{
          loader: 'html-withimg-loader',
          options: {
            min: false
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      },
      // 在前端项目的样式中总会使用到图片，虽然我们已经提到 css-loader 会解析样式中用 url() 引用的文件路径，但是图片对应的 jpg/png/gif 等文件格式，webpack 处理不了。是的，我们只要添加一个处理图片的 loader 配置就可以了，现有的 file-loader 就是个不错的选择。
      // file-loader 可以用于处理很多类型的文件，它的主要作用是直接输出文件，把构建后的文件路径返回。配置很简单，在 rules中添加一个字段，
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[hash:8].[name].[ext]'
            },
          }
        ],
      }
    ],
  },
  resolve: {
    // 别名
    alias: {
        // $: './src/jquery.js'
    },
    // 删除不必要的后缀自动补全，少了文件后缀的自动匹配，即减少了文件路径查询的工作
    // 其他文件可以在编码时指定后缀，如 import('./index.scss')
    extensions: [".js"],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   filename: 'index.html', // 配置输出文件名和路径
    //   template: 'src/index.html', // 配置文件模板
    //   minify: { // 压缩 HTML 的配置
    //     minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
    //     minifyJS: true // 压缩 HTML 中出现的 JS 代码
    //   }
    // }),
  ],
}

appConfig['pages'].forEach(item => {
  console.log(`生成${item}.html页面`['green']);
  const htmlPlugin = new HtmlWebpackPlugin({
      filename: `${item}.html`,
      template: `./src/page/${item}/${item}.html`,
      chunks: ['vendor','common',item],
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true // 压缩 HTML 中出现的 JS 代码
      }
  })
  base['entry'][item] = `./src/page/${item}/${item}.js`
  base['plugins'].push(htmlPlugin)
})
// return
module.exports = base
