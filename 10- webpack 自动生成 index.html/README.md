
为了在 JavaScript 模块中 import 一个 CSS 文件，需要使用 [style-loader](https://webpack.docschina.org/loaders/style-loader) 和 [css-loader](https://webpack.docschina.org/loaders/css-loader)，对CSS文件进行处理；然后，在此模块执行过程中，将含有 CSS 字符串的 <style> 标签，插入到 html 文件的 <head> 中。

## 一、安装 loader

```
npm install --save-dev style-loader css-loader
//或者
yarn add style-loader css-loader --dev
```

## 二、编辑 webpack.config.js 文件


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
       }
     ]
   }
 };
```

> webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。在这个示例中，所有以 .css 结尾的文件，都将被提供给 style-loader 和 css-loader。

## 三、添加 CSS 文件并使用

### 3.1 添加 style.css 文件
在 /src 目录中添加一个新的 style.css 文件，并将其 import 到 index.js 中：

```
webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- style.css
    |- index.js
  |- /node_modules
```

style.css 


```
.hello {
  color: red;
}
```

### 3.2 编辑 index.js


```
import "./style.css"
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
```

## 四、 运行 build 命令


```
npm run build
//或者
yarn build
```



```
yarn run v1.16.0
$ webpack
Hash: 319dbf117b6cd4a0fa81
Version: webpack 4.35.3
Time: 511ms
Built at: 07/17/2019 4:26:23 PM
    Asset      Size  Chunks             Chunk Names
bundle.js  6.97 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/index.js 285 bytes {0} [built]
[1] ./src/style.css 1.06 KiB {0} [built]
[2] ./node_modules/css-loader/dist/cjs.js!./src/style.css 165 bytes {0} [built]
    + 3 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
✨  Done in 1.18s.

```


再次在浏览器中打开 index.html，你应该看到 Hello webpack 现在的样式是红色。

## 五、 验证

在Chrome浏览器中右键单击选择**检查**页面（不要查看页面源代码，通过js动态插入的，所以看不到），并查看页面的 head 标签。可以看到包含 style 块元素，也就是在 index.js 中 import 的 css 文件中的样式。

> 参考链接

- [管理资源](https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD-css)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/06-%E5%8A%A0%E8%BD%BD%20CSS)