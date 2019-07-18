
使用 file-loader 来处理字体文件。
## 一、安装loader
加载图片时已经安装过 file-loader ，无需重复安装。

```
npm install --save-dev file-loader
//或者
yarn add file-loader --dev
```

## 二、编辑 webpack.config.js 文件

```
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

## 三、添加字体文件

```
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- 华文彩云.ttf
    |- icon.png
    |- style.css
    |- index.js
  |- /node_modules
```

## 四、编辑 style.css 文件

``` 
//加载字体
@font-face {
   font-family: "MyFont";//名称可自定义
   src:  url('./华文彩云.ttf');//填写真实路径
   font-weight: 600;
   font-style: normal;
}

.hello{
    color: red;
    font-size: 30px;
    font-family: "MyFont";//引用字体
}
.image{
    width: 100px;
    height: 100px;
}

```


## 五、重新构建

```
yarn run v1.16.0
$ webpack
Hash: b5daf97a40d8bf121d3c
Version: webpack 4.35.3
Time: 552ms
Built at: 07/18/2019 2:40:10 PM
                               Asset      Size  Chunks                    Chunk Names
71eaacb7c100911a2acca6547fa6520a.ttf   5.4 MiB          [emitted]  [big]  
76e7e08e0b3a04a612c89ad13c999813.jpg    51 KiB          [emitted]         
                           bundle.js  7.68 KiB       0  [emitted]         main
Entrypoint main = bundle.js
[0] ./src/icon.jpg 82 bytes {0} [built]
[1] ./src/index.js 572 bytes {0} [built]
[2] ./src/style.css 1.06 KiB {0} [built]
[3] ./node_modules/css-loader/dist/cjs.js!./src/style.css 558 bytes {0} [built]
[6] ./src/华文彩云.ttf 82 bytes {0} [built]
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
✨  Done in 1.22s.

```

## 六、重新打开 index.html 文件

即可看到华文彩云字体的 `Hello webpack ！` 字样。

> 参考链接

- [管理资源](https://webpack.docschina.org/guides/asset-management/#%E5%8A%A0%E8%BD%BD-css)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/08-%E5%8A%A0%E8%BD%BD%E5%AD%97%E4%BD%93)