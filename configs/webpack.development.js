const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const config = merge.smart(baseConfig, {
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        // css-loader 是处理css文件中的url()等
        // style-loader 将css插入到页面的style标签
        // sass-loader 是将sass文件编译成css
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
    hot: false,
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
  new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
  new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
)

module.exports = config
