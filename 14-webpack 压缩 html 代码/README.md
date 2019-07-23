在 [10-webpack自动生成 index.html](https://github.com/1071942338/WebpackStudyNotes/blob/master/10-%20webpack%20%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%20index.html/README.md) 之后，开始使用 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#options) 自动生成的 html 文件，压缩功能也要通过他来完成。

## 一、编辑 webpack.config.js 

```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    mode:"none",//方便看代码未处理样式
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "14- webpack 压缩 index 代码",
        }),
    ]
};
```

## 二、未压缩的 index.html 文件

构建代码
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>14- webpack 压缩 index 代码</title>
  </head>
  <body>
  <script type="text/javascript" src="main.bundle.js"></script></body>
</html>
```
## 三、编辑 webpack.config.js ，配置 minify

> 经过测试设置对象，设置 true、false 无效

```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    mode:"none",//方便看代码未处理样式
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "14- webpack 压缩 index 代码",
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
    ]
};
```
## 四、压缩的 index.html 文件

构建代码

```
<!DOCTYPE html><html><head><meta charset="UTF-8"><title>14- webpack 压缩 index 代码</title></head><body><script type="text/javascript" src="main.bundle.js"></script></body></html>
```

> 参考链接

- [管理输出](https://webpack.docschina.org/guides/output-management/#%E8%AE%BE%E7%BD%AE-htmlwebpackplugin)
- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#options)
- [更多压缩配置Minification](https://github.com/jantimon/html-webpack-plugin#minification)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/14-webpack%20%E5%8E%8B%E7%BC%A9%20html%20%E4%BB%A3%E7%A0%81)