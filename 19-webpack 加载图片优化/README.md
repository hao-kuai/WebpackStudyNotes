在 [07-webpack加载图片](https://github.com/1071942338/WebpackStudyNotes/blob/master/07-%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87/README.md) 中，有2中方式可以加载图片资源
1. 通过 JavaScript ，使用 file-loader
2. 通过 CSS ，使用 style-loader

通过 url-loader 将小文件转换成  base64 URIs 内联到 bundle.js 中，可以减少 HTTP 请求次数。

## 一、添加图片

添加3张图片
- big.jpg  大小：51k
- small.jpg  大小：22k
- cssBackgroundImage.jpg  大小：22k

## 二、编辑 index.js

```
import smallImage from './small.jpg';
import bigImage from './big.jpg';
import "./style.css"
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

//添加cssBackgroundImage
function cssBackgroundImage() {
    let element = document.createElement('div');
    element.innerHTML = "cssBackgroundImage";
    element.classList.add("cssBackgroundImage");
    return element;
}
document.body.appendChild(cssBackgroundImage());



```
style.css

```
.cssBackgroundImage{
    background-image: url("./cssBackground.jpg");
    background-size: 100% 100%;
    width : 200px;
    height : 200px;
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
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:30720,//默认单位为bytes
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
$ webpack
Hash: 2b4bd9fe19b64a76d77c
Version: webpack 4.35.3
Time: 706ms
Built at: 07/26/2019 3:05:54 PM
                               Asset      Size  Chunks             Chunk Names
76e7e08e0b3a04a612c89ad13c999813.jpg    51 KiB          [emitted]  
                           bundle.js  64.5 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/small.jpg 28.3 KiB {0} [built]
[1] ./src/big.jpg 82 bytes {0} [built]
[2] ./src/index.js 1.05 KiB {0} [built]
[3] ./src/style.css 1.06 KiB {0} [built]
[4] ./node_modules/css-loader/dist/cjs.js!./src/style.css 454 bytes {0} [built]
[7] ./src/cssBackground.jpg 28.3 KiB {0} [built]
    + 4 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
✨  Done in 1.37s.

```
输出的资源只有一张 51Kib 的图片，22Kib 的图片被转换成 base64 Uris 字符串内联到 bundle.js 中去了。

```
//部分代码
([function (A, o) {
    A.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAA
    ...
    gZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLjVbjT7S1u4ZYIjK7ymMqAG24+VyQT1wQOMeorr/wC2IP8Aa/KnW+kWFi++2sre3fBG6KJVODjIyB7D8qsbF/uj8qAP/9k="
}, function (A, o, K) {
    A.exports = K.p + "76e7e08e0b3a04a612c89ad13c999813.jpg"
},
```
## 五、查看

在Chrome 浏览器中打卡 index.html 文件，可以看到3中图片。但是单独从网络加载的图片只有 一张大图片。

---
> 参考链接
- [加载 images 图像](https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD-images-%E5%9B%BE%E5%83%8F)
- [url-loader](https://webpack.docschina.org/loaders/url-loader)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/19-webpack%20%E5%8A%A0%E8%BD%BD%E5%9B%BE%E7%89%87%E4%BC%98%E5%8C%96)




