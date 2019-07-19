index.html 文件是手动创建编辑的，js 文件是 webpack 自动生成的。当js文件名称改变时还需要手动修改 index.html 文件，随着应用程序增长， index.html 文件进行管理，一切就会变得困难起来。然而，可以通过插件 [HtmlWebpackPlugin](https://www.webpackjs.com/plugins/html-webpack-plugin) ，自动完成这个任务。

## 一、安装插件

```
npm install --save-dev html-webpack-plugin
//
yarn add html-webpack-plugin --dev
```
安装成功

```
yarn install v1.17.3
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@1.2.9: The platform "win32" is incompatible with this module.
info "fsevents@1.2.9" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 3.50s.

F:\GitHub\WebpackStudyNotes\10- webpack 自动生成 index.html\demo10>yarn build
yarn run v1.17.3
$ webpack
Hash: 39c4703dc74c68d3bf1f
Version: webpack 4.35.3
Time: 563ms
Built at: 2019-07-19 20:29:28
    Asset      Size  Chunks             Chunk Names
bundle.js  1.02 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/index.js 250 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
Done in 3.62s.

F:\GitHub\WebpackStudyNotes\10- webpack 自动生成 index.html\demo10>
F:\GitHub\WebpackStudyNotes\10- webpack 自动生成 index.html\demo10>
F:\GitHub\WebpackStudyNotes\10- webpack 自动生成 index.html\demo10>
F:\GitHub\WebpackStudyNotes\10- webpack 自动生成 index.html\demo10>
F:\GitHub\WebpackStudyNotes\10- webpack 自动生成 index.html\demo10>yarn add html-webpack-plugin --dev
yarn add v1.17.3
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@1.2.9: The platform "win32" is incompatible with this module.
info "fsevents@1.2.9" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 32 new dependencies.
info Direct dependencies
└─ html-webpack-plugin@3.2.0
info All dependencies
├─ camel-case@3.0.0
├─ clean-css@4.2.1
├─ commander@2.17.1
├─ css-select@1.2.0
├─ css-what@2.1.3
├─ dom-converter@0.2.0
├─ domelementtype@1.3.1
├─ domhandler@2.4.2
├─ domutils@1.5.1
├─ es-abstract@1.13.0
├─ es-to-primitive@1.2.0
├─ has-symbols@1.0.0
├─ has@1.0.3
├─ he@1.2.0
├─ html-minifier@3.5.21
├─ html-webpack-plugin@3.2.0
├─ htmlparser2@3.10.1
├─ is-date-object@1.0.1
├─ is-regex@1.0.4
├─ is-symbol@1.0.2
├─ lodash@4.17.15
├─ lower-case@1.1.4
├─ nth-check@1.0.2
├─ object.getownpropertydescriptors@2.0.3
├─ param-case@2.1.1
├─ pretty-error@2.1.1
├─ relateurl@0.2.7
├─ renderkid@2.0.3
├─ toposort@1.0.7
├─ uglify-js@3.4.10
├─ upper-case@1.1.3
└─ util.promisify@1.0.0
Done in 69.39s.

```


## 二、编辑 webpack.config.js

```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin")
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "10- webpack 自动生成 index.html"//配置title属性
        }),
    ]
};
```

> 更多[属性配置](https://github.com/jantimon/html-webpack-plugin#configuration)
## 三、删除 dist 目录下的 index.html 文件

## 四、执行构建指令
```
npm run build
//或者
yanr build
```
构建完成

```
yarn run v1.17.3
$ webpack
Hash: 47a0ff4443612ee847a5
Version: webpack 4.35.3
Time: 875ms
Built at: 2019-07-19 21:44:40
         Asset       Size  Chunks             Chunk Names
    index.html  203 bytes          [emitted]
main.bundle.js   1.02 KiB       0  [emitted]  main
Entrypoint main = main.bundle.js
[0] ./src/index.js 250 bytes {0} [built]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [2] (webpack)/buildin/global.js 472 bytes {0} [built]
    [3] (webpack)/buildin/module.js 497 bytes {0} [built]
        + 2 hidden modules
Done in 2.91s.
```
### 五、 运行 index.html 文件
在 Chrome 浏览器中打开文件，可以看到标题为：`10- webpack 自动生成 index.html`，内容区显示 `Hello Webpack ！`字样。

> 参考链接

- [管理输出](https://www.webpackjs.com/guides/output-management/#%E8%AE%BE%E5%AE%9A-htmlwebpackplugin)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/10-%20webpack%20%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%20index.html)