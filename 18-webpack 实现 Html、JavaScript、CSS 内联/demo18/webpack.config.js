const path = require('path');
const HtmlWebpackPlugin  = require("html-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "18-webpack 实现 Html、JavaScript、CSS 内联",
            template:"./src/index.html",//指定首页模板
        }),
    ]
};