

## 一、历史演化
> 可直接跳过看后续部分

在说明为什么选择使用webpack，让我们回顾一下在bundler出现之前我们是如何在web上使用JavaScript的。

### 1、JavaScript以前用法
在浏览器中运行JavaScript有两种方法。

第一种，每个功能都作为一个脚本引入;这方式很难扩展，因为加载太多脚本会导致网络瓶颈。

`第二种，使用一个包含所有项目代码的.js文件，但这会导致范围、大小、可读性和可维护性方面的问题。`

### 2、IIFEs 自执行匿名函数
IIFEs（Immediately invoked function expressions
）解决大型项目的范围问题;当脚本文件被IIFE包装时，您可以安全地连接或组合文件，而不用担心范围冲突。

这就产生了**Make**、**Gulp**、**Grunt**、**Broccoli**或**Brunch**等工具。这些工具称为任务运行器，它们将所有项目文件连接在一起。

`然而，更改一个文件意味着必须重新构建整个文件。连接使跨文件重用脚本变得容易，但使构建优化更加困难。您如何才能确定是否真正使用了代码?`

`即使只使用lodash中的一个函数，也必须添加整个库，然后将其压缩在一起。如何建立代码的依赖关系?延迟加载代码块很难大规模执行，需要开发人员进行大量手工工作。`

### 3、JavaScript Modules的诞生得益于Node.js
webpack在Node上运行。JavaScript runtime，可以在浏览器环境之外的计算机和服务器上使用。

当Node.js发布时，一个新的时代开始了，它也带来了新的挑战。既然JavaScript不在浏览器中运行，那么 Node 应用程序应该如何加载新的代码块呢?没有可以添加到其中的html文件和脚本标记。

`CommonJS出现并引入了require，它允许您在当前文件中加载和使用模块。这通过导入我们需要的每个模块，解决了范围问题。`

### 4、npm + Node.js + Modules——大规模分发
JavaScript作为一种语言、一个平台以及一种快速开发和创建快速应用程序的方式正在接管世界。

`但没有浏览器支持CommonJS。` 没有活动绑定。循环引用存在一些问题。同步模块加载解决方案很慢。虽然CommonJS对于Node.js项目是一个很好的解决方案，但是浏览器不支持模块。Bundlers工具(如，Browserify、RequireJS和SystemJS等)被创作出来，允许我们编写在浏览器中运行的CommonJS模块。

### 5、ECMAScript Modules
对于web项目来说，好消息是模块正在成为ECMAScript标准的官方特性。然而，浏览器支持是不完整的，捆绑仍然更快，目前推荐使用这些早期的**模块**实现。

### 6、webpack的必然性
有没有一个工具让我们不仅可以编写模块，还可以支持任何模块格式(至少在到达ESM之前)，并且能够同时处理资源和资产?

这就是webpack存在的原因。它是一个工具，允许您打包您的JavaScript应用程序(同时支持ESM和CommonJS)，并且可以扩展它来支持许多不同的资产，如图像、字体和样式表。

webpack专注性能和加载时间;它总是在改进或添加新特性，比如异步块加载和预取，为您的项目和用户提供尽可能好的体验。

## 二、简单来说
虽然Modules已经成为ECMAScript官方标准，但是浏览器支持不完成，需要Modules的旧的实现方式；再加上还需要处理许多不同格式资源文件，所以我们需要 webpack。常用的有以下功能
1. JavaScript的ES6标准浏览器支持不完整，需要转义
2. 三大开发框架（React、Vue、Angular）语法糖需要转义
3. CSS预处理（sass、less等）
4. 图片压缩
5. 压缩混淆
6. 其他资源处理，（字体等）

## 三、流行程度
数据证明webpack受欢迎程度。

维度 | webpack  | grunt | gulp
---|---|---|---
定义 | Module bundler| Task runner| Task runner
语⾔ | JavaScript| Node.js| Node.js
发布时间 | 2012.3| 2012.6| 2013.7
GitHub stars | 40766| 11796|29427
周下载量量 | 3,385,392| 478,876| 816,228

特点表现为
- 社区⽣生态丰富
- 配置灵活和插件化扩展
- 官⽅方更更新迭代速度快


参考资料
1. [Why webpack](https://webpack.js.org/concepts/why-webpack/#root)
1. [《玩转weboack》](https://github.com/geektime-geekbang/geektime-webpack-course/blob/master/ppt/%E3%80%8A%E7%8E%A9%E8%BD%ACwebpack%E3%80%8B%20%E7%AC%AC%E4%B8%80%E7%AB%A0.pdf)