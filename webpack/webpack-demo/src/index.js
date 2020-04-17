import logo from './logo.jpg'
import "./index.less"
import axios from 'axios'
import number from './number'
axios.get('/api/info').then(res => {
	console.log(res)
})

var img = new Image();
img.src = logo;
img.classList.add("logo")

var root = document.getElementById("root")
root.append(img)


var btn = document.createElement('button')
btn.innerHTML = '新增'
document.body.appendChild(btn);
var i = 0;
btn.onclick = function() {
	var p = document.createElement('p');
	p.innerHTML = "item"
	i++
	document.body.appendChild(p)
}

document.write('hello webpack')

number();
if(module.hot) {
	module.hot.accept('./number',function() {
		document.body.removeChild(document.getElementById('number'));
		number();
	})
}