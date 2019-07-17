

## 一、使用配置文件
### 1.1 新建配置文件
在package.json文件所在目录下新建webpack.config.js文件。完成之后目录格式如下

```
  demo04
  |- package.json
  |- webpack.config.js
```


### 1.2 编辑文件内容
指定入口文件和输出路径

```
const path = require('path');

module.exports = {
    //指定入口文件路径，根据需要定义
    entry: './src/index.js',
    //指定输出路径
    output: {
        filename: 'main.js',//输出的文件名称，根据需要定义
        path: path.resolve(__dirname, 'dist')//输入文件路径，根据需要定义
    }
};
```

## 二、创建一个 bundle
### 2.1 修改 package.json 文件

调整 package.json 文件，以便确保安装包是 [private](https://docs.npmjs.com/files/package.json#private) (私有的)，并且移除 main 入口。这可以防止意外发布你的代码。

### 2.2 新建src目录
在package.json文件所在目录下新建 src 目录。

### 2.3 新建 index.js 文件
在 src 目录下新建 index.js 文件,并编辑内容

```
//生成一个内容为Hello webpack !的div标签
function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello webpack !";
    return element;
}
//将生成的div标签添加到body中去
document.body.appendChild(component());
```


### 2.4 新建 dist 目录
在package.json文件所在目录下新建 dist 目录。

### 2.5 新建 index.html 文件
在 src 目录下新建 index.html 文件,并编辑内容

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>04-起步</title>
</head>
<body>
<!-- webpack配置会将main.js文件生成到index.html所在的dist目录 -->
<script src="main.js"></script>
</body>
</html>
```


完成以上操作后，目录结构如下所示

```
  demo04
  |- package.json
  |- webpack.config.js
  |- /src
    |- index.js
  |- /dist
    |- index.html
```

## 三、执行命令

执行命令生成main.js文件
```
npx webpack --config webpack.config.js
```
> 如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用。

控制台可以看到以下输出

```
Hash: f3718bba2a7a4e7b1ccd
Version: webpack 4.35.3
Time: 265ms
Built at: 07/17/2019 11:30:16 AM
  Asset      Size  Chunks             Chunk Names
main.js  1.02 KiB       0  [emitted]  main
Entrypoint main = main.js
[0] ./src/index.js 229 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/


```
> 输出可能会稍有不同，但是只要构建成功，那么你就可以放心继续。并且不要担心警告，稍后就会解决。

同时 dist 目录下会生成 main.js 文件，此时在浏览器中打开 index.html 文件可以看到 Hello webpack ! 文字显示。


> 参考链接

- [webpack起步](https://webpack.docschina.org/guides/getting-started/)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/04-%E8%B5%B7%E6%AD%A5)
