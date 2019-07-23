从 [06-webpack 加载 CSS 之后](https://github.com/1071942338/WebpackStudyNotes/blob/master/06-%E5%8A%A0%E8%BD%BD%20CSS/README.md)，能够正常加载 CSS ，并且能够正常显示。

要看到压缩 CSS 代码效果，需要先把 CSS 从 bundle.js 中抽离出来，并导入独立的文件中去，然后再添加压缩操作。

## 一、导出 CSS 到独立文件
需要通过 mini-css-extract-plugin 插件来完成。
### 1.1 安装

```
npm install --save-dev mini-css-extract-plugin
//
yarn add  mini-css-extract-plugin --dev
```
安装成功

```
yarn add v1.16.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 7 new dependencies.
info Direct dependencies
└─ mini-css-extract-plugin@0.8.0
info All dependencies
├─ is-plain-obj@1.1.0
├─ mini-css-extract-plugin@0.8.0
├─ normalize-url@1.9.1
├─ prepend-http@1.0.4
├─ query-string@4.3.4
├─ sort-keys@1.1.2
└─ strict-uri-encode@1.1.0
✨  Done in 7.18s.

```

### 1.2 编辑 webpack.config.js

```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    mode:"production",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                ]
            },
            {
                test:/\.css$/,
                use:[
                     //添加loader
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    "css-loader"
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "15- webpack 压缩 JavaScript 代码",
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
        //添加插件
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
};
```
### 1.3 编译代码
此时 dist 目录下会生成 main.css

```
.hello{
    color: red;
}
```


## 二、压缩 CSS

压缩 CSS 代码，通过 optimize-css-assets-webpack-plugin 插件完成。

### 2.1 安装

```
npm install --save-dev optimize-css-assets-webpack-plugin
//
yarn add optimize-css-assets-webpack-plugin --dev
```
安装成功

```
yarn add v1.16.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 82 new dependencies.
info Direct dependencies
└─ optimize-css-assets-webpack-plugin@5.0.3
info All dependencies
├─ @types/q@1.5.2
├─ argparse@1.0.10
├─ caller-callsite@2.0.0
├─ caller-path@2.0.0
├─ callsites@2.0.0
├─ caniuse-lite@1.0.30000985
├─ coa@2.0.2
├─ color-string@1.5.3
├─ color@3.1.2
├─ cosmiconfig@5.2.1
├─ css-color-names@0.0.4
├─ css-declaration-sorter@4.0.1
├─ css-select-base-adapter@0.1.1
├─ css-tree@1.0.0-alpha.33
├─ css-unit-converter@1.1.1
├─ cssnano-preset-default@4.0.7
├─ cssnano-util-raw-cache@4.0.1
├─ cssnano-util-same-parent@4.0.1
├─ cssnano@4.1.10
├─ csso@3.5.1
├─ dot-prop@4.2.0
├─ electron-to-chromium@1.3.199
├─ error-ex@1.3.2
├─ esprima@4.0.1
├─ hex-color-regex@1.1.0
├─ hsl-regex@1.0.0
├─ hsla-regex@1.0.0
├─ html-comment-regex@1.1.2
├─ import-fresh@2.0.0
├─ is-absolute-url@2.1.0
├─ is-arrayish@0.2.1
├─ is-color-stop@1.1.0
├─ is-directory@0.3.1
├─ is-obj@1.0.1
├─ is-resolvable@1.1.0
├─ is-svg@3.0.0
├─ last-call-webpack-plugin@3.0.0
├─ lodash.memoize@4.1.2
├─ lodash.uniq@4.5.0
├─ mdn-data@2.0.4
├─ node-releases@1.1.25
├─ object.values@1.1.0
├─ optimize-css-assets-webpack-plugin@5.0.3
├─ parse-json@4.0.0
├─ postcss-calc@7.0.1
├─ postcss-colormin@4.0.3
├─ postcss-convert-values@4.0.1
├─ postcss-discard-comments@4.0.2
├─ postcss-discard-duplicates@4.0.2
├─ postcss-discard-empty@4.0.1
├─ postcss-discard-overridden@4.0.1
├─ postcss-merge-longhand@4.0.11
├─ postcss-merge-rules@4.0.3
├─ postcss-minify-font-values@4.0.2
├─ postcss-minify-gradients@4.0.2
├─ postcss-minify-params@4.0.2
├─ postcss-minify-selectors@4.0.2
├─ postcss-normalize-charset@4.0.1
├─ postcss-normalize-display-values@4.0.2
├─ postcss-normalize-positions@4.0.2
├─ postcss-normalize-repeat-style@4.0.2
├─ postcss-normalize-string@4.0.2
├─ postcss-normalize-timing-functions@4.0.2
├─ postcss-normalize-unicode@4.0.1
├─ postcss-normalize-url@4.0.1
├─ postcss-normalize-whitespace@4.0.2
├─ postcss-ordered-values@4.1.2
├─ postcss-reduce-initial@4.0.3
├─ postcss-reduce-transforms@4.0.2
├─ postcss-svgo@4.0.2
├─ postcss-unique-selectors@4.0.1
├─ q@1.5.1
├─ rgb-regex@1.0.1
├─ rgba-regex@1.0.0
├─ simple-swizzle@0.2.2
├─ sprintf-js@1.0.3
├─ stable@0.1.8
├─ stylehacks@4.0.3
├─ svgo@1.3.0
├─ timsort@0.3.0
├─ unquote@1.1.1
└─ vendors@1.0.3
✨  Done in 16.58s.

```

### 2.2 编辑 webpack.config.js

```
const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode:"production",
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                ]
            },
            //添加loader
            {
                test:/\.css$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    "css-loader"
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "15- webpack 压缩 JavaScript 代码",
            minify: {
                collapseWhitespace: true,//删除空格、换行
            },
        }),
        //添加插件
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        //添加插件
        new OptimizeCSSAssetsPlugin({})
    ],
};
```
### 2.3 重新编译

编译成功后，main.css 

```
.hello{color:red}
```
到此 webpack 压缩 CSS 代码任务完成。

> 参考链接

- [生成环境-最小化CSS](https://webpack.docschina.org/guides/production/#%E6%9C%80%E5%B0%8F%E5%8C%96-css)
- [mini-css-extract-plugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/)
- [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/16-webpack%20%E5%8E%8B%E7%BC%A9%20CSS%20%E4%BB%A3%E7%A0%81)