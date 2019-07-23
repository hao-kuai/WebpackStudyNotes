import { cube } from './math.js';
//生成一个内容为Hello webpack !的div标签
function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello webpack !";
    console.log("cube",cube(10));
    return element;
}
//将生成的div标签添加到body中去
document.body.appendChild(component());