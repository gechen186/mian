
import './csss.css'
btn.innerHTML = 'css'
document.body.appendChild(btn)
btn.onclick = function(){
  var div = document.createElement('div')
  div.innerHTML = 'item'
  document.body.appendChild(div)
}
