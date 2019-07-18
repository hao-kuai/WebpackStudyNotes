## 一、加载 json 文件
内置支持 JSON 解析，也就是说 `import Data from './data.json'` 默认将正常运行。

### 1.1 添加 json 文件

```
  demo09
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- 华文彩云.ttf
    |- icon.png
    |- style.css
    |- index.js
  + |- /data
  +     |- json.json    
  |- /node_modules
```

### 1.2 编辑 index.js 文件

```
import "./style.css"
import Icon from './icon.jpg';
import jsonData from "./data/json.json"

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

//打印 JSON 数据
console.log("JSON",jsonData);
```

### 1.3 重新构建

```
npm run build
//或者
yanr build
```


```
yarn run v1.16.0
$ webpack
Hash: 60e06afbd947848d1740
Version: webpack 4.35.3
Time: 585ms
Built at: 07/18/2019 3:12:17 PM
                               Asset     Size  Chunks                    Chunk Names
71eaacb7c100911a2acca6547fa6520a.ttf  5.4 MiB          [emitted]  [big]  
76e7e08e0b3a04a612c89ad13c999813.jpg   51 KiB          [emitted]         
                           bundle.js  7.8 KiB       0  [emitted]         main
Entrypoint main = bundle.js
[0] ./src/icon.jpg 82 bytes {0} [built]
[1] ./src/data/json.json 70 bytes {0} [built]
[2] ./src/index.js 657 bytes {0} [built]
[3] ./src/style.css 1.06 KiB {0} [built]
[4] ./node_modules/css-loader/dist/cjs.js!./src/style.css 558 bytes {0} [built]
[7] ./src/华文彩云.ttf 82 bytes {0} [built]
    + 4 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  71eaacb7c100911a2acca6547fa6520a.ttf (5.4 MiB)

WARNING in webpack performance recommendations: 
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
✨  Done in 1.52s.

```
### 1.4 运行 index.html 文件
在 Chrome 浏览器中打开文件，然后使用 检查 功能，查看 Console 控制台输出

```
JSON Object
    name: "Webpack"
    url: "https://webpack.docschina.org"
    __proto__: Object
```


## 二、加载 xml 文件

解析 xml 文件需要 xml-loader 支持。

### 2.1 添加 xml 文件

```
  demo09
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- 华文彩云.ttf
    |- icon.png
    |- style.css
    |- index.js
    |- /data
       |- json.json
  +    |- xml.xml
  |- /node_modules
```

### 2.2 安装 xml-loader 

```
npm install --save-dev xml-loader
//或者
yarn add xml-loader --dev
```

安装成功
```
yarn add v1.16.0
[1/4] 🔍  Resolving packages...
info There appears to be trouble with your network connection. Retrying...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 3 new dependencies.
info Direct dependencies
└─ xml-loader@1.2.1
info All dependencies
├─ xml-loader@1.2.1
├─ xml2js@0.4.19
└─ xmlbuilder@9.0.7
✨  Done in 97.46s.

```

### 2.3 编辑 webpack.config.js 文件

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
                    "file-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            //添加 xml-loader 
            {
                test:/\.xml$/,
                use:[
                    "xml-loader"
                ]
            }
        ]
    }
};
```

### 2.4 编辑 index.js 文件


```
import "./style.css"
import Icon from './icon.jpg';
import jsonData from "./data/json.json"
import xmlData from "./data/xml.xml"


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

//打印 JSON 数据
console.log("JSON",jsonData);

//打印 XML 数据
console.log("XML",xmlData);
```


### 2.5 重新构建

```
npm run build
//或者
yanr build
```
构建完成

```
yarn run v1.16.0
$ webpack
Hash: bf43775a50bb772ed478
Version: webpack 4.35.3
Time: 589ms
Built at: 07/18/2019 3:28:27 PM
                               Asset      Size  Chunks                    Chunk Names
71eaacb7c100911a2acca6547fa6520a.ttf   5.4 MiB          [emitted]  [big]  
76e7e08e0b3a04a612c89ad13c999813.jpg    51 KiB          [emitted]         
                           bundle.js  7.88 KiB       0  [emitted]         main
Entrypoint main = bundle.js
[0] ./src/icon.jpg 82 bytes {0} [built]
[1] ./src/data/json.json 70 bytes {0} [built]
[2] ./src/data/xml.xml 35 bytes {0} [built]
[3] ./src/index.js 736 bytes {0} [built]
[4] ./src/style.css 1.06 KiB {0} [built]
[5] ./node_modules/css-loader/dist/cjs.js!./src/style.css 558 bytes {0} [built]
[8] ./src/华文彩云.ttf 82 bytes {0} [built]
    + 4 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  71eaacb7c100911a2acca6547fa6520a.ttf (5.4 MiB)

WARNING in webpack performance recommendations: 
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
✨  Done in 1.28s.

```

### 2.6 运行 index.html 文件
在 Chrome 浏览器中打开文件，然后使用 检查 功能，查看 Console 控制台输出

```
XML {data: {…}}
    data:
    name: ["Webpack"]
    url: ["https://webpack.docschina.org"]
    __proto__: Object
__proto__: Object
```

## 三、加载csv 文件

解析 csv 文件需要 csv-loader 支持。
### 3.1 添加 csv 文件

```
  demo09
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
    |- 华文彩云.ttf
    |- icon.png
    |- style.css
    |- index.js
    |- /data
       |- json.json
       |- xml.xml
  +    |- csv.csv
  |- /node_modules
```


### 3.2 安装 csv-loader 

```
npm install --save-dev csv-loader
//或者
yarn add csv-loader --dev
```

安装成功
```
yarn add v1.16.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning " > csv-loader@3.0.2" has unmet peer dependency "papaparse@^4.5.0".
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
warning Your current version of Yarn is out of date. The latest version is "1.17.3", while you're on "1.16.0".
info To upgrade, run the following command:
$ brew upgrade yarn
success Saved 1 new dependency.
info Direct dependencies
└─ csv-loader@3.0.2
info All dependencies
└─ csv-loader@3.0.2
✨  Done in 5.76s.

```

### 3.3 编辑 webpack.config.js 文件

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
                    "file-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test:/\.xml$/,
                use:[
                    "xml-loader"
                ]
            },
            {
                test:/\.csv$/,
                use:[
                    "csv-loader"
                ]
            },

        ]
    }
};
```

### 3.4 编辑 index.js 文件


```
import "./style.css"
import Icon from './icon.jpg';
import jsonData from "./data/json.json"
import xmlData from "./data/xml.xml"
import csvData from "./data/csv.csv"


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

//打印 JSON 数据
console.log("JSON",jsonData);

//打印 XML 数据
console.log("XML",xmlData);

//打印 CSV 数据
console.log("CSV",csvData);

```


### 3.5 重新构建

```
npm run build
//或者
yanr build
```
#### 3.5.1 构建报错

```
yarn run v1.16.0
$ webpack
Hash: b80ebf3efcac0c0baf95
Version: webpack 4.35.3
Time: 579ms
Built at: 07/18/2019 4:28:52 PM
 3 assets
Entrypoint main = bundle.js
[0] ./src/icon.jpg 82 bytes {0} [built]
[1] ./src/data/json.json 70 bytes {0} [built]
[2] ./src/data/xml.xml 86 bytes {0} [built]
[3] ./src/data/csv.csv 3.05 KiB {0} [not cacheable] [built] [failed] [1 error]
[4] ./src/index.js 817 bytes {0} [built]
[5] ./src/style.css 1.06 KiB {0} [built]
[6] ./node_modules/css-loader/dist/cjs.js!./src/style.css 558 bytes {0} [built]
[9] ./src/华文彩云.ttf 82 bytes {0} [built]
    + 4 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

ERROR in ./src/data/csv.csv
Module build failed (from ./node_modules/csv-loader/index.js):
Error: Cannot find module 'papaparse'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:636:15)
    at Function.Module._load (internal/modules/cjs/loader.js:562:25)
    at Module.require (internal/modules/cjs/loader.js:690:17)
    at require (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)
    at Object.<anonymous> (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/csv-loader/index.js:1:74)
    at Module._compile (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:787:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Module.require (internal/modules/cjs/loader.js:690:17)
    at require (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/v8-compile-cache/v8-compile-cache.js:161:20)
    at loadLoader (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/loader-runner/lib/loadLoader.js:18:17)
    at iteratePitchingLoaders (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/loader-runner/lib/LoaderRunner.js:169:2)
    at runLoaders (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/loader-runner/lib/LoaderRunner.js:365:2)
    at NormalModule.doBuild (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/webpack/lib/NormalModule.js:281:3)
    at NormalModule.build (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/webpack/lib/NormalModule.js:427:15)
    at Compilation.buildModule (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/webpack/lib/Compilation.js:635:10)
    at factory.create (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/webpack/lib/Compilation.js:882:14)
    at factory (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/webpack/lib/NormalModuleFactory.js:409:6)
    at hooks.afterResolve.callAsync (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/webpack/lib/NormalModuleFactory.js:155:13)
    at AsyncSeriesWaterfallHook.eval [as callAsync] (eval at create (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:6:1)
    at resolver (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/webpack/lib/NormalModuleFactory.js:138:29)
    at process.nextTick (/Users/zhangwenqi/Documents/GitHub/WebpackStudyNotes/09-加载数据/demo09/node_modules/webpack/lib/NormalModuleFactory.js:346:9)
    at process._tickCallback (internal/process/next_tick.js:61:11)
 @ ./src/index.js 5:0-37 38:18-26
error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

```
#### 3.5.2 解决办法
安装缺少的包 **papaparse**

```
npm install --save-dev papaparse
//或者
yarn add papaparse --dev
```
#### 3.5.3 安装成功

```
yarn add v1.16.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning " > csv-loader@3.0.2" has incorrect peer dependency "papaparse@^4.5.0".
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ papaparse@5.0.0
info All dependencies
└─ papaparse@5.0.0
✨  Done in 2.36s.

```


#### 3.5.4 重新构建完成

```
yarn run v1.16.0
$ webpack
Hash: caf59bb1a80ff4456bbe
Version: webpack 4.35.3
Time: 583ms
Built at: 07/18/2019 4:33:03 PM
                               Asset      Size  Chunks                    Chunk Names
71eaacb7c100911a2acca6547fa6520a.ttf   5.4 MiB          [emitted]  [big]  
76e7e08e0b3a04a612c89ad13c999813.jpg    51 KiB          [emitted]         
                           bundle.js  8.05 KiB       0  [emitted]         main
Entrypoint main = bundle.js
[0] ./src/icon.jpg 82 bytes {0} [built]
[1] ./src/data/json.json 70 bytes {0} [built]
[2] ./src/data/xml.xml 86 bytes {0} [built]
[3] ./src/data/csv.csv 77 bytes {0} [built]
[4] ./src/index.js 817 bytes {0} [built]
[5] ./src/style.css 1.06 KiB {0} [built]
[6] ./node_modules/css-loader/dist/cjs.js!./src/style.css 558 bytes {0} [built]
[9] ./src/华文彩云.ttf 82 bytes {0} [built]
    + 4 hidden modules

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.
Assets: 
  71eaacb7c100911a2acca6547fa6520a.ttf (5.4 MiB)

WARNING in webpack performance recommendations: 
You can limit the size of your bundles by using import() or require.ensure to lazy load some parts of your application.
For more info visit https://webpack.js.org/guides/code-splitting/
✨  Done in 1.26s.
```

### 3.6 运行 index.html 文件
在 Chrome 浏览器中打开文件，然后使用 检查 功能，查看 Console 控制台输出

```
CSV (2) [Array(2), Array(2)]
    0: Array(2)
        0: "name"
        1: "url"
        length: 2
        __proto__: Array(0)
    1: Array(2)
        0: "Webpack"
        1: "https://webpack.docschina.org"
        length: 2
    __proto__: Array(0)
    length: 2
__proto__: Array(0)
```
> 参考链接

- [管理资源](https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD-css)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/09-%E5%8A%A0%E8%BD%BD%E6%95%B0%E6%8D%AE)
