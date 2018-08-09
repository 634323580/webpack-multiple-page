const path = require('path')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base')

const config = merge.smart(baseConfig, {
  module: {
    rules: [{
        test: /\.(scss|sass|css)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            'sass-loader',
            'postcss-loader'
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: { // 压缩 jpeg 的配置
              progressive: true,
              quality: 65
            },
            optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
              enabled: false,
            },
            pngquant: { // 使用 imagemin-pngquant 压缩 png
              quality: '65-90',
              speed: 4
            },
            gifsicle: { // 压缩 gif 的配置
              interlaced: false,
            },
            webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
              quality: 75
            },
          },
        }, ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
        utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
          test: /common/,
          chunks: 'initial',
          name: 'common', // 任意命名
          minSize: 0 // 只要超出0字节就生成一个新包
        }
      }
    }
  }
})

config.plugins.push(
  // 打包前先清空
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../'),   //根目录
    verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
    dry:      false        　　　　　　　　　　//启用删除文件
  }),
  new ExtractTextPlugin({
    filename: 'css/[name][hash:8].css'
  })
)

module.exports = config
