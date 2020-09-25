// m1.js
import avatar from '../statics/shu.jpg'
import style from './index.scss'
import createAvatar from './m2'

console.log(style);
createAvatar()
var img = new Image
img.src = avatar
img.classList.add(style.avatar)
var root = document.getElementById('root')
root.append(img)