import avatar from '../statics/shu.jpg'
import style from './index.scss'
export default function createAvatar(){
  var img = new Image
  img.src = avatar
  img.classList.add(style.avatar)
  var root = document.getElementById('root')
  root.append(img)  
}