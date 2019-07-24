import "./style.css"
import Icon from './icon.jpg';
//生成一个内容为Hello webpack !的div标签
function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello webpack !";
    //添加class
    element.classList.add("hello");
    //添加背景图片
    element.style.backgroundImage = `url(${Icon})`;
    element.style.backgroundSize = "100px 100px";
    return element;
}
//将生成的div标签添加到body中去
document.body.appendChild(component());

//添加backgroundImage
function backgroundImage() {
    let element = document.createElement('div');
    element.innerHTML = "backgroundImage";
    //添加class
    element.classList.add("backgroundImage");
    return element;
}
//将生成的div标签添加到body中去
document.body.appendChild(backgroundImage());

function addImage() {
    let element = document.createElement('img');
    //设置图片路径
    element.src = Icon;
    //添加class
    element.classList.add("image");
    return element;
}
//将生成的img标签添加到body中去
document.body.appendChild(addImage());