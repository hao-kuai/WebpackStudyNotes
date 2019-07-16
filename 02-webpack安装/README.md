## 1、 前提条件
在开始之前，请确保安装了 [Node.js](https://nodejs.org/en/) 的最新版本。使用旧版本，你可能遇到各种问题，因为它们可能缺少 webpack 功能或者缺少相关 package 包。

## 2、安装方式

安装方式有2种：
1. 全局安装
2. 本地安装

### 2.1 全局安装
通过以下的 NPM 安装指令，将使 webpack 在全局环境下可用：

```
npm install --global webpack
```
~~不推荐全局安装 webpack。~~ 这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

### 2.2 本地安装

要安装最新版本或特定版本，请运行以下命令之一：

```
npm install --save-dev webpack //安装最新版本
npm install --save-dev webpack@<version> //安装指定版本
```

如果你使用 webpack 4+ 版本，你还需要安装 CLI。

```
npm install --save-dev webpack-cli
```
**对于大多数项目，建议本地安装**。这可以使我们在引入破坏式变更(breaking change)的依赖时，更容易分别升级项目。

通常，webpack 通过运行一个或多个 [npm scripts](https://docs.npmjs.com/misc/scripts)，会在本地 node_modules 目录中查找安装的 webpack：

```
"scripts": {
    "start": "webpack --config webpack.config.js"
}
```
> 当你在本地安装 webpack 后，你能够从 node_modules/.bin/webpack 访问它的 bin 版本。

#### 简单来说
基本上都会使用最新的发布版本，安装指令如下

```
npm install --save-dev webpack
npm install --save-dev webpack-cli
//或者
npm install --save-dev webpack webpack-cli
```



## 3、练习
### 3.1 安装 Node.js 环境
访问[官网](https://nodejs.org/en/)，下载对应安装包即可。安装成功后使用命令查看版本号

```
node -v

v10.12.0

npm -v

6.9.0
```
显示版本号，表示安装成功。

### 3.2 初始化 npm
创建一个目录/文件夹，并进入。创建方式可手动创建，也可以命令行创建。

```
mkdir webpack-demo

cd webpack-demo

npm init -y
```
出现 package.json 信息，表示初始化成功

```
Wrote to /Users/zhangwenqi/Desktop/webpack学习笔记/webpack-demo/package.json:

{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
此时的目录结构如下

```
  webpack-demo
  |- package.json
```

### 3.3 安装webpack webpack-cli

安装指令
```
  npm install --save-dev webpack webpack-cli
```
安装日志和结果

```
> fsevents@1.2.9 install /Users/zhangwenqi/Desktop/webpack学习笔记/webpack-demo/node_modules/fsevents
> node install

node-pre-gyp WARN Using needle for node-pre-gyp https download
[fsevents] Success: "/Users/zhangwenqi/Desktop/webpack学习笔记/webpack-demo/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" is installed via remote

> webpack-cli@3.3.2 postinstall /Users/zhangwenqi/Desktop/webpack学习笔记/webpack-demo/node_modules/webpack-cli
> node ./bin/opencollective.js



                            Thanks for using Webpack!
                 Please consider donating to our Open Collective
                        to help us maintain this package.



              👉  Donate: https://opencollective.com/webpack/donate


npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN webpack-demo@1.0.0 No description
npm WARN webpack-demo@1.0.0 No repository field.

+ webpack-cli@3.3.2
+ webpack@4.32.2
added 458 packages from 236 contributors and audited 5236 packages in 9.765s
found 0 vulnerabilities
```
可以通过命令行验证安装结果

```
./node_modules/.bin/webpack -v
4.32.2

./node_modules/.bin/webpack-cli -v
3.3.2
```

此时的目录结构如下

```
  webpack-demo
  |- package.json
  |- package-lock.json
  |- /node_modules
  
```

> 参考链接

1. [webpack安装](https://www.webpackjs.com/guides/installation/)
2. [webpack起步](https://www.webpackjs.com/guides/getting-started/)