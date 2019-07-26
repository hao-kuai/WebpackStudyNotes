import smallImage from './small.jpg';
import bigImage from './big.jpg';

//添加Image
function addImage() {
    let element = document.createElement('img');
    element.src = smallImage;
    element.classList.add("image");
    element.style.width = "100px";
    element.style.height = "100px";
    return element;
}
document.body.appendChild(addImage());

//添加backgroundImage
function backgroundImage() {
    let element = document.createElement('div');
    element.innerHTML = "backgroundImage";
    element.classList.add("backgroundImage");
    element.style.backgroundImage = `url(${bigImage})`;
    element.style.backgroundSize = "100% 100%";
    element.style.width = "200px";
    element.style.height = "200px";
    return element;
}
document.body.appendChild(backgroundImage());

