import "./style.css"

function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello webpack !";
    element.classList.add("hello");
    return element;
}
document.body.appendChild(component());
