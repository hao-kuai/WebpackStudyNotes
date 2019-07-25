在 [10- webpack 自动生成 index.html](https://github.com/1071942338/WebpackStudyNotes/tree/master/10-%20webpack%20%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%20index.html) 之后，index.html 的自动生成任务 由 `html-webpack-plugin` 接管。

有时候会面临需要将一段 html标签内容、初始化页面的JavaScript、初始化样式CSS 需要内联的需要，可以直接写到 index.html 中去，但是为了方便维护最好还是把文件独立出来，然后由 webpack 自动完成内联任务。

webpack 完成内联任务，需要借助 `raw-laoder` 完成。

## 一、使用模板文件

修改 webpack.config.js 中的 `html-webpack-plugin` 的配置项，指定模板文件。

```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "18-webpack 实现 Html、JavaScript、CSS 内联",
            template:"./src/index.html",//指定首页模板
        }),
    ]
};
```

## 二、新建内联文件
index.js

```
function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello webpack !";
    element.classList.add("hello");
    return element;
}
document.body.appendChild(component());
```
demo.inline.html

```
<meta name=keywords content=webpack >
<meta name=description content=webpack是一个功能强大的打包工具>
```

demo.inline.js

```
console.log("内联JavaScript");
```

demo.inline.css

```
.hello{
    color: red;
}
```

## 三、安装 raw-loader
安装

```
npm install raw-loader --save-dev
//
yarn add raw-loader --dev
```
安装成功

```
yarn add v1.16.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ raw-loader@3.1.0
info All dependencies
└─ raw-loader@3.1.0
✨  Done in 4.36s.

```

## 四、编辑 src/index.html 模板文件

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--  内联html  -->
    ${require("raw-loader!./demo.inline.html").default}
    <!--  内联js  -->
    <script>
        ${require("raw-loader!./demo.inline.js").default}
    </script>
    <!--  内联css  -->
    <style>
        ${require("raw-loader!./demo.inline.css").default}
    </style>
    <title>18-webpack 实现 Html、JavaScript、CSS 内联</title>
</head>
<body>

</body>
</html>
```

## 五、查看 dist/index.html
然后查看 dist 目录下自动生成的文件


```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name=keywords content=webpack >
<meta name=description content=webpack是一个功能强大的打包工具>
    <script>
        console.log("内联JavaScript");
    </script>
    <style>
        .hello{
    color: red;
}
    </style>
    <title>18-webpack 实现 Html、JavaScript、CSS 内联</title>
</head>
<body>

<script type="text/javascript" src="main.bundle.js"></script></body>
</html>
```
在 Chrome 中打开 index.html，可以看到 `<meta>`、字体样式、console输出。


## 六、语法说明

### 6.1 指定 template
 html-webpack-plugin 的 template  
指定 index.html 文件相对于 webpack.config.js 的相对路径或者绝对路径。

### 6.2 [template](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md) 说明


```
{
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
```

不指定解析 loader 的情况下使用  [lodash loader](https://github.com/jantimon/html-webpack-plugin/blob/master/lib/loader.js) 

### 6.3 lodash loader
部分代码
```
  // The following part renders the template with lodash as a minimalistic loader
  //
  const template = _.template(source, _.defaults(options, { interpolate: /<%=([\s\S]+?)%>/g, variable: 'data' }));
  // Use __non_webpack_require__ to enforce using the native nodejs require
  // during template execution
  return 'var _ = __non_webpack_require__(' + JSON.stringify(require.resolve('lodash')) + ');' +
    'module.exports = function (templateParams) { with(templateParams) {' +
      // Execute the lodash template
      'return (' + template.source + ')();' +
    '}}';
```

### 6.4 [lodash 的 _.template](https://www.lodashjs.com/docs/latest#_templatestring-options)

```
_.template([string=''], [options={}])
```
使用 模板字符串 和 选项对象 返回编译模板函数。

### 6.4 raw-loader

核心代码
```
import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

import schema from './options.json';

export default function rawLoader(source) {
  const options = getOptions(this) || {};

  validateOptions(schema, options, {
    name: 'Raw Loader',
    baseDataPath: 'options',
  });

  const json = JSON.stringify(source)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return `export default ${json}`;
}
```
使用 require 加载 export default 需要重 .default 属性中获取内容

```
const something = require("something");
console.log(something.default);
```



> 参考链接

1. [设置 HtmlWebpackPlugin](https://webpack.docschina.org/guides/output-management/#%E8%AE%BE%E7%BD%AE-htmlwebpackplugin)
2. [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
3. [raw-loader](https://github.com/webpack-contrib/raw-loader)
4. [html-webpack-plugin/docs/template-option.md](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md)
5. [html-webpack-plugin/lib/loader.js](https://github.com/jantimon/html-webpack-plugin/blob/master/lib/loader.js)
6. [_.template](https://www.lodashjs.com/docs/latest#_templatestring-options)
7. [玩转 webpack 第三章](https://github.com/geektime-geekbang/geektime-webpack-course/blob/master/ppt/%E3%80%8A%E7%8E%A9%E8%BD%ACwebpack%E3%80%8B%20%E7%AC%AC%E4%B8%89%E7%AB%A0.pdf)
