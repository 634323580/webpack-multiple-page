const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


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
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js|jsx)?/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.jsx?/,
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
