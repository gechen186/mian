import avatar from '../statics/shu.jpg'
import './index.scss'

var img = new Image
img.src = avatar
img.classList.add('avatar-scss')
var root = document.getElementById('root')
root.append(img)