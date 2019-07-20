由于每次执行构建命令，webpack 都会在 dist 目录生成文件，导该目录 文件夹相当杂乱。
通常，在每次构建前清理 dist 目录，是比较推荐的做法，因此只会生成用到的文件。通过
[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)  插件完成自动清理任务。

## 一、安装插件

```
npm install --save-dev clean-webpack-plugin
//
yarn add clean-webpack-plugin --dev
```
安装成功

```
yarn add v1.17.3
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@1.2.9: The platform "win32" is incompatible with this module.
info "fsevents@1.2.9" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 19 new dependencies.
info Direct dependencies
└─ clean-webpack-plugin@3.0.0
info All dependencies
├─ @types/anymatch@1.3.1
├─ @types/events@3.0.0
├─ @types/glob@7.1.1
├─ @types/minimatch@3.0.3
├─ @types/tapable@1.0.4
├─ @types/uglify-js@3.0.4
├─ @types/webpack@4.4.35
├─ array-union@1.0.2
├─ array-uniq@1.0.3
├─ clean-webpack-plugin@3.0.0
├─ del@4.1.1
├─ globby@6.1.0
├─ is-path-cwd@2.2.0
├─ is-path-in-cwd@2.1.0
├─ is-path-inside@2.1.0
├─ p-map@2.1.0
├─ path-is-inside@1.0.2
├─ pinkie-promise@2.0.1
└─ pinkie@2.0.4
Done in 38.32s.


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

## 三、执行构建指令
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
Time: 392ms
Built at: 2019-07-19 22:14:56
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
Done in 2.37s.

```
## 四、 运行 index.html 文件
在 Chrome 浏览器中打开文件，可以看到标题为：`10- webpack 自动生成 index.html`，内容区显示 `Hello Webpack ！`字样。而且其余多余文件被自动清理。


## 五、注意
编辑 webpack.config.js 文件时，如果这样引入插件

```
const CleanWebpackPlugin = require('clean-webpack-plugin');
```


会报错

```
yarn run v1.17.3
$ webpack
F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\webpack-cli\bin\cli.js:93
                                throw err;
                                ^

TypeError: CleanWebpackPlugin is not a constructor
    at Object.<anonymous> (F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\webpack.config.js:14:9)
    at Module._compile (F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\v8-compile-cache\v8-compile-cache.js:192:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Module.require (module.js:596:17)
    at require (F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\v8-compile-cache\v8-compile-cache.js:161:20)
    at WEBPACK_OPTIONS (F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\webpack-cli\bin\utils\convert-argv.js:116:13)
    at requireConfig (F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\webpack-cli\bin\utils\convert-argv.js:118:6)
    at F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\webpack-cli\bin\utils\convert-argv.js:125:17
    at Array.forEach (<anonymous>)
    at module.exports (F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\webpack-cli\bin\utils\convert-argv.js:123:15)
    at yargs.parse (F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\webpack-cli\bin\cli.js:71:45)
    at Object.parse (F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\yargs\yargs.js:567:18)
    at F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\webpack-cli\bin\cli.js:49:8
    at Object.<anonymous> (F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\webpack-cli\bin\cli.js:365:3)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Module.require (module.js:596:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (F:\GitHub\WebpackStudyNotes\11- webpack 自动清理 dist 目录\demo11\node_modules\webpack\bin\webpack.js:156:2)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

```
正确姿势是

```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
```


> 参考链接

- [管理输出](https://www.webpackjs.com/guides/output-management/#%E8%AE%BE%E5%AE%9A-htmlwebpackplugin)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/11-%20webpack%20%E8%87%AA%E5%8A%A8%E6%B8%85%E7%90%86%20dist%20%E7%9B%AE%E5%BD%95)
- [Clean plugin for webpack](https://www.npmjs.com/package/clean-webpack-plugin)