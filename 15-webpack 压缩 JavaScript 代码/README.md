> 由于 TerserPlugin 是 webpack4+ 的内置功能，生产模式下默认开启，此处只做验证性演示

设置 mode 为 production  配置后，webpack v4+ 会默认压缩你的代码。生产环境下默认使用 TerserPlugin ，并且也是代码压缩方面比较好的选择。



## 一、未压缩 bundle.js 

```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode:"none",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "15- webpack 压缩 JavaScript 代码",
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
    ],
};
```

部分代码
```
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
```



## 二、编辑 webpack.config.js

```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode:"production",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "15- webpack 压缩 JavaScript 代码",
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
    ],
};
```
## 三、重新编译

压缩成功，部分代码
```
!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){document.body.appendChild(function(){let e=document.createElement("div");return e.innerHTML="Hello webpack !",e}())}]);
```

> 参考链接
- [生产环境 压缩](https://webpack.docschina.org/guides/production/#minification-%E5%8E%8B%E7%BC%A9-)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/15-webpack%20%E5%8E%8B%E7%BC%A9%20JavaScript%20%E4%BB%A3%E7%A0%81)
