使用以下命令运行本地webpack不是特别方便,

```
npx webpack
//或者
npx webpack --config webpack.config.js
```
可以设置使用快捷方式：[npm scripts](https://docs.npmjs.com/misc/scripts)

## 一、 添加 npm scripts
编辑 package.json 文件，添加在 npm scripts 中添加一个 npm 命令：
```
{
  "name": "demo02",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^4.35.3",
    "webpack-cli": "^3.3.6"
  },
  "scripts": {
    "build": "webpack",
    "goujian": "webpack",
    "build_config": "webpack --config webpack.config.js"
  }
}
```

其中 build 是 指令名称，根据需要自定义即可；webpack 是重要的指令，不能写错。

## 二、 使用 npm scripts
在控制台中输入指令，即可生成 main.js 文件。

```
npm run build
//或者
yarn build
```

打开index.html文件即可看到 Hello webpack 字样。
> 每次执行指令前，需要手动删除 dist 路径下的 main.js 文件

> 参考链接

- [webpack起步](https://webpack.docschina.org/guides/getting-started/)
- [示例代码](https://github.com/1071942338/WebpackStudyNotes/tree/master/05-%E4%BD%BF%E7%94%A8%20npm%20scripts)