// m1.js
import avatar from '../statics/images/aa.jpeg'
import createAvatar from './src/m2'
import '../statics/style/index.scss'

createAvatar()

var img = new Image
img.src = avatar
img.classList.add('avatar')
var root = document.getElementById('root')
root.append(img)