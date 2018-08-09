const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const config = merge.smart(baseConfig, {
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      // },
      {
        test: /\.(less|css)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
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
