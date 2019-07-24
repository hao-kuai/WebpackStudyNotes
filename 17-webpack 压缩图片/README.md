在 [07-加载图片](https://github.com/1071942338/WebpackStudyNotes/blob/master/07-加载图片/README.md) 之后，便可以正常加载和显示图片了；但是这些图片都是未经压缩的原尺寸，webpack 通过 image-webpack-loader 压缩图片。

## 一、添加图片
在 src 目录下添加 icon.jpg 图片,编辑index.js

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
编辑 style.css 

```
.hello{
    color: red;
}
.image{
    width: 200px;
    height: 200px;
}
```
编辑 webpack.config.js

```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode:"production",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                ]
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    "css-loader"
                ]
            },
            //添加loader
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    "file-loader"
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "15- webpack 压缩 JavaScript 代码",
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
        //添加插件
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        //添加插件
        new OptimizeCSSAssetsPlugin({})
    ],
};
```

编译成功

```
$ webpack
Hash: 9c47c45174524a79d630
Version: webpack 4.35.3
Time: 723ms
Built at: 07/24/2019 10:14:38 AM
                               Asset       Size  Chunks             Chunk Names
76e7e08e0b3a04a612c89ad13c999813.jpg     51 KiB          [emitted]  
                          index.html  219 bytes          [emitted]  
                      main.bundle.js   6.25 KiB       0  [emitted]  main
                            main.css   49 bytes       0  [emitted]  main
Entrypoint main = main.css main.bundle.js

```

此时图片大小为 51 KiB（macOS Mojave 10.14.6 ）

## 二、安装

```
npm install image-webpack-loader --save-dev
//
yarn add image-webpack-loader --dev
```
安装成功


```
yarn add v1.16.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 133 new dependencies.
info Direct dependencies
└─ image-webpack-loader@5.0.0
info All dependencies
├─ @mrmlnc/readdir-enhanced@2.2.1
├─ @nodelib/fs.stat@1.1.3
├─ @sindresorhus/is@0.7.0
├─ arch@2.1.1
├─ archive-type@4.0.0
├─ array-find-index@1.0.2
├─ array-union@1.0.2
├─ array-uniq@1.0.3
├─ arrify@1.0.1
├─ bin-check@4.1.0
├─ bin-version-check@4.0.0
├─ bin-version@3.1.0
├─ bl@1.2.2
├─ buffer-alloc-unsafe@1.1.0
├─ buffer-alloc@1.2.0
├─ buffer-crc32@0.2.13
├─ buffer-fill@1.0.0
├─ cacheable-request@2.1.4
├─ call-me-maybe@1.0.1
├─ camelcase-keys@2.1.0
├─ caw@2.0.1
├─ clone-response@1.0.2
├─ config-chain@1.1.12
├─ console-stream@0.1.1
├─ currently-unhandled@0.4.1
├─ cwebp-bin@5.1.0
├─ decompress-response@3.3.0
├─ decompress-tar@4.1.1
├─ decompress-tarbz2@4.1.1
├─ decompress-targz@4.1.1
├─ decompress-unzip@4.0.1
├─ decompress@4.2.0
├─ dir-glob@2.0.0
├─ download@6.2.5
├─ executable@4.1.1
├─ ext-list@2.2.2
├─ fast-glob@2.2.7
├─ fd-slicer@1.1.0
├─ figures@1.7.0
├─ filename-reserved-regex@2.0.0
├─ find-versions@3.1.0
├─ fs-constants@1.0.0
├─ get-proxy@2.1.0
├─ get-stream@3.0.0
├─ gifsicle@4.0.1
├─ glob-to-regexp@0.3.0
├─ globby@8.0.2
├─ got@7.1.0
├─ graceful-readlink@1.0.1
├─ has-ansi@2.0.0
├─ has-symbol-support-x@1.4.2
├─ has-to-string-tag-x@1.4.1
├─ hosted-git-info@2.7.1
├─ http-cache-semantics@3.8.1
├─ ignore@3.3.10
├─ image-webpack-loader@5.0.0
├─ imagemin-gifsicle@6.0.1
├─ imagemin-mozjpeg@8.0.0
├─ imagemin-optipng@6.0.0
├─ imagemin-pngquant@6.0.1
├─ imagemin-svgo@7.0.0
├─ imagemin-webp@5.1.0
├─ imagemin@6.1.0
├─ import-lazy@3.1.0
├─ into-stream@3.1.0
├─ is-cwebp-readable@2.0.1
├─ is-finite@1.0.2
├─ is-gif@3.0.0
├─ is-jpg@2.0.0
├─ is-natural-number@4.0.1
├─ is-object@1.0.1
├─ is-retry-allowed@1.1.0
├─ is-utf8@0.2.1
├─ json-buffer@3.0.0
├─ keyv@3.0.0
├─ load-json-file@1.1.0
├─ longest@1.0.1
├─ loud-rejection@1.6.0
├─ lpad-align@1.1.2
├─ make-dir@1.3.0
├─ map-obj@1.0.1
├─ meow@3.7.0
├─ merge2@1.2.3
├─ mime-db@1.40.0
├─ mozjpeg@6.0.1
├─ normalize-package-data@2.5.0
├─ npm-conf@1.1.3
├─ optipng-bin@5.1.0
├─ os-filter-obj@2.0.0
├─ p-cancelable@0.3.0
├─ p-event@1.3.0
├─ p-map-series@1.0.0
├─ p-pipe@1.2.0
├─ p-reduce@1.0.0
├─ path-parse@1.0.6
├─ path-type@3.0.0
├─ pend@1.2.0
├─ pinkie@2.0.4
├─ pngquant-bin@5.0.2
├─ proto-list@1.2.4
├─ pseudomap@1.0.2
├─ read-pkg-up@1.0.1
├─ read-pkg@1.1.0
├─ redent@1.0.0
├─ repeating@2.0.1
├─ replace-ext@1.0.0
├─ resolve@1.11.1
├─ responselike@1.0.2
├─ seek-bzip@1.0.5
├─ semver-regex@2.0.0
├─ semver-truncate@1.1.2
├─ slash@1.0.0
├─ sort-keys-length@1.0.1
├─ spdx-correct@3.1.0
├─ spdx-exceptions@2.2.0
├─ squeak@1.3.0
├─ strip-bom@2.0.0
├─ strip-dirs@2.1.0
├─ strip-indent@1.0.1
├─ strip-outer@1.0.1
├─ tar-stream@1.6.2
├─ temp-dir@1.0.0
├─ through@2.3.8
├─ timed-out@4.0.1
├─ to-buffer@1.1.1
├─ trim-newlines@1.0.0
├─ trim-repeated@1.0.0
├─ tunnel-agent@0.6.0
├─ unbzip2-stream@1.3.3
├─ url-parse-lax@1.0.0
├─ uuid@3.3.2
├─ validate-npm-package-license@3.0.4
└─ yauzl@2.10.0
✨  Done in 173.11s.

```

## 三、编辑 webpack.config.js

添加到 file-loader 之后

```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode:"production",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                ]
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    "css-loader"
                ]
            },
            //添加loader
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    "file-loader",
                    'image-webpack-loader',
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "15- webpack 压缩 JavaScript 代码",
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
        //添加插件
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        //添加插件
        new OptimizeCSSAssetsPlugin({})
    ],
};
```



## 四、编译
编译成功

```
$ webpack
Hash: 14356f459fdacd0931b6
Version: webpack 4.35.3
Time: 889ms
Built at: 07/24/2019 10:16:12 AM
                               Asset       Size  Chunks             Chunk Names
eae72b240e59132a25b17eda6c27041e.jpg   22.4 KiB          [emitted]  
                          index.html  219 bytes          [emitted]  
                      main.bundle.js   6.25 KiB       0  [emitted]  main
                            main.css   49 bytes       0  [emitted]  main
Entrypoint main = main.css main.bundle.js

```
此时图片大小为 51 KiB（macOS Mojave 10.14.6 ）

## 五、对比图片尺寸
图片大小尺寸从51KiB变成22.4 KiB，并且 index.html能够正常显示图片。

> 参考链接

- [管理资源-加载图片](https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD-images-%E5%9B%BE%E5%83%8F)
- [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/17-webpack%20%E5%8E%8B%E7%BC%A9%E5%9B%BE%E7%89%87)