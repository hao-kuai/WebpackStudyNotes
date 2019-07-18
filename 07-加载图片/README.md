


## 一、安装

```
npm install --save-dev file-loader
//或者
yarn add file-loader --dev
```


## 二、编辑 webpack.config.js



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



## 三、添加图片


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

## 三、编辑 index.js

 
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
## 四、编辑 style.css



```
.hello{
    color: red;
}
.image{
    width: 100px;
    height: 100px;
}
```


## 五、重新构建

```
npm run build
```

构建结果

```
yarn run v1.16.0
$ webpack
Hash: 0d706eb339f3d984e779
Version: webpack 4.35.3
Time: 495ms
Built at: 07/18/2019 11:29:29 AM
                               Asset      Size  Chunks             Chunk Names
76e7e08e0b3a04a612c89ad13c999813.jpg    51 KiB          [emitted]  
                           bundle.js  7.23 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/icon.jpg 82 bytes {0} [built]
[1] ./src/index.js 572 bytes {0} [built]
[2] ./src/style.css 1.06 KiB {0} [built]
[3] ./node_modules/css-loader/dist/cjs.js!./src/style.css 216 bytes {0} [built]
    + 3 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
✨  Done in 1.15s.

```

## 六、打开 index.html 文件

如果一切顺利可以看到 Hello webpack 文本下边的 img 元素。


> 参考链接

- [管理资源](https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD-css)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/07-%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87)