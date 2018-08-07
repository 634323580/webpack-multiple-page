// 用于区分开发环境和生产环境
module.exports = function(env, argv) {
  return argv.mode === 'production' ?
    require('./configs/webpack.production') :
    require('./configs/webpack.development')
}
