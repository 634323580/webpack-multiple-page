import $ from 'jquery'
import '../../common/css/normalize.css'
import './index.scss'
if (module.hot) {
  module.hot.accept()
}
console.log($('body').get(0))
console.warn(process.env.NODE_ENV)
