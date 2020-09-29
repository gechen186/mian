function counter(params) {
  var div = document.createElement('div')
  div.setAttribute('id', 'counter')
  div.innerHTML = 3
  div.onclick = function (params) {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1
    
  }
  document.body.appendChild(div)
}

export default counter