import $ from 'jquery'
import '../../common/css/normalize.css'

function test (num) {
  if (num) {
    $('body').text(num)
    setTimeout(() => {
      num--
      test(num)
    }, 1000)
  }
}
test(100)
