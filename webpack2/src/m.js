import {join} from 'lodash-es'
// import _ from 'lodash'
import {add} from './math'
import test1 from './m2'
import test2 from './m3'
console.log(test1);
console.log(test2);
const $lodashJoin = join
console.log($lodashJoin(['a','b','c'], '****'));
import _ from "lodash";

var element = document.createElement("div");
element.innerHTML = _.join(["a", "b", "c"], "-");
document.body.appendChild(element);
// console.log(_.join(['a','b','c'], '****'));
console.log(add(1,1));

// function Footer(){
// 	var footer =  document.createElement('div');
// 	footer.innerText = '底部13';
// 	document.body.append(footer);
// }

// Footer()