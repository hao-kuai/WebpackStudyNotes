import { funcA } from './common.js';
//生成一个内容为Hello webpack !的div标签
function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello webpack !";
    //使用funcA
    console.log("funcA",funcA());
    return element;
}
//将生成的div标签添加到body中去
document.body.appendChild(component());