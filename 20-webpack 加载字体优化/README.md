在 [08-webpack加载字体](https://github.com/1071942338/WebpackStudyNotes/tree/master/08-%E5%8A%A0%E8%BD%BD%E5%AD%97%E4%BD%93) 中，使用 file-loader 可以加载字体资源。


通过 url-loader 将小文件转换成  base64 URIs 内联到 bundle.js 中，可以减少 HTTP 请求次数。

## 一、添加字体

添加 `华文彩云.ttf` 字体库,大小为 5.7 MB。


## 二、编辑 index.js

```
import "./style.css"

function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello webpack !";
    element.classList.add("hello");
    return element;
}
document.body.appendChild(component());


```
style.css

```
 @font-face {
   font-family: "MyFont";
   src:  url('./华文彩云.ttf');
   font-weight: 600;
   font-style: normal;
}
.hello{
    color: red;
    font-size: 30px;
    font-family: "MyFont";
}

```


## 三、安装 url-loader

```
npm install url-loader --save-dev
//
yarn add url-loader --dev
```
安装成功

```
yarn add v1.16.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 2 new dependencies.
info Direct dependencies
└─ url-loader@2.1.0
info All dependencies
├─ mime@2.4.4
└─ url-loader@2.1.0
✨  Done in 4.51s.

```


## 四、编辑 webpack.config.js

```
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:6291456,//默认单位为bytes
                        }
                    }
                ]
            }
        ]
    }
};
```

## 五、编译
编译成功

```
yarn run v1.16.0
$ webpack
Hash: d8e3bb510cfd640b1e74
Version: webpack 4.35.3
Time: 506ms
Built at: 07/26/2019 3:24:49 PM
    Asset      Size  Chunks                    Chunk Names
bundle.js  7.21 MiB       0  [emitted]  [big]  main
Entrypoint main [big] = bundle.js
[0] ./src/index.js 235 bytes {0} [built]
[1] ./src/style.css 1.06 KiB {0} [built]
[2] ./node_modules/css-loader/dist/cjs.js!./src/style.css 509 bytes {0} [built]
[5] ./src/华文彩云.ttf 7.21 MiB {0} [built]
    + 4 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  bundle.js (7.21 MiB)

WARNING in entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance.
Entrypoints:
  main (7.21 MiB)
      bundle.js


WARNING in webpack performance recommendations: 
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
✨  Done in 1.25s.


```
输出的资源中没有字体文件， 字体文件转换成 base64 Uris 字符串内联到 bundle.js 中，大小变为 7.21 MiB。

```
//部分代码
function(A,B){
A.exports="data:font/ttf;base64,AAEAAAARAQAABAAQR1NVQojKisUAAAEcAAABBE9TLzJggmnQAAACIAAAAFZjbWFwiVBwigAAAngAAJ+QY3Z0ICAaHuwAAKIIAAADBGZwZ23
...
wAJAQMACEEDAAhBAwAIAQMACEEDAAmBAwAIAQMACMEDAAhBAwAIAQMACAEDAAfBAwAHwQMAB8EDAAhBAwAHQ=="
},
```
## 五、查看

在Chrome 浏览器中打卡 index.html 文件，可以看到华文彩云字体的 Hello webpack !。

---
> 参考链接
- [加载 fonts 字体](https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD-fonts-%E5%AD%97%E4%BD%93)
- [url-loader](https://webpack.docschina.org/loaders/url-loader)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/20-webpack%20%E5%8A%A0%E8%BD%BD%E5%AD%97%E4%BD%93%E4%BC%98%E5%8C%96)




