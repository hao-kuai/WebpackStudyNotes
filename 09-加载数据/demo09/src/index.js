import "./style.css"
import Icon from './icon.jpg';
import jsonData from "./data/json.json"
import xmlData from "./data/xml.xml"
import csvData2 from "./data/csv.csv"


//生成一个内容为Hello webpack !的div标签
function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello webpack !";
    //添加class
    element.classList.add("hello");
    return element;
}
//将生成的div标签添加到body中去
document.body.appendChild(component());


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

//打印 JSON 数据
console.log("JSON",jsonData);

//打印 XML 数据
console.log("XML",xmlData);

//打印 CSV 数据
console.log("CSV",csvData2);
