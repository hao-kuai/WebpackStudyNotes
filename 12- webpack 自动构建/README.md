每次要编译代码时，手动运行 `npm run build` 就会变得很麻烦。使用 [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server#getting-started) 可以帮助你在代码发生变化后自动编译代码。提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

## 一、安装

```
npm install --save-dev webpack-dev-server
//或者
yarn add  webpack-dev-server --dev
```

安装成功

```
yarn install v1.17.3
[1/4] Resolving packages...
success Already up-to-date.
Done in 0.41s.

F:\GitHub\WebpackStudyNotes\12- webpack 自动构建\demo12>
F:\GitHub\WebpackStudyNotes\12- webpack 自动构建\demo12>
F:\GitHub\WebpackStudyNotes\12- webpack 自动构建\demo12>
F:\GitHub\WebpackStudyNotes\12- webpack 自动构建\demo12>yarn add  webpack-dev-server --dev
yarn add v1.17.3
[1/4] Resolving packages...
info There appears to be trouble with your network connection. Retrying...
[2/4] Fetching packages...
info There appears to be trouble with your network connection. Retrying...
info fsevents@1.2.9: The platform "win32" is incompatible with this module.
info "fsevents@1.2.9" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
[4/4] Building fresh packages...

success Saved lockfile.
success Saved 87 new dependencies.
info Direct dependencies
└─ webpack-dev-server@3.7.2
info All dependencies
├─ accepts@1.3.7
├─ ansi-colors@3.2.4
├─ ansi-html@0.0.7
├─ array-flatten@1.1.1
├─ async@1.5.2
├─ batch@0.6.1
├─ body-parser@1.19.0
├─ bonjour@3.5.0
├─ buffer-indexof@1.1.1
├─ cliui@4.1.0
├─ compressible@2.0.17
├─ compression@1.7.4
├─ connect-history-api-fallback@1.6.0
├─ content-disposition@0.5.3
├─ cookie-signature@1.0.6
├─ cookie@0.4.0
├─ deep-equal@1.0.1
├─ default-gateway@4.2.0
├─ destroy@1.0.4
├─ detect-node@2.0.4
├─ dns-equal@1.0.0
├─ dns-packet@1.3.1
├─ dns-txt@2.0.2
├─ ee-first@1.1.1
├─ eventemitter3@3.1.2
├─ eventsource@1.0.7
├─ express@4.17.1
├─ faye-websocket@0.10.0
├─ finalhandler@1.1.2
├─ follow-redirects@1.7.0
├─ forwarded@0.1.2
├─ get-caller-file@1.0.3
├─ handle-thing@2.0.0
├─ hpack.js@2.1.6
├─ html-entities@1.2.1
├─ http-deceiver@1.2.7
├─ http-parser-js@0.4.10
├─ http-proxy-middleware@0.19.1
├─ http-proxy@1.17.0
├─ internal-ip@4.3.0
├─ ip-regex@2.1.0
├─ ip@1.1.5
├─ ipaddr.js@1.9.1
├─ json3@3.3.3
├─ killable@1.0.1
├─ loglevel@1.6.3
├─ media-typer@0.3.0
├─ merge-descriptors@1.0.1
├─ methods@1.1.2
├─ mime-db@1.40.0
├─ mime@2.4.4
├─ multicast-dns-service-types@1.1.0
├─ multicast-dns@6.2.3
├─ negotiator@0.6.2
├─ node-forge@0.7.5
├─ obuf@1.1.2
├─ on-headers@1.0.2
├─ opn@5.5.0
├─ original@1.0.2
├─ p-retry@3.0.1
├─ path-to-regexp@0.1.7
├─ portfinder@1.0.21
├─ proxy-addr@2.0.5
├─ querystringify@2.1.1
├─ raw-body@2.4.0
├─ require-main-filename@1.0.1
├─ retry@0.12.0
├─ select-hose@2.0.0
├─ selfsigned@1.10.4
├─ serve-index@1.9.1
├─ serve-static@1.14.1
├─ sockjs-client@1.3.0
├─ sockjs@0.3.19
├─ spdy-transport@3.0.0
├─ spdy@4.0.0
├─ thunky@1.0.3
├─ type-is@1.6.18
├─ unpipe@1.0.0
├─ utils-merge@1.0.1
├─ uuid@3.3.2
├─ wbuf@1.7.3
├─ webpack-dev-middleware@3.7.0
├─ webpack-dev-server@3.7.2
├─ websocket-extensions@0.1.3
├─ wrap-ansi@2.1.0
├─ yargs-parser@11.1.1
└─ yargs@12.0.5
Done in 135.14s.

```


## 二、编辑 webpack.config.js

修改配置文件，告诉开发服务器(dev server)，在哪里查找文件：


```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin")
const {CleanWebpackPlugin}  = require("clean-webpack-plugin")
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer:{
        contentBase:"./dist"
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "10- webpack 自动生成 index.html"//配置title属性
        }),
        new CleanWebpackPlugin(),

    ]
};
```
以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
## 三、编辑 package.json 


```
{
  "name": "demo02",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.0.0",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.35.3",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.7.2"
  },
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server"
  }
}

```

## 四、运行 start 指令

```
npm run start 
//或者
yarn start
```
运行成功


```
yarn run v1.17.3
$ webpack-dev-server
i ｢wds｣: Project is running at http://localhost:8080/
i ｢wds｣: webpack output is served from /
i ｢wds｣: Content not from webpack is served from ./dist
i ｢wdm｣: Hash: 80ca53e91aed9fc00e90
Version: webpack 4.35.3
Time: 653ms
Built at: 2019-07-20 16:04:54
         Asset       Size  Chunks             Chunk Names
    index.html  203 bytes          [emitted]
main.bundle.js    360 KiB    main  [emitted]  main
Entrypoint main = main.bundle.js
[0] multi (webpack)-dev-server/client?http://localhost ./src/index.js 40 bytes {main} [built]
[./node_modules/ansi-html/index.js] 4.16 KiB {main} [built]
[./node_modules/ansi-regex/index.js] 135 bytes {main} [built]
[./node_modules/html-entities/index.js] 231 bytes {main} [built]
[./node_modules/loglevel/lib/loglevel.js] 7.68 KiB {main} [built]
[./node_modules/strip-ansi/index.js] 161 bytes {main} [built]
[./node_modules/webpack-dev-server/client/index.js?http://localhost] (webpack)-dev-server/client?http://localhost 4.29 KiB {main} [built]
[./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.51 KiB {main} [built]
[./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.53 KiB {main} [built]
[./node_modules/webpack-dev-server/client/utils/createSocketUrl.js] (webpack)-dev-server/client/utils/createSocketUrl.js 2.77 KiB {main} [built]
[./node_modules/webpack-dev-server/client/utils/log.js] (webpack)-dev-server/client/utils/log.js 964 bytes {main} [built]
[./node_modules/webpack-dev-server/client/utils/reloadApp.js] (webpack)-dev-server/client/utils/reloadApp.js 1.63 KiB {main} [built]
[./node_modules/webpack-dev-server/client/utils/sendMessage.js] (webpack)-dev-server/client/utils/sendMessage.js 402 bytes {main} [built]
[./node_modules/webpack/hot sync ^\.\/log$] (webpack)/hot sync nonrecursive ^\.\/log$ 170 bytes {main} [built]
[./src/index.js] 250 bytes {main} [built]
    + 18 hidden modules
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [./node_modules/html-webpack-plugin/lib/loader.js!./node_modules/html-webpack-plugin/default_index.ejs] 376 bytes {0} [built]
    [./node_modules/lodash/lodash.js] 528 KiB {0} [built]
    [./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
    [./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {0} [built]
i ｢wdm｣: Compiled successfully.

```


## 五、运行 index.html

在 Chrome 浏览器中打开 http://localhost:8080/ ，可以看到 `Hello webpack ！`字样

## 六、 编辑 index.js 


```
//生成一个内容为Hello webpack !的div标签
function component() {
    let element = document.createElement('div');
    element.innerHTML = "Hello webpack !你好！";
    //添加class
    return element;
}
//将生成的div标签添加到body中去
document.body.appendChild(component());
```
然后保存
浏览器中的页面自动刷新，并显示`Hello webpack ！你好！`

> 参考链接

- [开发](https://www.webpackjs.com/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-server)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/12-%20webpack%20%E8%87%AA%E5%8A%A8%E6%9E%84%E5%BB%BA)
- [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server#getting-started)