
> 由于 tree shaking 是 webpack 的内置功能，生产模式下默认开启，此处只做验证性演示

## 一、简介

### 1.1 功能
tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export。

### 1.2 寓意
将应用程序想象成一棵树。绿叶表示实际用到的 source code(源码) 和 library(库)，是树上活的树叶。枯叶表示未引用代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树（shaking tree），使它们落下。

## 二、添加公共模块

在 src 目录下添加 common.js ,并编辑内容

```
export function funcA() {
    console.log("方法A");
}

export function funcB() {
    console.log("方法B");
}
```

## 三、编辑 index.js


```
import { funcA } from './common.js';
//生成一个内容为Hello webpack !的div标签
function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello webpack !";
    //使用funcA
    console.log("funcA",funcA());
    return element;
}
//将生成的div标签添加到body中去
document.body.appendChild(component());
```

## 四、编辑 webpack.config.js

### 4.1 设置 mode 为 none


```
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode:"none",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

编译好的 main.js 内容

```
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "funcA", function() { return funcA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "funcB", function() { return funcB; });
function funcA() {
    console.log("方法A");
}

function funcB() {
    console.log("方法B");
}
```
虽然 funcB 没有使用，仍然被编译进来。

### 4.1 设置 mode 为 development


```
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode:"development",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

编译好的 main.js 内容，关于 common.js的内容

```
/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! exports provided: funcA, funcB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"funcA\", function() { return funcA; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"funcB\", function() { return funcB; });\nfunction funcA() {\n    console.log(\"方法A\");\n}\n\nfunction funcB() {\n    console.log(\"方法B\");\n}\n\n//# sourceURL=webpack:///./src/common.js?");

/***/ }),

```
代码格式化后

```
/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! exports provided: funcA, funcB */
(function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    eval("__webpack_require__.r(__webpack_exports__);" +
        "/* harmony export (binding) */ " +
        "__webpack_require__.d(" +
            "__webpack_exports__, \"funcA\", function() { return funcA; });" +
        "/* harmony export (binding) */" +
        " __webpack_require__.d(__webpack_exports__, \"funcB\", function() { return funcB; });" +
        "function funcA() {" +
            "console.log(\"方法A\");" +
        "}" +
        "function funcB() {" +
            "console.log(\"方法B\");" +
        "}" +
        "//# sourceURL=webpack:///./src/common.js?");
})
```
依然明显可以看出，虽然 funcB 没有使用，仍然被编译进来。

### 4.3 设置 mode 为 production


```
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode:"production",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};
```

编译好的 main.js 内容，内容会被压缩；重新格式化后，关于 common.js的内容：

```
([function (e, t, n) {
    "use strict";
    n.r(t), document.body.appendChild(function () {
        let e = document.createElement("div");
        return e.innerHTML = "Hello webpack !", console.log("funcA", void console.log("方法A")), e
    }())
}]);
```
目前只能看到 funcA，没有 funcB 相关内容。

## 五、结束

虽然，在这个特定示例中，可能看起来没有减少很多，但是，在有着复杂依赖树的大型应用程序上运行 tree shaking 时，会对 bundle 产生显著的体积优化。

> 参考链接
- [tree-shaking](https://webpack.docschina.org/guides/tree-shaking/)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/13-%20webpack%20tree%20shaking)

