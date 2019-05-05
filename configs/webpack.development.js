const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const config = merge.smart(baseConfig, {
  // 生成sourcemap
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        // css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 @import 和 url() 等引用外部文件的声明；
        // style-loader 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 style 标签来让 CSS 代码生效。
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ],
      },
    ],
  },

  devServer: {
    port: '8080',
    // hotOnly: true,
    hot: true,
    // inline: true,
    overlay: { // 这里配置 html 页面是否显示 eslint 错误信息蒙版
      errors: true,
      warnings: true
    },
    before(app){
      app.get('/api/test.json', function(req, res) {
        res.json({ code: 200, message: 'hello world' })
      })
    },
  },
})

config.plugins.push(
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(true),
  }),
  // new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
  new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
)

module.exports = config
