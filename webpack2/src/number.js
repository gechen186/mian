function number(params) {
  var div = document.createElement('div')
  div.setAttribute('id', 'number')
  div.innerHTML = 4000
  div.onclick = function (params) {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1
    
  }
  document.body.appendChild(div)
}

export default number