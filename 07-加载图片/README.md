

## 一、JavaScript  加载图片

JavaScript 中加载图片，两种使用方法
1. 加载背景图片 background-image
2. 加载图片 `<img>` 的 `src`

语法和 JavaScript 语法一样，区别是使用的图片的路径是 webpack 通过`file-loader`或者`url-loader` 处理过的路径。


```
//原用法
element.style.backgroundImage = `url(./icon.jpg)`;
//webpack用法
import Icon from './icon.jpg';
element.style.backgroundImage = `url(${Icon})`;
```



## 1.1 安装

```
npm install --save-dev file-loader
//或者
yarn add file-loader --dev
```


## 1.2 编辑 webpack.config.js

```
const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

在 `import MyImage from './my-image.png'` 时，此图像将被处理并添加到 output 目录,即 dist 目录，并且 MyImage 变量将包含该图像在处理后的最终 url。



## 1.3 添加图片


将图片添加到 src 目录下
```
webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- icon.jpg
    |- style.css
    |- index.js
  |- /node_modules
```

## 1.4 编辑 index.js

### 1.4.1 加载 img 图片
```
import "./style.css"
import Icon from './icon.jpg';
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
```
### 1.4.2 加载 backgroundImage 图片

```
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
```

## 1.5 编辑 style.css



```
.hello{
    color: red;
    width: 100px;
    height: 100px;
}
.image{
    width: 100px;
    height: 100px;
}
```


## 1.6 重新构建

构建结果

```
yarn run v1.16.0
$ webpack
Hash: d7ac9c7c6cadcfb4b6e3
Version: webpack 4.35.3
Time: 497ms
Built at: 07/24/2019 1:55:58 PM
                               Asset      Size  Chunks             Chunk Names
76e7e08e0b3a04a612c89ad13c999813.jpg    51 KiB          [emitted]  
                           bundle.js  7.42 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/icon.jpg 82 bytes {0} [built]
[1] ./src/index.js 687 bytes {0} [built]
[2] ./src/style.css 1.06 KiB {0} [built]
[3] ./node_modules/css-loader/dist/cjs.js!./src/style.css 337 bytes {0} [built]
    + 3 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
✨  Done in 1.14s.

```

## 1.7 打开 index.html 文件

如果一切顺利可以看到 
1. Hello webpack 文本及背景图片 
2. img 元素 

## 二、CSS  加载背景图片
在 JavaScript 加载图片 `import Icon from './icon.jpg'` 时，此图像将被处理并添加到 output 目录，并且 Icon 变量将包含该图像在处理后的最终 url。

CSS 的加载是通过 css-loader 实现的时，会使用类似过程处理 CSS 中的 url('./icon.jpg')。loader 会识别这是一个本地文件，并将 './icon.jpg' 路径，替换为 output 目录中图像的最终路径。

### 2.1 编辑 index.js 

```
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
```

### 2.2 编辑 style.css 

```
.hello{
    color: red;
    width: 100px;
    height: 100px;
}
.backgroundImage{
    color: blueviolet;
    background-image: url('./icon.jpg');
    background-size:100% 100%;
    width: 100px;
    height: 100px;
}
.image{
    width: 100px;
    height: 100px;
}
```
## 2.3 重新构建

构建结果

```
$ webpack
Hash: 28f62e786edae16d5190
Version: webpack 4.35.3
Time: 655ms
Built at: 07/24/2019 2:26:01 PM
                               Asset      Size  Chunks             Chunk Names
76e7e08e0b3a04a612c89ad13c999813.jpg    51 KiB          [emitted]  
                           bundle.js  7.86 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/icon.jpg 82 bytes {0} [built]
[1] ./src/index.js 957 bytes {0} [built]
[2] ./src/style.css 1.06 KiB {0} [built]
[3] ./node_modules/css-loader/dist/cjs.js!./src/style.css 582 bytes {0} [built]
    + 4 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
✨  Done in 2.00s.

```

## 2.4 打开 index.html 文件

如果一切顺利可以看到 
1. Hello webpack 文本及背景图片 
2. backgroundImage 文本及背景图片
3. img 元素 


> 参考链接

- [管理资源](https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD-css)
- [backgroundImage](http://www.w3school.com.cn/jsref/prop_style_backgroundimage.asp)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/07-%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87)