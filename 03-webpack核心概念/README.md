## 1、概念
本质上，webpack 是一个现代 JavaScript 应用程序的静态[模块](https://www.webpackjs.com/concepts/modules)打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

从 webpack v4.0.0 开始，可以不用引入一个配置文件。然而，webpack 仍然还是高度可配置的。在开始前需要先理解四个核心概念：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

示例如下
```
module.exports = {
    entry: './src/index.js',  
    output: './dist/main.js',
    mode: 'production',
    module: {
        rules: [ 
            {
                test: /\.txt$/, 
                use: 'raw-loader' 
            }
        ] 
    },
    plugins: [  
        new HtmlwebpackPlugin({ template: './src/index.html’ })
    ] 
    
};
```

### 1.1 入口(entry)
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点依赖的（直接和间接）。

每个依赖项随即被处理，最后输出到称之为 bundles 的文件中，我们将在下一章节详细讨论这个过程。

可以通过在 webpack 配置文件中配置 entry 属性，来指定一个入口起点（或多个入口起点）。默认值为 ./src。

接下来我们看一个 entry 配置的最简单例子：

webpack.config.js


```
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```


### 2.2 出口(output)

output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。基本上，整个应用程序结构，都会被编译到你指定的输出路径的文件夹中。你可以通过在配置中指定一个 output 字段，来配置这些处理过程：

webpack.config.js


```
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

在上面的示例中，我们通过 output.filename 和 output.path 属性，来告诉 webpack bundle 的名称，以及我们想要 bundle 生成(emit)到哪里。
> 在代码最上面导入的 path 模块是一个 Node.js 核心模块，用于操作文件路径。


### 3.3 loader

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只识别 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

注意，loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是有很必要的，因为这可以使开发人员创建出更准确的依赖关系图。
在更高层面，在 webpack 的配置中 loader 有两个目标：

- test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
- use 属性，表示进行转换时，应该使用哪个 loader。

webpack.config.js


```

const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

以上配置中，对一个单独的 module 对象定义了 rules 属性，里面包含两个必须属性：test 和 use。这告诉 webpack 编译器(compiler) 如下信息：

“嘿，webpack 编译器，当你碰到` require()/import `语句中被解析为 '.txt' 的路径时，在你对它打包之前，先使用 raw-loader 转换一下。”

需要注意的是，在 webpack 配置中定义 loader 时，要定义在 module.rules 中，而不是 rules。否则，在定义错误时 webpack 会给出严重的警告



### 4.4 插件(plugins)
loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。

可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

webpack.config.js


```
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

### 5.5 模式
通过选择 development 或 production 之中的一个，来设置 mode 参数，你可以启用相应模式下的 webpack 内置的优化


```
module.exports = {
  mode: 'production'
};
```

## 2、简单来说

1. 入口(entry)：指定webpack处理依赖图入口

1.  出口(output)：指定webpack处理后文件的输出路径

1.  loader：webpack原生只能支持js文件，通过loader处理其他格式的文件，如txt、css、图片

1.  插件(plugins)：用来增强webpack的功能

1.  模式：通过指定不同环境，进行差异化配置


> 参考链接
[webpack概念](https://www.webpackjs.com/concepts/)