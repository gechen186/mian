import Header from './header.js'
import Slider from './slider.js'
import Footer from './footer.js'
import btn from './btn.js'

var avator = require('../statics/shu.jpg')

new Header()
new Slider()
new Footer()

// import counter from './counter'
// import number from './number'
// counter()
// number()

// if(module.hot){
//   module.hot.accept('./number',()=>{
//     document.body.removeChild(document.getElementById('number')) //当number.js更新后 先删除之前的节点
//     //然后创建新节点
//     number()
//   })
// }